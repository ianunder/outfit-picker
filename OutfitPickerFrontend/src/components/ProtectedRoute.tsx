import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";


const ProtectedRoute = ({children}: { children: React.ReactNode }) => {

    const {isAuthenticated} = useAuth();

    if(!isAuthenticated){
        return <Navigate to="/"></Navigate>
    }else{
        return children;
    }

}

export default ProtectedRoute;