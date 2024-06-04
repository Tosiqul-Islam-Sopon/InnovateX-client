import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { MdLibraryAdd, MdLibraryAddCheck } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
    const isAdmin = false;
    return (
        <div className="flex">
            <div className="w-56 bg-[#D1A054] min-h-screen p-4">
                <h1 className="text-xl mb-10 font-bold">Prito Restaurant</h1>
                {
                    isAdmin ? <>
                        <ul>
                            <li><NavLink className="flex items-center text-lg gap-3 uppercase"><FaHome></FaHome>Admin Home</NavLink></li>

                            <li><NavLink className="flex items-center text-lg gap-3 uppercase"><FaHome></FaHome>Add Items</NavLink></li>

                            <li><NavLink className="flex items-center text-lg gap-3 uppercase"><FaHome></FaHome>Manage Items</NavLink></li>

                            <li><NavLink to={"users"} className="flex items-center text-lg gap-3 uppercase mt-3 bg-green-600 p-2 rounded text-white"><FaCartShopping></FaCartShopping>All Users</NavLink></li>
                        </ul>
                    </>
                        :
                        <>
                            <ul>
                                <li><NavLink className="flex items-center text-lg gap-3 uppercase"><CgProfile />My Profile</NavLink></li>

                                <li><NavLink className="flex items-center text-lg gap-3 uppercase"><MdLibraryAdd />Add Products</NavLink></li>

                                <li><NavLink className="flex items-center text-lg gap-3 uppercase"><MdLibraryAddCheck />My Products</NavLink></li>
                            </ul>
                        </>
                }
                <h1 className="border-t-2 border-white my-10"></h1>
                <ul>
                    <li><NavLink to={"/"} className="flex items-center text-lg gap-3 uppercase"><FaHome></FaHome> Home</NavLink></li>
                </ul>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;