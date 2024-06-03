import { Outlet } from "react-router-dom";
import Navbar from "../ShareAll/Navbar";
import Footer from "../ShareAll/Footer";

const Root = () => {
    return (
        <div>
            <div>
                <Navbar></Navbar>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;