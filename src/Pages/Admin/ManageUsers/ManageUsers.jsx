import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosBase from "../../../CustomHooks/useAxiosBase";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const { user } = useContext(AuthContext);
    const axiosBase = useAxiosBase();

    const { data: users = [], refetch } = useQuery({
        queryKey: ["Users", user?.email],
        queryFn: async () => {
            const res = await axiosBase.get("/users");
            const filteredUsers = res.data.filter(data => data.email !== user.email);
            return filteredUsers;
        }
    });

    const handleMakeModerator = (userId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make moderator!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                axiosBase.patch(`/user/updateUser/${userId}?role=moderator`)
                    .then(() => {
                        refetch();
                    })
                    .catch(() => {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Moderator making failed!!!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })
            }
        });
    };

    const handleMakeAdmin = (userId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make admin!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                axiosBase.patch(`/user/updateUser/${userId}?role=admin`)
                    .then(() => {
                        refetch();
                    })
                    .catch(() => {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Admin making failed!!!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })
            }
        });
    };

    return (
        <div className="overflow-x-auto">
            <h1 className="text-2xl font-bold mb-6 text-center">Manage Users</h1>
            <table className="min-w-max w-full table-auto">
                <thead>
                    <tr className="border-b bg-gray-300">
                        <th className="px-4 py-2">User Name</th>
                        <th className="px-4 py-2">User Email</th>
                        <th className="px-4 py-2">Make Moderator</th>
                        <th className="px-4 py-2">Make Admin</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id} className={index % 2 ? "bg-gray-100" : ""}>
                            <td className="px-4 py-2 whitespace-nowrap">{user.name}</td>
                            <td className="px-4 py-2 whitespace-nowrap">{user.email}</td>
                            <td className="px-4 py-2 whitespace-nowrap">
                                <button
                                    onClick={() => handleMakeModerator(user._id)}
                                    disabled={user.role === "moderator"}
                                    className={`rounded-md px-4 py-2 text-green-500 border-2 border-green-300 hover:bg-gray-600 hover:border-none hover:text-white ${user.role === "moderator" && "opacity-50 cursor-not-allowed"}`}>
                                    Make Moderator
                                </button>
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">
                                <button
                                    onClick={() => handleMakeAdmin(user._id)}
                                    disabled={user.role === "admin"}
                                    className={`rounded-md px-4 py-2 text-red-500 border-2 border-red-300 hover:bg-gray-600 hover:border-none hover:text-white ${user.role === "admin" && "opacity-50 cursor-not-allowed"}`}>
                                    Make Admin
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;
