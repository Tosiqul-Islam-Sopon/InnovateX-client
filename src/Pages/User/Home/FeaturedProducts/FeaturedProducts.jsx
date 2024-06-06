import ProductCard from '../../../ShareAll/ProductCard';
import useAxiosBase from '../../../../CustomHooks/useAxiosBase';
import { useQuery } from '@tanstack/react-query';

const FeaturedProducts = () => {
    // const [featureProducts, setFeaturedProducs] = useState([]);
    const axiosBase = useAxiosBase();
    const {data: featureProducts = [], refetch} = useQuery({
        queryKey: ["featureProducts"],
        queryFn: async () =>{
            const res = await axiosBase.get("/products/featuredProducts");
            const sortedProducts = res.data.sort((a, b) => {
                const timestampA = new Date(a.timestamp);
                const timestampB = new Date(b.timestamp);
                return timestampB - timestampA;
            });
            return sortedProducts;
        }
    })
    return (
        <div>

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Featured Products</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featureProducts.map((product, index) => (
                        <ProductCard key={index} product={product} refetch={refetch} />
                    ))}
                </div>
            </div>

        </div>
    );
};

export default FeaturedProducts;
