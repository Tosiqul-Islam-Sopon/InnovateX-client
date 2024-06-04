import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { Link } from "react-router-dom";

const Profile = () => {
    const { user } = useContext(AuthContext);
    // const [isSubscribed, setIsSubscribed] = useState(user?.isSubscribed); // Assuming user object has isSubscribed property
    const isSubscribed = false;
    const subscriptionAmount = "$10"; // Example amount


    return (
        <div className="hero min-h-screen bg-gray-100">
            <div className="hero-content flex flex-col lg:flex-row items-center">
                <img
                    src={user?.photoURL}
                    alt="Profile"
                    className="w-32 h-32 lg:w-48 lg:h-48 rounded-full shadow-lg mb-6 lg:mb-0 lg:mr-8"
                />
                <div className="text-center lg:text-left">
                    <h1 className="text-3xl font-bold">{user?.displayName}</h1>
                    <p className="py-4 text-gray-600">{user?.email}</p>
                    {!isSubscribed && (
                        <Link to={"/dashboard/payment"} amount={subscriptionAmount}>
                            <button className="btn btn-primary mt-4">
                                Subscribe for {subscriptionAmount}
                            </button>
                        </Link>
                    )}
                    {isSubscribed && (
                        <p className="mt-4 text-green-600">Status: Verified</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
