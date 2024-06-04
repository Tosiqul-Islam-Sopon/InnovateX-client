import { Outlet } from "react-router-dom";
import Navbar from "../../Pages/ShareAll/Navbar";
import Footer from "../../Pages/ShareAll/Footer";

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