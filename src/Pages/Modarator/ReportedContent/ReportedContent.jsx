import { useNavigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import useAxiosBase from "../../../CustomHooks/useAxiosBase";
import Swal from "sweetalert2";


const ReportedContent = () => {
    const axiosBase = useAxiosBase();
    const navigate = useNavigate();

    const { data: reportedProducts = [], isLoading, error, refetch } = useQuery({
        queryKey: ["reportedProducts"],
        queryFn: async () => {
            const res = await axiosBase.get("/products/reportedProducts");
            return res.data;
        }
    });


    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading reported products</div>;

    const handleDelete = (productId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosBase.delete(`/products/${productId}`);
                if (res.data.deletedCount) {
                    refetch();
                }
            }
        });
    };

    return (
        <div className="">
            <h1 className="text-2xl font-bold mb-6">Reported Products</h1>
            <table className="table-auto w-full">
                <thead>
                    <tr className="border-b bg-gray-300">
                        <th className="px-4 py-2">Product Name</th>
                        <th className="px-4 py-2">View Details</th>
                        <th className="px-4 py-2">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {reportedProducts.map((product, index) => (
                        <tr key={product._id} className={`text-center ${index % 2 && "bg-gray-100"}`}>
                            <td className="px-4 py-2">{product.name}</td>
                            <td className="px-4 py-2">
                                <button
                                    onClick={() => navigate(`/dashboard/productDetailsMd/${product._id}`)}
                                    className="rounded-md px-4 py-2 text-blue-500 border-2 border-blue-300 hover:bg-gray-600 hover:border-none hover:text-white"
                                >
                                    View Details
                                </button>
                            </td>
                            <td className="px-4 py-2">
                                <button
                                    onClick={() => handleDelete(product._id)}
                                    className={"rounded-md px-4 py-2 text-red-500 border-2 border-red-300 hover:bg-gray-600 hover:border-none hover:text-white"}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReportedContent;
