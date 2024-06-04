import PropTypes from 'prop-types';
import { FaArrowAltCircleUp } from 'react-icons/fa';

const ProductCard = ({ product }) => {
    const { name, image, tags, upVote, uploaderInfo } = product;

    return ( 
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transition duration-500 ease-in-out transform hover:-translate-y-2 min-h-[500px]">
            <img src={image} alt={name} className="w-full h-56 object-cover object-center" />
            <div className="p-4">
                <h3 className="text-gray-900 font-semibold text-lg mb-2">{name}</h3>
                <p className="text-gray-600 text-sm mb-4">{tags.join(', ')}</p>
                <div className="flex items-center justify-between">
                    <button className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded-md">
                    <FaArrowAltCircleUp /> <span>{upVote}</span>
                    </button>
                    <div className="flex items-center">
                        <img src={uploaderInfo.uploaderImage} alt={uploaderInfo.uploaderName} className="w-6 h-6 rounded-full mr-2" />
                        <span className="text-gray-600 text-sm">{uploaderInfo.uploaderName}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;


ProductCard.propTypes = {
    product: PropTypes.object
}