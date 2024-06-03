import { useContext, useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { IoMdClose } from "react-icons/io";
import Swal from "sweetalert2";

const Navbar = () => {

    const navLinks = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/products">Products</NavLink></li>
    </>
    const { user, logOut } = useContext(AuthContext);
    const [leftDropdownOpen, setLeftDropdownOpen] = useState(false);
    const [rightDropdownOpen, setRightDropdownOpen] = useState(false);
    const leftDropdownRef = useRef(null);
    const rightDropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                (leftDropdownRef.current && !leftDropdownRef.current.contains(event.target)) &&
                (rightDropdownRef.current && !rightDropdownRef.current.contains(event.target))
            ) {
                setLeftDropdownOpen(false);
                setRightDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleLeftDropdown = () => {
        setLeftDropdownOpen(!leftDropdownOpen);
        if (rightDropdownOpen) {
            setRightDropdownOpen(false);
        }
    };

    const toggleRightDropdown = () => {
        setRightDropdownOpen(!rightDropdownOpen);
        if (leftDropdownOpen) {
            setLeftDropdownOpen(false);
        }
    };

    const handleLogout = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Log Out Successful",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => {
                Swal.fire({
                    title: "OPPS!!!",
                    text: `${error.message}`,
                    icon: "error"
                });
            });
    };

    return (
        <div className="navbar bg-gray-800 text-white fixed z-10">
            <div className="navbar-start">
                <div className="dropdown" ref={leftDropdownRef}>
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle" onClick={toggleLeftDropdown}>
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
                            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black">
                                {navLinks}
                            </ul>
                        )
                    }
                </div>
            </div>
            <div className="navbar-center">
                <a className="btn btn-ghost text-xl">InnovateX</a>
            </div>
            <div className="navbar-end lg:mr-5">
                {user ? (
                    <div className="relative" ref={rightDropdownRef}>
                        <button onClick={toggleRightDropdown}>
                            <img src={user.photoURL} className="w-14 h-14 rounded-full" alt={`${user.displayName} pic`} />
                        </button>
                        {
                            rightDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                                    <div className="px-4 py-2 text-gray-700">{user.displayName}</div>
                                    <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-200" onClick={() => setRightDropdownOpen(false)}>
                                        Dashboard
                                    </Link>
                                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200">
                                        Logout
                                    </button>
                                </div>
                            )
                        }
                    </div>
                ) : (
                    <button className="btn btn-ghost btn-circle">
                        <Link to="/login">Login</Link>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
