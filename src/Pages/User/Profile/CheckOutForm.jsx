import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosBase from "../../../CustomHooks/useAxiosBase";
import PropTypes from 'prop-types';
import { AuthContext } from "../../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const CheckOutForm = ({ amount }) => {
    const {user} = useContext(AuthContext);
    const stripe = useStripe();
    const elements = useElements();
    const axiosBase = useAxiosBase();
    const [errorMsg, setErrorMsg] = useState("");
    const [clientSecret, setClientSecret] = useState();
    const [transectionId, setTransectionId] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        axiosBase.post("/create_payment_intent", { price: amount })
            .then(res => {
                // console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
    }, [axiosBase, amount])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setErrorMsg(error.message);
        } 
        else {
            console.log('[PaymentMethod]', paymentMethod);
            setErrorMsg("");
        }

        const {paymentIntent, error: confimError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || "anonymous",
                    email: user?.email || "anonymous"
                }
            }
        })

        if (confimError){
            console.log("confirm error ->", confimError);
        }
        else{
            if (paymentIntent.status === 'succeeded'){
                setTransectionId(paymentIntent.id)
                const payment = {
                    userEmail: user.email,
                    userName: user.displayName,
                    date: new Date().toISOString(),
                    transectionId,
                    amount
                };

                const res = await axiosBase.post("/payments", payment);
                const {paymentResponse, updateResponse} = res.data;
                if (paymentResponse.insertedId && updateResponse.modifiedCount){
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Payment Successful!!!",
                        text: "You are premium user now!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate("/dashboard/profile");
                }
                console.log(res.data);
            }
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" disabled={!stripe || !clientSecret} className="px-3 py-1 bg-green-500 text-white rounded mt-5 hover:bg-green-900">
                    Pay
                </button>
                <p className="text-red-500">{errorMsg}</p>
            </form>
        </div>
    );
};

export default CheckOutForm;

CheckOutForm.propTypes = {
    amount: PropTypes.number
}