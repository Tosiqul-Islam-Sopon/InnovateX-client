import { PieChart } from '@mui/x-charts/PieChart';
import { useQuery } from '@tanstack/react-query';
import useAxiosBase from '../../../CustomHooks/useAxiosBase';

const Statistics = () => {
    const axiosBase = useAxiosBase();

    const { data: stateObj = {} } = useQuery({
        queryKey: ["adminState"],
        queryFn: async () => {
            const res = await axiosBase.get("/adminStates");
            return res.data;
        }
    });

    const userCount = stateObj.userCount ? stateObj.userCount : 0;
    const productCount = stateObj.productCount ? stateObj.productCount : 0;
    const reviewCount = stateObj.reviewCount ? stateObj.reviewCount : 0;

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md max-w-3xl mx-auto mt-12">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Admin Statistics</h1>
            <div className="w-full flex justify-center">
                <PieChart
                    series={[
                        {
                            data: [
                                { id: 0, value: userCount, label: 'Users' },
                                { id: 1, value: productCount, label: 'Products' },
                                { id: 2, value: reviewCount, label: 'Reviews' },
                            ],
                        },
                    ]}
                    width={400}
                    height={200}
                />
            </div>
        </div>
    );
};

export default Statistics;
