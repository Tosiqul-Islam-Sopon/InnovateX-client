import { useState } from 'react';
import useAxiosBase from '../../../CustomHooks/useAxiosBase';
import { useQuery } from '@tanstack/react-query';
import CouponForm from './CouponForm';
import Swal from 'sweetalert2';

const ManageCoupons = () => {
    const axiosBase = useAxiosBase();
    const [showForm, setShowForm] = useState(false);
    const [currentCoupon, setCurrentCoupon] = useState(null);

    const { data: coupons = [], refetch } = useQuery({
        queryKey: ['coupons'],
        queryFn: async () => {
            const res = await axiosBase.get('/coupons');
            return res.data;
        },
    });


    const handleSave = async (coupon) => {
        if (coupon._id) {
            const { _id, ...newCoupon } = coupon;
            const res = await axiosBase.patch(`/coupons/updateCoupon/${_id}`, newCoupon);
            if (res.data.modifiedCount) {
                setCurrentCoupon(null);
                setShowForm(!showForm);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Coupon Updated Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Coupon Editing Failed",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        else {
            const res = await axiosBase.post("/coupons", coupon);

            if (res.data.insertedId) {
                setCurrentCoupon(null);
                setShowForm(!showForm);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Coupon Added Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Coupon Adding Failed",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }

        refetch();
    };

    const handleAddCoupon = () => {
        setCurrentCoupon(null);
        setShowForm(!showForm);
    };

    const handleEditCoupon = (coupon) => {
        setCurrentCoupon(coupon);
        setShowForm(!showForm);
    };

    const handleDelete = (id) => {
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
                const res = await axiosBase.delete(`/coupons/deleteCoupon/${id}`);
                if (res.data.deletedCount) {
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Coupon Deleted Succefully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                else {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Coupon Delete Failed",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        });
    }

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-8">Manage Coupons</h1>
            <div className="mb-8 flex justify-center">
                <button
                    onClick={handleAddCoupon}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add Coupon
                </button>
            </div>
            {showForm && (
                <div className="mb-8 flex justify-center">
                    <CouponForm onSave={handleSave} coupon={currentCoupon} />
                </div>
            )}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Coupon Code</th>
                            <th className="py-2 px-4 border-b">Expiry Date</th>
                            <th className="py-2 px-4 border-b">Description</th>
                            <th className="py-2 px-4 border-b">Discount Amount</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coupons.map((coupon) => (
                            <tr key={coupon._id}>
                                <td className="py-2 px-4 border-b">{coupon.code}</td>
                                <td className="py-2 px-4 border-b">{coupon.expiryDate}</td>
                                <td className="py-2 px-4 border-b">{coupon.description}</td>
                                <td className="py-2 px-4 border-b">{coupon.discount}</td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        onClick={() => handleEditCoupon(coupon)}
                                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mb-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(coupon._id)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                                        Delete
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

export default ManageCoupons;
