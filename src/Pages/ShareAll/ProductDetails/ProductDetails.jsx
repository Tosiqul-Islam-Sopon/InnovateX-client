import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosBase from "../../../CustomHooks/useAxiosBase";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const ProductDetails = () => {
    const { id } = useParams();
    const axiosBase = useAxiosBase();
    const { user } = useContext(AuthContext);
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await axiosBase.get(`/products/product/${id}`);
            setProduct(res.data);
        };

        const fetchReviews = async () => {
            const res = await axiosBase.get(`/reviews/product/${id}`);
            setReviews(res.data);
        };

        fetchProduct();
        fetchReviews();
    }, [id, axiosBase]);

    const handleUpvote = async () => {
        await axiosBase.patch(`/products/updateProduct/${id}?upVote=true`);
        setProduct({ ...product, upVote: product.upVote + 1 });
    };

    const handleReport = async () => {
        Swal.fire({
            title: "Are you sure you want to report this product?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Report",
            cancelButtonText: "Cancel"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosBase.patch(`/products/reportProduct/${id}`);
                Swal.fire("Reported!", "This product has been reported.", "success");
            }
        });
    };

    const onSubmit = async (data) => {
        const reviewData = {
            productId: id,
            reviewerName: user.displayName,
            reviewerImage: user.photoURL,
            description: data.description,
            rating: data.rating
        };

        await axiosBase.post("/reviews", reviewData);
        setReviews([...reviews, reviewData]);
        reset();
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg pt-10">
            <h1 className="text-2xl font-bold mb-6">Product Details</h1>
            <div className="mb-6">
                <img src={product.productImage} alt={product.name} className="w-full rounded-lg mb-4" />
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-700">{product.description}</p>
                <div className="mt-4">
                    <span className="font-semibold">Tags: </span>
                    {product.tags.join(", ")}
                </div>
                <div className="mt-4">
                    <a href={product.externalLink} className="text-blue-500 underline">
                        External Link
                    </a>
                </div>
                <div className="mt-4">
                    <span className="font-semibold">Upvotes: </span>{product.upVote}
                </div>
                <div className="mt-4">
                    <button onClick={handleUpvote} className="mr-4 px-4 py-2 bg-green-500 text-white rounded-md">
                        Upvote
                    </button>
                    <button onClick={handleReport} className="px-4 py-2 bg-red-500 text-white rounded-md">
                        Report
                    </button>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">Reviews</h2>
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg">
                            <div className="flex items-center mb-2">
                                <img src={review.reviewerImage} alt={review.reviewerName} className="w-10 h-10 rounded-full mr-2" />
                                <span className="font-semibold">{review.reviewerName}</span>
                            </div>
                            <p className="text-gray-700">{review.description}</p>
                            <div className="mt-2">
                                <span className="font-semibold">Rating: </span>{review.rating}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">Post a Review</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-gray-700">Reviewer Name</label>
                        <input
                            type="text"
                            value={user.displayName}
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Reviewer Image</label>
                        <input
                            type="text"
                            value={user.photoURL}
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Review Description</label>
                        <textarea
                            {...register('description', { required: true })}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-gray-700">Rating</label>
                        <input
                            type="number"
                            {...register('rating', { required: true, min: 1, max: 5 })}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            min="1"
                            max="5"
                        />
                    </div>
                    <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
                        Submit Review
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductDetails;
