import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../Providers/AuthProvider';
import useAxiosBase from '../../../CustomHooks/useAxiosBase';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyProducts = () => {
    const axiosBase = useAxiosBase();
    const { user } = useContext(AuthContext);

    const { data: myProducts = [], refetch } = useQuery({
        queryKey: [user?.email, "myProducts"],
        queryFn: async () => {
            const res = await axiosBase.get(`/products/${user?.email}`);
            return res.data;
        }
    });

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
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Successfully deleted your product",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
                else {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Delete Failed!!!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        });
    };

    return (
        <div className="max-w-4xl mx-auto lg:p-6 px-4 bg-white rounded-lg shadow-lg lg:mt-10 mt-6">
            <h1 className="text-2xl font-bold mb-6 text-center lg:text-left">My Products</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border-collapse">
                    <thead className='bg-gray-300'>
                        <tr>
                            <th className="border-b py-2 px-4 text-left">Product Name</th>
                            <th className="border-b py-2 px-4 text-left">Votes</th>
                            <th className="border-b py-2 px-4 text-left">Status</th>
                            <th className="border-b py-2 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myProducts.map((product, index) => (
                            <tr key={product._id} className={index % 2 ? "bg-gray-100" : ""}>
                                <td className="border-b py-2 px-4 text-center">{product.name}</td>
                                <td className="border-b py-2 px-4 text-center">{product.upVote}</td>
                                <td className="border-b py-2 px-4 text-center">
                                    <span
                                        className={
                                            product.status === 'Accepted'
                                                ? 'text-green-500'
                                                : product.status === 'Rejected'
                                                    ? 'text-red-500'
                                                    : 'text-yellow-500'
                                        }
                                    >
                                        {product.status}
                                    </span>
                                </td>
                                <td className="border-b py-2 px-4 text-center">
                                    <div className="flex flex-col lg:flex-row gap-2">
                                        <Link to={`/dashboard/updateProduct/${product._id}`} className="text-blue-500 border-2 p-1 rounded border-blue-300 lg:mr-4">
                                            Update
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="text-red-500 border-2 p-1 rounded border-red-300"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProducts;
