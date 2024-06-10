import { useEffect, useState } from 'react';
import useAxiosBase from '../../../CustomHooks/useAxiosBase';
import ProductCard from '../../ShareAll/ProductCard';
import { useQuery } from '@tanstack/react-query';

const Products = () => {
    const axiosBase = useAxiosBase();
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const itemsPerPage = 6;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosBase.get(`/products/productCount?search=${searchQuery}`);
                setCount(res.data.count);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [axiosBase, searchQuery]);


    const totalPages = Math.ceil(count / itemsPerPage);

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    const { data: products = [] } = useQuery({
        queryKey: ["products", itemsPerPage, currentPage, searchQuery],
        queryFn: async () => {
            const res = await axiosBase.get(`/products/pageProducts?size=${itemsPerPage}&page=${currentPage}&search=${searchQuery}`);
            return res.data;
        }
    });

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div className='pt-24 mb-10'>
            <div className="container mx-auto px-4">
                <h1 className="text-3xl text-center font-bold mb-8">All Products</h1>
                <div className='mx-auto w-fit my-8'>
                    <div className="join mx-auto">
                        <input
                            className="input input-bordered join-item"
                            type="text"
                            placeholder="Search products by tags..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <button
                            className="btn join-item rounded-r-full text-white text bg-green-500">
                            Search
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        products.length > 0 ? <>
                            {
                                products.map((product, index) => (
                                    <ProductCard key={index} product={product} />
                                ))
                            }
                        </>
                            :
                            <>
                                <h1 className='text-2xl text-center col-span-3 font-bold'>No Product Fount</h1>
                            </>
                    }
                </div>
            </div>
            {
                pages.length > 0 && <div className='mx-auto w-fit flex items-center justify-center my-8 space-x-4'>
                    <button
                        className='border py-1 px-2 rounded bg-gray-500 hover:bg-green-500 text-white flex items-center'
                        onClick={
                            () => { currentPage > 1 && setCurrentPage(currentPage - 1) }}>
                        Prev
                    </button>
                    {
                        pages.map(ind => <button
                            className={`border py-1 px-2 rounded ${currentPage === ind && 'bg-green-500 text-white'}`}
                            onClick={() => setCurrentPage(ind)}
                            key={ind}>
                            {ind}
                        </button>)
                    }
                    <button
                        className='border p-1 rounded bg-gray-500 text-white hover:bg-green-500 flex items-center space-x-1'
                        onClick={
                            () => { currentPage < totalPages && setCurrentPage(currentPage + 1) }}>
                        Next
                    </button>
                </div>
            }

        </div>
    );
};

export default Products;
