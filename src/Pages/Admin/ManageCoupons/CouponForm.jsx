import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

const CouponForm = ({ onSave, coupon = {} }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            _id: coupon?._id || null,
            code: coupon?.code || '',
            expiryDate: coupon?.expiryDate || '',
            description: coupon?.description || '',
            discount: coupon?.discount || ''
        }
    });

    const onSubmit = (data) => {
        onSave(data);
        reset();
    };

    return (
        <form className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-xl font-bold mb-4">Add/Edit Coupon</h2>

            <input type="hidden" {...register('_id')} />
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">
                    Coupon Code
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="code"
                    type="text"
                    {...register('code', { required: true })}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiryDate">
                    Expiry Date
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="expiryDate"
                    type="date"
                    {...register('expiryDate', { required: true })}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Description
                </label>
                <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="description"
                    {...register('description', { required: true })}
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="discount">
                    Discount Amount
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="discount"
                    type="number"
                    step="0.01"
                    {...register('discount', { required: true })}
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Save Coupon
                </button>
            </div>
        </form>
    );
};

export default CouponForm;

CouponForm.propTypes = {
    onSave: PropTypes.func.isRequired,
    coupon: PropTypes.object
}
