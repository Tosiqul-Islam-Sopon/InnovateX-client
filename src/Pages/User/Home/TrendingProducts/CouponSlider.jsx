import { useQuery } from '@tanstack/react-query';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import useAxiosBase from '../../../../CustomHooks/useAxiosBase';
import offerImg from "../../../../assets/Images/offer.jpg"

const AutoplaySlider = withAutoplay(AwesomeSlider);

const CouponSlider = () => {
    const axiosBase = useAxiosBase();
    const {data: coupons = []} = useQuery({
        queryKey: ["coupons"],
        queryFn: async () =>{
            const res = await axiosBase.get("/coupons");
            return res.data;
        }
    })
    return (
        <div>
            <AutoplaySlider
                play={true}
                cancelOnInteraction={false} // should stop playing on user interaction
                interval={2000}
            >
                {coupons.map((coupon) => (
                    <div key={coupon._id} data-src={offerImg} >
                        <div className="coupon-info">
                            <h3>{coupon?.code}</h3>
                            <p>{coupon?.description}</p>
                            <p>Discount: {coupon?.discount}</p>
                            <p>Expires: {coupon?.expiryDate}</p>
                        </div>
                    </div>
                ))}
            </AutoplaySlider>
        </div>
    );
};

export default CouponSlider;