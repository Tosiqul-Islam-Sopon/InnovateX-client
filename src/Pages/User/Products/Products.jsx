import useAxiosBase from '../../../CustomHooks/useAxiosBase';
import ProductCard from '../../ShareAll/ProductCard';
import { useQuery } from '@tanstack/react-query';

const Products = () => {
    // const [featureProducts, setFeaturedProducs] = useState([]);
    const axiosBase = useAxiosBase();
    
    const {data: products = []} = useQuery({
        queryKey: ["products"],
        queryFn: async () =>{
            const res = await axiosBase.get("/products");
            return res.data;
        }
    })
    // axiosBase.get("/featuredProducts")
    //     .then(res => setFeaturedProducs(res.data))
    //     .catch(error => console.log(error));
    return (
        <div className='pt-24 mb-10'>
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8">All Products</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Products;
