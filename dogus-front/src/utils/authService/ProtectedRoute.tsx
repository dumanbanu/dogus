import { Outlet, Navigate } from 'react-router-dom'
import { getAuthUser } from './Index';

const ProtectedRoute = () : JSX.Element => {
   const isAuth = getAuthUser();
    return(
        isAuth ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default ProtectedRoute;