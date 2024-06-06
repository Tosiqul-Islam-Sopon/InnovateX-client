
import { CgProfile } from "react-icons/cg";
import { FaHome, FaList, FaUsers } from "react-icons/fa";
import { FcStatistics } from "react-icons/fc";
import { MdLibraryAdd, MdLibraryAddCheck, MdReport } from "react-icons/md";
import { RiCoupon2Fill } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
    const isAdmin = false;
    const isModarator = true;

    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-base-300 shadow-lg">
                <h1 className="text-2xl font-bold text-center mt-4">Dashboard</h1>
                <ul className="menu p-4">
                    {
                        isAdmin ? <>
                            <li>
                                <NavLink to="/dashboard/statistics">
                                    <FcStatistics />
                                    Statistics</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageUsers">
                                    <FaUsers />
                                    Manage Users</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageCoupons">
                                    <RiCoupon2Fill />
                                    Manage Coupons</NavLink>
                            </li>
                        </>
                            :
                            isModarator ? <>
                                <li>
                                    <NavLink to="/dashboard/productReview">
                                        <FaList />
                                        Product Review Queue</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/reportedContent">
                                        <MdReport />
                                        Reported Contents</NavLink>
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