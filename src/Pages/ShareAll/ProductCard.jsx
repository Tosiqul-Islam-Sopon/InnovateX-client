import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import useAxiosBase from '../../CustomHooks/useAxiosBase';
import { AiOutlineLike } from 'react-icons/ai';

const ProductCard = ({ product, refetch }) => {
    const { name, productImage, tags, upVote, owner, _id } = product;
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosBase = useAxiosBase();
    const [showMessage, setShowMessage] = useState(false);

    const handleUpVote = async (productId) => {
        if (!user) {
            navigate("/login");
        }
        const response = await axiosBase.get(`/users/upVoteStatus/${productId}?email=${user.email}`)
        const userVotingStatus = response.data;
        if (!userVotingStatus) {
            // console.log("fuck.........");
            await axiosBase.patch(`/users/upVotes/${productId}?email=${user.email}`);
            const res = await axiosBase.patch(`/products/upVote/${productId}`);
            if (res.data.modifiedCount) {
                refetch();
            }
            // console.log(res.data);
        }
        else {
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 2000);
        }
    }

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transition duration-500 ease-in-out transform hover:-translate-y-2 min-h-[500px]">
            <img src={productImage} alt={name} className="w-full h-56 object-cover object-center" />
            <div className="p-4 flex flex-col justify-between">
                <div>
                    <h3 className="text-gray-900 font-semibold text-lg mb-2">{name}</h3>
                    <div className="flex flex-wrap mb-4">
                        {tags.map((tag, index) => (
                            <span key={index} className="mr-2 mb-2 bg-gray-200 text-gray-800 px-2 py-1 rounded">#{tag}</span>
                        ))}
                    </div>
                    {showMessage && (
                        <p className="text-red-500 text-sm">You&apos;ve already upvoted this product</p>
                    )}
                    <div className="flex items-center justify-between">

                        <button
                            onClick={() => handleUpVote(_id)}
                            disabled={user?.email === owner.email}
                            className={`flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded-md ${user?.email === owner.email && "opacity-30 cursor-not-allowed"}`}>
                            <AiOutlineLike /> <span>{upVote}</span>
                        </button>
                        <div className="flex items-center">
                            <img src={owner.image} alt={owner.name} className="w-6 h-6 rounded-full mr-2" />
                            <span className="text-gray-600 text-sm">{owner.name}</span>
                        </div>
                    </div>
                </div>

                <div className='mt-8 w-full'>
                    <Link to={`/productDetails/${_id}`}>
                        <button
                            className='w-full p-2 bg-blue-500 text-white rounded-xl hover:bg-transparent hover:border hover:text-black border-gray-400'
                        >
                            View Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
    refetch: PropTypes.func.isRequired
};
