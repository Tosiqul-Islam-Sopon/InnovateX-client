import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { WithContext as ReactTags } from 'react-tag-input';
import { FaSave } from 'react-icons/fa';
import axios from 'axios';
import { AuthContext } from '../../../Providers/AuthProvider';
import useAxiosBase from '../../../CustomHooks/useAxiosBase';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const image_hosting_key = import.meta.env.VITE_IMAGE_UPLOAD_KEY_IMAGEBB;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProduct = () => {
    const { register, handleSubmit, reset } = useForm();
    const { user } = useContext(AuthContext);
    const [tags, setTags] = useState([]);
    const axiosBase = useAxiosBase();
    const navigate = useNavigate();

    const handleDelete = i => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAddition = tag => {
        setTags([...tags, tag]);
    };

    const onSubmit = async (data) => {
        const imageFile = new FormData();
        imageFile.append('image', data.image[0]);

        const res = await axios.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        if (res.data.success) {
            const productImage = res.data.data.display_url;

            const product = {
                name: data.name,
                description: data.description,
                productImage,
                tags: tags.map(tag => tag.text),
                externalLink: data.externalLink,
                owner: {
                    name: user.displayName,
                    image: user.photoURL,
                    email: user.email
                },
                upVote: 0,
                downVote: 0,
                status: "pending",
                timestamp: new Date().toISOString()
            };

            axiosBase.post("/products", product)
                .then(result => {
                    if (result.data.insertedId) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Your product has been saved",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        reset();
                        setTags([]);
                        navigate("/dashboard/myProducts");
                    }
                })
                .catch(() => {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Failed to save your product!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                });
        } else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Failed to save your product!",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 lg:p-6 md:px-4 sm:px-2 bg-white rounded-lg shadow-lg lg:mt-10 md:mt-8 sm:mt-6">
            <h1 className="text-2xl font-bold mb-6 text-center lg:text-left">Add New Product</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Product Name</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Product Name"
                        {...register('name', { required: true })}
                        required
                        className="input input-bordered w-full"
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Product Image</span>
                    </label>
                    <input
                        type="file"
                        {...register('image', { required: true })}
                        required
                        className="file-input w-full"
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea
                        placeholder="Description"
                        {...register('description', { required: true })}
                        required
                        className="textarea textarea-bordered h-24 w-full"
                    ></textarea>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Tags</span>
                    </label>
                    <ReactTags
                        tags={tags}
                        handleDelete={handleDelete}
                        handleAddition={handleAddition}
                        inputFieldPosition="bottom"
                        classNames={{
                            tagInputField: " w-full py-1 px-2",
                            tagInput: "w-full px-3 py-2 border border-gray-300 rounded-md",
                            tag: "bg-blue-500 text-white px-2 py-1 rounded-md inline-block m-1",
                            remove: "cursor-pointer"
                        }}
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">External Links</span>
                    </label>
                    <input
                        type="text"
                        placeholder="External Link"
                        {...register('externalLink')}
                        className="input input-bordered w-full"
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Owner Information</span>
                    </label>
                    <div className="flex flex-col items-center md:flex-row md:items-start gap-4">
                        <img
                            src={user?.photoURL}
                            alt="Owner"
                            className="my-2 w-24 h-24 rounded-full"
                        />
                        <div className="flex flex-col w-full md:w-auto">
                            <input
                                type="text"
                                value={user?.displayName}
                                disabled
                                className="input input-bordered w-full bg-gray-100"
                            />
                            <input
                                type="text"
                                value={user?.email}
                                disabled
                                className="input input-bordered w-full bg-gray-100 mt-2"
                            />
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary w-full flex justify-center items-center"
                >
                    Submit <FaSave className="ml-2" />
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
