import { useQuery } from '@tanstack/react-query';
// import AwesomeSlider from 'react-awesome-slider';
// import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import useAxiosBase from '../../../../CustomHooks/useAxiosBase';

// const AutoplaySlider = withAutoplay(AwesomeSlider);

const CouponSlider = () => {
    const axiosBase = useAxiosBase();
    const { data: coupons = [] } = useQuery({
        queryKey: ["coupons"],
        queryFn: async () => {
            const res = await axiosBase.get("/coupons");
            return res.data;
        }
    })
    return (
        <div className='flex items-center justify-center'>
            <div className="carousel w-1/2">
                {
                    coupons.map((coupon) => <div key={coupon._id} id="slide1" className="carousel-item relative w-full">
                    <div className='bg-green-500 min-w-full text-center rounded-xl'>
                        <h1>{coupon.description}</h1>
                        <h1 className='text-5xl mt-5 '><span>Use coupon code </span><br /> {coupon.code}</h1>
                        <h1 className='text-3xl'>Get {coupon.discount}% off</h1>
                        <h1>Claim it before { new Date(coupon.expiryDate).toLocaleDateString()}</h1>
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide4" className="btn btn-circle">❮</a>
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div>)
                }
            </div>
            {/* <AutoplaySlider
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
            </AutoplaySlider> */}
        </div>
    );
};

export default CouponSlider;