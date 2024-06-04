import { useState } from 'react';
import useAxiosBase from '../../../CustomHooks/useAxiosBase';
import ProductCard from '../../ShareAll/ProductCard';

const Products = () => {
    const [featureProducts, setFeaturedProducs] = useState([]);
    const axiosBase = useAxiosBase();
    axiosBase.get("/featuredProducts")
        .then(res => setFeaturedProducs(res.data))
        .catch(error => console.log(error));
    return (
        <div className=''>

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">All Products</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featureProducts.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Products;
