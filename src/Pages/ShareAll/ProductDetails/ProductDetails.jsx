import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosBase from "../../../CustomHooks/useAxiosBase";
import { useForm } from "react-hook-form";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ProductDetails = () => {
    const { id } = useParams();
    const axiosBase = useAxiosBase();
    const { user } = useContext(AuthContext);
    // const [product, setProduct] = useState(null);
    // const [reviews, setReviews] = useState([]);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [showUpVoteMessage, setUpVoteShowMessage] = useState(false);

    const { data: product = [], refetch: productRefetch, isLoading: productLoading } = useQuery({
        queryKey: [`/products/product/${id}`],
        queryFn: async () => {
            const res = await axiosBase.get(`/products/product/${id}`);
            return res.data;
        }
    })

    const { data: reviews = [], isLoading: reviewLoading, refetch: reviewRefetch } = useQuery({
        queryKey: [`/reviews/${id}`],
        queryFn: async () => {
            const res = await axiosBase.get(`/reviews/${id}`);
            return res.data;
        }
    })

    const handleUpVote = async (productId) => {
        const response = await axiosBase.get(`/users/upVoteStatus/${productId}?email=${user.email}`)
        const userVotingStatus = response.data;
        if (!userVotingStatus) {
            // console.log("fuck.........");
            await axiosBase.patch(`/users/upVotes/${productId}?email=${user.email}`);
            const res = await axiosBase.patch(`/products/upVote/${productId}`);
            if (res.data.modifiedCount) {
                productRefetch();
            }
            // console.log(res.data);
        }
        else {
            setUpVoteShowMessage(true);
            setTimeout(() => setUpVoteShowMessage(false), 2000);
        }
    }

    // const handleReport = async () => {
    //     Swal.fire({
    //         title: "Are you sure you want to report this product?",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonText: "Report",
    //         cancelButtonText: "Cancel"
    //     }).then(async (result) => {
    //         if (result.isConfirmed) {
    //             await axiosBase.patch(`/products/reportProduct/${id}`);
    //             Swal.fire("Reported!", "This product has been reported.", "success");
    //         }
    //     });
    // };

    const onSubmit = async (data) => {
        const reviewData = {
            productId: id,
            reviewerName: user.displayName,
            reviewerImage: user.photoURL,
            description: data.description,
            rating: data.rating
        };

        const res = await axiosBase.post("/reviews", reviewData);
        if (res.data.insertedId) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Thanks You😊",
                text: "Review posted successfully",
                showConfirmButton: false,
                timer: 1500
            });
            reviewRefetch();
            reset();
        }
        else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Sorry🥺",
                text: "Something went wrong!!!",
                showConfirmButton: false,
                timer: 1500
            });
        }

    };

    if (productLoading || reviewLoading) {
        return <div className="pt-24">Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg pt-24">
            <div className="mb-6">
                <img src={product.productImage} alt={product.name} className="w-full rounded-lg" />
                <div className="flex flex-wrap mb-4">
                    {product.tags.map((tag, index) => (
                        <a key={index} className="mr-2 mb-2 text-blue-500 underline">#{tag}</a>
                    ))}
                </div>
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-700">{product.description}</p>
                <div className="mt-4">
                    <span className="font-semibold">Tags: </span>
                    {product.tags.join(", ")}
                </div>
                <div className="my-4">
                    <a href={product.externalLink} className="text-blue-500 underline">
                        External Link
                    </a>
                </div>
                {showUpVoteMessage && (
                    <p className="text-red-500 text-sm">You&apos;ve already upvoted this product</p>
                )}
                <div className="flex gap-10">
                    <button
                        onClick={() => handleUpVote(product._id)}
                        disabled={user?.email === product.owner.email}
                        className={`flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded-md ${user?.email === product.owner.email && "opacity-30 cursor-not-allowed"}`}>
                        <AiOutlineLike /> <span>{product.upVote}</span>
                    </button>

                    <button
                        // onClick={() => handleUpVote(product._id)}
                        disabled={user?.email === product.owner.email}
                        className={`flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded-md ${user?.email === product.owner.email && "opacity-30 cursor-not-allowed"}`}>
                        <AiOutlineDislike /> <span>{product.downVote}</span>
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
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                            step="0.1"
                            {...register('rating', {
                                required: true,
                                validate: {
                                    min: (value) => parseFloat(value) >= 1 || 'Minimum rating is 1',
                                    max: (value) => parseFloat(value) <= 5 || 'Maximum rating is 5'
                                }
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.rating && <p className="text-red-500">{errors.rating.message}</p>}
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
