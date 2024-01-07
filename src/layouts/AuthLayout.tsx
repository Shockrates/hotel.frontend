import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';



function AuthLayout() {

    const { user } = useAuth();
  
    // if user is logged in, redirect to Home page
    if (user) {
        return <Navigate to="/" />;
    }
    return (
        <>
             <Outlet />
        </>
       
    )
}

export default AuthLayout