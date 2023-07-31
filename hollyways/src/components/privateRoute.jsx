import { react, useContext } from 'react'
import { UserContext } from '../context/UserContext';
import { Navigate, Outlet } from 'react-router-dom';


export function PrivateRouteLogin() {
    const [state] = useContext(UserContext);

    const isLogin = state.isLogin

    if (isLogin === false) return <Navigate to="/login" />
    return <Outlet />
}

