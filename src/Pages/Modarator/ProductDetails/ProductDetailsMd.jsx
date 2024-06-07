import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosBase from "../../../CustomHooks/useAxiosBase";
import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";

const ProductDetailsMd = () => {
    const { id } = useParams();
    const axiosBase = useAxiosBase();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await axiosBase.get(`/products/product/${id}`);
            setProduct(res.data);
        };

        const fetchReviews = async () => {
            const res = await axiosBase.get(`/reviews/${id}`);
            setReviews(res.data);
        };

        const fetchReports = async () => {
            const res = await axiosBase.get(`/reports/${id}`);
            setReports(res.data);
        };

        fetchProduct();
        fetchReviews();
        fetchReports();
    }, [id, axiosBase]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg pt-10">
            <div className="mb-6">
                <img src={product.productImage} alt={product.name} className="w-full rounded-lg mb-4" />
                <div className="flex justify-between">
                    <h2 className="text-xl font-semibold">{product.name}</h2>
                    <div className="flex items-center">
                        <img src={product.owner.image} alt={product.owner.name} className="w-10 h-10 rounded-full mr-2" />
                        <span className="text-gray-600 font-bold">{product.owner.name}</span>
                    </div>
                </div>
                <p className="text-gray-700">{product.description}</p>
                <div className="mt-4">
                    <span className="font-semibold">Tags: </span>
                    {product.tags.join(", ")}
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                <a href={product.externalLink} className="text-blue-500 underline">
                        External Link
                    </a>
                    <span className="font-semibold flex items-center"><BiSolidUpvote /> Upvotes: {product.upVote}</span>
                    <span className="font-semibold flex items-center"><BiSolidDownvote /> Downvotes: {product.downVote}</span>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">Reviews ({reviews.length})</h2>
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
                <h2 className="text-xl font-bold mb-4">Reports ({reports.length})</h2>
                {reports.length > 0 ? (
                    reports.map((report, index) => (
                        <div key={index} className="mb-4 p-4 bg-red-100 rounded-lg">
                            <div className="flex items-center mb-2">
                                <span className="font-semibold">Reporter: </span>
                                <span className="ml-2">{report.reporterEmail}</span>
                            </div>
                            <p className="text-gray-700">{report.reason}</p>
                            <div className="mt-2">
                                <span className="font-semibold">Date: </span>{new Date(report.date).toLocaleDateString()}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No reports yet.</p>
                )}
            </div>
        </div>
    );
};

export default ProductDetailsMd;
