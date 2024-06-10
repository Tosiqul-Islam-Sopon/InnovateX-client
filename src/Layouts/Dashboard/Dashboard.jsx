
import { useContext, useEffect, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaHome, FaList, FaUsers } from "react-icons/fa";
import { FcStatistics } from "react-icons/fc";
import { MdLibraryAdd, MdLibraryAddCheck, MdReport } from "react-icons/md";
import { RiCoupon2Fill } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosBase from "../../CustomHooks/useAxiosBase";
import { useQuery } from "@tanstack/react-query";
import { IoMdClose } from "react-icons/io";


const Dashboard = () => {

    const { user } = useContext(AuthContext);
    const axiosBase = useAxiosBase();
    const [leftDropdownOpen, setLeftDropdownOpen] = useState(false);
    const leftDropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                (leftDropdownRef.current && !leftDropdownRef.current.contains(event.target))
            ) {
                setLeftDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const { data: userFromDb = {} } = useQuery({
        queryKey: [`${user.email}`, "user"],
        queryFn: async () => {
            const res = await axiosBase.get(`/user/${user.email}`);
            return res.data;
        }
    })
    const isAdmin = userFromDb.role === 'admin';
    const isModarator = userFromDb.role === 'modarator';


    return (
        <div>
            <div className="hidden lg:flex">
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
            <div className="lg:hidden z-10">
                <h1 className="text-center text-3xl font-bold">Dashboard</h1>
                <div className="navbar-start">
                    <div className="dropdown" ref={leftDropdownRef}>
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle" onClick={() => setLeftDropdownOpen(!leftDropdownOpen)}>
                            {
                                leftDropdownOpen ? (
                                    <p className="text-2xl"><IoMdClose />
                                    </p>
                                )
                                    :
                                    (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                                    )
                            }
                        </div>
                        {
                            leftDropdownOpen && (
                                <ul className="menu menu-sm dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black">
                                    {
                                        isAdmin ? <>
                                            <li onClick={() => setLeftDropdownOpen(!leftDropdownOpen)}>
                                                <NavLink to="/dashboard/statistics">
                                                    <FcStatistics />
                                                    Statistics</NavLink>
                                            </li>
                                            <li onClick={() => setLeftDropdownOpen(!leftDropdownOpen)}>
                                                <NavLink to="/dashboard/manageUsers">
                                                    <FaUsers />
                                                    Manage Users</NavLink>
                                            </li>
                                            <li onClick={() => setLeftDropdownOpen(!leftDropdownOpen)}>
                                                <NavLink to="/dashboard/manageCoupons">
                                                    <RiCoupon2Fill />
                                                    Manage Coupons</NavLink>
                                            </li>
                                        </>
                                            :
                                            isModarator ? <>
                                                <li onClick={() => setLeftDropdownOpen(!leftDropdownOpen)}>
                                                    <NavLink to="/dashboard/productReview">
                                                        <FaList />
                                                        Product Review Queue</NavLink>
                                                </li>
                                                <li onClick={() => setLeftDropdownOpen(!leftDropdownOpen)}>
                                                    <NavLink to="/dashboard/reportedContent">
                                                        <MdReport />
                                                        Reported Contents</NavLink>
                                                </li>
                                            </>
                                                :
                                                <>
                                                    <li onClick={() => setLeftDropdownOpen(!leftDropdownOpen)}>
                                                        <NavLink to="/dashboard/profile">
                                                            <CgProfile />
                                                            My Profile
                                                        </NavLink>
                                                    </li>
                                                    <li onClick={() => setLeftDropdownOpen(!leftDropdownOpen)}>
                                                        <NavLink to="/dashboard/addProduct">
                                                            <MdLibraryAdd />
                                                            Add Products</NavLink>
                                                    </li>
                                                    <li onClick={() => setLeftDropdownOpen(!leftDropdownOpen)}>
                                                        <NavLink to="/dashboard/myProducts">
                                                            <MdLibraryAddCheck />
                                                            My Products</NavLink>
                                                    </li>
                                                </>


                                    }

                                    <div className="divider"></div>
                                    <li onClick={() => setLeftDropdownOpen(!leftDropdownOpen)}>
                                        <NavLink to="/">
                                            <FaHome></FaHome>
                                            Home</NavLink>
                                    </li>
                                </ul>



                            )
                        }
                    </div>

                </div>
                    <div className="w-full">
                        <Outlet></Outlet>
                    </div>
            </div>
        </div>
    );
};

export default Dashboard;