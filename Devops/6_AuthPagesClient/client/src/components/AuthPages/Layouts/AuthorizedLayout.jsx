import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
function AuthorizedLayout() {
    const location = useLocation();
    const auth = useSelector((state) => state?.auth)


    return (auth?.accessToken ? <Outlet /> :
        <Navigate to={"/va"} state={{ from: location?.pathname }} replace />
    )

}

export default AuthorizedLayout
