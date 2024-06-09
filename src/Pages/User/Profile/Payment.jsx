import PropTypes from 'prop-types';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from './CheckOutForm';
import { useParams } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_PK_STRIPE)

const Payment = () => {
    const { amount } = useParams();
    return (
        <div className="">
            <div className='text-center'>
                <h1 className='text-3xl font-bold mb-10'>Pay to get Membership</h1>
            </div>
            <Elements stripe={stripePromise}>
                <CheckOutForm amount={parseInt(amount)}></CheckOutForm>
            </Elements>
        </div>
    );
};

export default Payment;

Payment.propTypes = {
    amount: PropTypes.number
}
