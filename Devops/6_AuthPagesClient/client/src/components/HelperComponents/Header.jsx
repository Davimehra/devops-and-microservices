import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import HeaderCss from '../../css/subComponents/Header.module.css'
import { addToAuth, emptyAuth } from "../../redux/slices/authSlice";
import requestAccessToken from "../../hooks/refreshTokenApi";
import consoleLog from "../../hooks/consoleLog";
import { axiosConfig } from "../../axios/axiosConfig";

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useSelector((state) => state?.auth);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState()
    const logMessage = consoleLog();
    const personalInfo = useSelector((state) => state?.personalInfo)

    logMessage("Header Rendered")
    useEffect(() => {
        const refresh = requestAccessToken();
        let isMounted = true;


        const createAccessToken = async () => {
            try {
                const { accessToken } = await refresh();
                dispatch(addToAuth({ accessToken }));
            } catch (err) {
                logMessage("AccessToken unabled to Refresh in UseEffect of Header")
            } finally {
                isMounted && setIsLoading(false)
            }
        }

        !auth?.accessToken ? createAccessToken() : setIsLoading(false)

        return () => {
            isMounted = false
        }

    }, [])

    const SignInHandler = () => {
        navigate('/signin', { state: { from: location.pathname } })
    }
    const SiteNameHandler = () => {
        navigate('/homepage')
    }
    const SignUpHandler = (event) => {
        navigate('/signup', { state: { from: location.pathname } })
    }
    const SignOutHandler = async () => {

        await axiosConfig({ url: '/auth/user/signout', method: 'post', contentType: 'application/json' }).then((res) => {
            dispatch(emptyAuth());
        }).catch((err) => {
            logMessage("Error Occured while SignOut Request")
        })
    }
    return (
        <React.Fragment>
            <div className={HeaderCss.MainContainer}>
                <div className={HeaderCss.SiteNameContainer} ><p onClick={SiteNameHandler}>{personalInfo?.name}</p></div>
                <div>{personalInfo?.email}</div>
                <div className={HeaderCss.ButtonContainer}>
                    <button onClick={auth?.accessToken ? SignOutHandler : SignInHandler}>{`${auth?.accessToken ? "SignOut" : "SignIn"}`}</button>
                    {!auth?.accessToken && <button onClick={SignUpHandler}>SignUp</button>}
                </div>

            </div>
        </React.Fragment>

    )
}