
import { CgProfile } from "react-icons/cg";
import { FaBook, FaHome, FaList, FaUsers, FaUtensils } from "react-icons/fa";
import { MdLibraryAdd, MdLibraryAddCheck } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
    const isAdmin = false;

    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-4">
                    {
                        isAdmin ? <>
                            <li>
                                <NavLink to="/dashboard/adminHome">
                                    <FaHome></FaHome>
                                    Admin Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addItems">
                                    <FaUtensils></FaUtensils>
                                    Add Items</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageItems">
                                    <FaList></FaList>
                                    Manage Items</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/bookings">
                                    <FaBook></FaBook>
                                    Manage Bookings</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/users">
                                    <FaUsers></FaUsers>
                                    All Users</NavLink>
                            </li>
                        </>
                            :
                            <>
                                <li>
                                    <NavLink to="/dashboard/profile">
                                        <CgProfile />
                                        My Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/addProduct">
                                        <MdLibraryAdd />
                                        Add Products</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/myProducts">
                                        <MdLibraryAddCheck />
                                        My Products</NavLink>
                                </li>
                            </>
                    }

                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;