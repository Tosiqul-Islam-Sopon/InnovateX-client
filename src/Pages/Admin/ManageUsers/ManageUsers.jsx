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
            const users = res.data.filter(data => data.email !== user.email);
            return users;
        }
    });

    console.log(users);

    const handleMakeModerator = (userId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make modarator!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                axiosBase.patch(`/user/updateUser/${userId}?role=modarator`)
                    .then(() => {
                        // console.log(res.data);
                        refetch();
                    })
                    .catch(() => {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Modarator making Failed!!!",
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
                        // console.log(res.data);
                        refetch();
                    })
                    .catch(() => {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Admin making Failed!!!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })
            }
        });
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
            <table className="table-auto w-full">
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
                        <tr key={user._id} className={index % 2 && "bg-gray-100"}>
                            <td className=" px-4 py-2">{user.name}</td>
                            <td className=" px-4 py-2">{user.email}</td>
                            <td className=" px-4 py-2">
                                <button
                                    onClick={() => handleMakeModerator(user._id)}
                                    disabled={user?.role === "modarator"}
                                    className={`rounded-md px-4 py-2 text-green-500 border-2 border-green-300 hover:bg-gray-600 hover:border-none hover:text-white ${user?.role === "modarator" && "opacity-50 cursor-not-allowed"}`}>
                                    Make Moderator
                                </button>
                            </td>
                            <td className=" px-4 py-2 border-b ">
                                <button
                                    onClick={() => handleMakeAdmin(user._id)}
                                    disabled={user?.role === "admin"}
                                    className={`rounded-md px-4 py-2 text-red-500 border-2 border-red-300 hover:bg-gray-600 hover:border-none hover:text-white ${user?.role === "admin" && "opacity-50 cursor-not-allowed"}`}>
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
