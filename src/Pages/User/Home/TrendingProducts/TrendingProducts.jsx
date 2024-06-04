import { useState } from 'react';
import ProductCard from '../../../ShareAll/ProductCard';
import useAxiosBase from '../../../../CustomHooks/useAxiosBase';

const TrendingProducts = () => {
    const [trendingProducts, setTrendingProducs] = useState([]);
    const axiosBase = useAxiosBase();
    axiosBase.get("/featuredProducts")
        .then(res => {
            const sortedProducts = res.data.sort((a, b) => b.upVote - a.upVote);
            setTrendingProducs(sortedProducts);
        })
        .catch(error => console.log(error));
    return (
        <div>

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Trending Products</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trendingProducts.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>
            </div>

        </div>
    );
};

export default TrendingProducts;
