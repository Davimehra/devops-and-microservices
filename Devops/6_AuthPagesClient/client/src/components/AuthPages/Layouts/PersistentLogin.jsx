import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom"
import { addToAuth, emptyAuth } from "../../../redux/slices/authSlice";
import requestAccessToken from "../../../hooks/refreshTokenApi";
import LoadingPage from "../../HelperComponents/LoadingPage";
import consoleLog from "../../../hooks/consoleLog";

function AuthChecker({ auth }) {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const logMessage = consoleLog();

    useEffect(() => {
        const refresh = requestAccessToken();
        let isMounted = true;
        logMessage("New Access Token Started ")
        const createAccessToken = async () => {
            try {
                const { accessToken, roleIds } = await refresh();
                dispatch(addToAuth({ accessToken, roleIds }));

            } catch (err) {
                logMessage("AccessToken unabled to refresh")
                dispatch(emptyAuth());
            } finally {
                isMounted && setIsLoading(false)
            }
        }

        (!auth?.accessToken) ? createAccessToken() : setIsLoading(false)

        return () => {
            isMounted = false
        }

    }, [])

    return (
        isLoading ? <LoadingPage /> : <Outlet />
    )
}


export default connect((state) => { return { auth: state?.auth } })(AuthChecker)