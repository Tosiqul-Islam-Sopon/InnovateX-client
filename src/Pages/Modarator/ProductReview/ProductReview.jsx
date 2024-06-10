import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosBase from "../../../CustomHooks/useAxiosBase";
import { useNavigate } from "react-router-dom";

const ProductReview = () => {
    const { user } = useContext(AuthContext);
    const axiosBase = useAxiosBase();
    const navigate = useNavigate();

    const { data: products = [], refetch } = useQuery({
        queryKey: ["Products", user?.email],
        queryFn: async () => {
            const res = await axiosBase.get("/products");
            const sortedProducts = res.data.sort((a, b) => {
                const statusOrder = {
                    "pending": 1,
                    "accepted": 2,
                    "rejected": 3
                };
            
                return statusOrder[a.status] - statusOrder[b.status];
            });
            return sortedProducts;
        }
    });

    const handleMakeFeatured = async (productId) => {
        await axiosBase.patch(`/products/makeFeatured/${productId}`);
        refetch();
    };

    const handleAcceptProduct = async (productId) => {
        await axiosBase.patch(`/products/updateStatus/${productId}?status=accepted`);
        refetch();
    };

    const handleRejectProduct = async (productId) => {
        await axiosBase.patch(`/products/updateStatus/${productId}?status=rejected`);
        refetch();
    };

    return (
        <div className="max-w-6xl mx-auto p-4 lg:p-6 md:px-4 sm:px-2">
            <h1 className="text-2xl font-bold mb-6 text-center lg:text-left">Manage Products</h1>
            <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    <thead>
                        <tr className="border-b bg-gray-300">
                            <th className="px-4 py-2">Product Name</th>
                            <th className="px-4 py-2">View Details</th>
                            <th className="px-4 py-2">Make Featured</th>
                            <th className="px-4 py-2">Accept</th>
                            <th className="px-4 py-2">Reject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product._id} className={index % 2 ? "bg-gray-100" : ""}>
                                <td className="px-4 py-2 text-center">{product.name}</td>
                                <td className="px-4 py-2 text-center">
                                    <button
                                        onClick={() => navigate(`/dashboard/productDetailsMd/${product._id}`)}
                                        className="rounded-md px-4 py-2 text-blue-500 border-2 border-blue-300 hover:bg-gray-600 hover:border-none hover:text-white"
                                    >
                                        View Details
                                    </button>
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <button
                                        onClick={() => handleMakeFeatured(product._id)}
                                        disabled={product?.featured === 'true'}
                                        className={`rounded-md px-4 py-2 text-yellow-500 border-2 border-yellow-300 hover:bg-gray-600 hover:border-none hover:text-white ${product?.featured === 'true' && "opacity-30 cursor-not-allowed"}`}
                                    >
                                        Make Featured
                                    </button>
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <button
                                        onClick={() => handleAcceptProduct(product._id)}
                                        disabled={product.status === "accepted"}
                                        className={`rounded-md px-4 py-2 text-green-500 border-2 border-green-300 hover:bg-gray-600 hover:border-none hover:text-white ${product.status === "accepted" && "opacity-30 cursor-not-allowed"}`}
                                    >
                                        Accept
                                    </button>
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <button
                                        onClick={() => handleRejectProduct(product._id)}
                                        disabled={product.status === "rejected"}
                                        className={`rounded-md px-4 py-2 text-red-500 border-2 border-red-300 hover:bg-gray-600 hover:border-none hover:text-white ${product.status === "rejected" && "opacity-30 cursor-not-allowed"}`}
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductReview;
