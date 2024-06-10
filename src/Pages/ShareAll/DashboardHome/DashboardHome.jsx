import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";

const DashboardHome = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className="mt-16 text-center space-y-5">
            <h1 className="text-3xl">Welcome to Dashboard {user?.displayName}</h1>
            <p>How are you today?</p>
        </div>
    );
};

export default DashboardHome;