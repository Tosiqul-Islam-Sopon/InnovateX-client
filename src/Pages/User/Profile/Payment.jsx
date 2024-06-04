import {  useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';


const Payment = ({amount}) => {
    const navigate = useNavigate();

    const handlePaymentSuccess = () => {
        
        navigate("/dashboard/profile");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Payment</h2>
                <p>Complete your payment of {amount} to subscribe.</p>
                <button onClick={handlePaymentSuccess} className="btn btn-success mt-4 w-full">
                    Complete Payment
                </button>
            </div>
        </div>
    );
};

export default Payment;

Payment.propTypes = {
    amount: PropTypes.number
}
