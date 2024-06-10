import ProductCard from '../../../ShareAll/ProductCard';
import useAxiosBase from '../../../../CustomHooks/useAxiosBase';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import CouponSlider from './CouponSlider';

const TrendingProducts = () => {
    // const [trendingProducts, setTrendingProducs] = useState([]);
    const axiosBase = useAxiosBase();

    const { data: trendingProducts = [], refetch } = useQuery({
        queryKey: ["trendingProducts"],
        queryFn: async () => {
            const res = await axiosBase.get("/products/trendingProducts");
            return res.data;
        }
    })
    return (
        <div>
            <CouponSlider></CouponSlider>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Trending Products</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trendingProducts.map((product, index) => (
                        <ProductCard key={index} product={product} refetch={refetch} />
                    ))}
                </div>
                <div className='mx-auto w-fit mt-10'>
                    <Link to={"/products"}>
                        <button
                            className=' p-2 bg-[#FF5700] text-white rounded-xl hover:bg-transparent hover:border hover:text-black border-gray-400'>
                            Show All Products
                        </button>
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default TrendingProducts;
