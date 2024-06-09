import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosBase from "../../CustomHooks/useAxiosBase";
import PropTypes from 'prop-types';
import { Navigate, useLocation } from "react-router-dom";


const ModeratorPrivateRoute = ({ children }) => {
    const {user, loading} = useContext(AuthContext);
    const axiosBase = useAxiosBase();
    const location = useLocation();

    const {data: userFromDb = {}, isPending} = useQuery({
        queryKey: [`${user.email}`, "user"],
        queryFn: async () =>{
            const res = await axiosBase.get(`/user/${user.email}`);
            return res.data;
        }
    })

    if (loading || isPending) {
        return (
            <div className="flex justify-center items-center mt-10">
                <div>
                    <span className="loading loading-ring loading-xs"></span>
                    <span className="loading loading-ring loading-sm"></span>
                    <span className="loading loading-ring loading-md"></span>
                    <span className="loading loading-ring loading-lg"></span>
                </div>
            </div>
        )
    }
    const isModarator = userFromDb.role === 'modarator';

    if (user && isModarator) {
        return children;
    }
    return <Navigate state={location.pathname} to="/login"></Navigate>
};

export default ModeratorPrivateRoute;


ModeratorPrivateRoute.propTypes = {
    children: PropTypes.node
}