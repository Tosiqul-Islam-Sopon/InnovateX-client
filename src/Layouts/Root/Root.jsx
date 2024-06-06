import { Outlet } from "react-router-dom";
import Navbar from "../../Pages/ShareAll/Navbar";
import Footer from "../../Pages/ShareAll/Footer";

const Root = () => {
    return (
        <div className="flex flex-col justify-between min-h-screen">
            <div>
                <Navbar></Navbar>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;