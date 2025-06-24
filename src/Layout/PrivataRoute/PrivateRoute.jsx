
import { useContext } from "react";

import { Navigate, useLocation } from "react-router-dom";
import { context } from "../Authentication/NewProvider";


const PrivateRoutes = ({children}) => {
    const {user, loading} = useContext(context);

    const location = useLocation();
    

    if(loading){
       return <div className="w-10 h-10 mx-auto my-20 animate-spin rounded-full border-dashed border-8 border-[#3b9df8]"></div>
    }
    
    if(!user){
        return <Navigate to="/login" state={location.pathname}></Navigate>
    }
    return children;


};

export default PrivateRoutes;