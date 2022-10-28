import { Navigate, Outlet } from 'react-router-dom';


const PrivateRouter = () => {
    const isToken = localStorage.getItem('token');

    return isToken ? <Outlet /> : <Navigate to={"/auth"} />
}

export default PrivateRouter;