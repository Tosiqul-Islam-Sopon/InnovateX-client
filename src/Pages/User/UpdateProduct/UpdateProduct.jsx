import { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { WithContext as ReactTags } from 'react-tag-input';
import { AuthContext } from '../../../Providers/AuthProvider';
import axios from 'axios';
import useAxiosBase from '../../../CustomHooks/useAxiosBase';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMAGE_UPLOAD_KEY_IMAGEBB;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateProduct = () => {
    const { id } = useParams();
    const axiosBase = useAxiosBase();
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, reset, setValue } = useForm();
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();
    const [productImage, setProductImage] = useState('');
    const [upVote, setUpVote] = useState(0);
    const [downVote, setDownVote] = useState(0);


    useEffect(() => {
        const fetchProduct = async () => {
            const res = await axiosBase.get(`/products/product/${id}`);
            const product = res.data;
            setValue('name', product.name);
            setValue('description', product.description);
            setValue('externalLink', product.externalLink);
            setTags(product.tags.map(tag => ({ id: tag, text: tag })));
            setProductImage(product.productImage);
            setUpVote(product.upVote);
            setDownVote(product.downVote);
            setValue('timestamp', product.timestamp);
        };
        fetchProduct();
    }, [id, axiosBase, setValue]);

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        setProductImage(URL.createObjectURL(selectedImage));
    };

    const handleDelete = i => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAddition = tag => {
        setTags([...tags, tag]);
    };

    const onSubmit = async (data) => {
        let newProductImage = productImage;
        if (data.image[0]) {
            const imageFile = new FormData();
            imageFile.append('image', data.image[0]);
            const res = await axios.post(image_hosting_api, imageFile, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });
            newProductImage = res.data.data.display_url;
        }

        const updatedProduct = {
            name: data.name,
            description: data.description,
            productImage: newProductImage,
            tags: tags.map(tag => tag.text),
            externalLink: data.externalLink,
            owner: {
                name: user.displayName,
                image: user.photoURL,
                email: user.email
            },
            upVote,
            downVote,
            timestamp: data.timestamp
        };

        const res = await axiosBase.patch(`/products/updateProduct/${id}`, updatedProduct);
        if (res.data.modifiedCount) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Successfully update your product",
                showConfirmButton: false,
                timer: 1500
            });
            reset();
            navigate("/dashboard/myProducts");
        }
        else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Update Failed!!!",
                showConfirmButton: false,
                timer: 1500
            });
        }

    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
            <h1 className="text-2xl font-bold mb-6">Update Product</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label className="block text-gray-700">Product Name</label>
                    <input
                        type="text"
                        {...register('name', { required: true })}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Product Image</label>
                    {productImage && <img src={productImage} alt="Product" className="w-full mb-4 rounded-lg" />}
                    <input
                        type="file"
                        onChange={handleImageChange}
                        {...register('image')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        {...register('description', { required: true })}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    ></textarea>
                </div>
                <div>
                    <label className="block text-gray-700">Tags</label>
                    <ReactTags
                        tags={tags}
                        handleDelete={handleDelete}
                        handleAddition={handleAddition}
                        inputFieldPosition="bottom"
                        classNames={{
                            tagInput: "w-full px-3 py-2 border border-gray-300 rounded-md",
                            tag: "bg-blue-500 text-white px-2 py-1 rounded-md inline-block m-1",
                            remove: "cursor-pointer"
                        }}
                    />
                </div>
                <div>
                    <label className="block text-gray-700">External Links</label>
                    <input
                        type="text"
                        {...register('externalLink')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Up Vote</label>
                    <input
                        type="text"
                        value={upVote}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Down Vote</label>
                    <input
                        type="text"
                        value={downVote}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                >
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default UpdateProduct;
