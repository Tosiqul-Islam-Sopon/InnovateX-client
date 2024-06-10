import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";

const DashboardHome = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className="mt-16 text-center">
            <h1 className="text-2xl">Welcome to Dashboard</h1>
            <h1 className="text-2xl lg:text-4xl font-bold mb-5">{user?.displayName}</h1>
            <p>How are you today?</p>
        </div>
    );
};

export default DashboardHome;