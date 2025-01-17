import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToAuth } from "../../redux/slices/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { axiosConfig } from "../../axios/axiosConfig";
import ErrorRenderer from "../HelperComponents/ErrorHandler";
import AuthenticPageCss from '../../css/AuthenticPage.module.css'
import StatusHandlerCss from '../../css/StatusHandler.module.css'
import StatusRenderer from "../HelperComponents/StatusHandler";
import consoleLog from "../../hooks/consoleLog";

const SignPage = () => {
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const ErrorContainer = useRef(null);
    const ShowTextRef = useRef(null);
    const navigate = new useNavigate();
    const location = new useLocation();
    const dispatch = useDispatch();
    const [pageType, setPageType] = useState()
    const auth = useSelector((state) => state?.auth);
    const logMessage = consoleLog();

    useEffect(() => {
        if (location?.pathname == '/signin') {
            setPageType('signin')
        } else {
            if (location?.pathname == '/signup') {
                setPageType('signup')
            }
        }

        if (window.localStorage.getItem('email')) {
            emailInputRef.current.value = window.localStorage.getItem('email')
        }
        if (window.localStorage.getItem('password')) {
            passwordInputRef.current.value = window.localStorage.getItem('password')
        }
    }, [location])

    useEffect(() => {

        if (auth?.accessToken) {
            logMessage("Last location - ", location?.state?.from)
            navigate(`${location?.state?.from || '/homepage'}`, { replace: true })
        }
    }, [auth])
    async function onClick() {

        await axiosConfig({
            url: `/auth/user/${pageType == 'signin' ? 'signin' : 'signup'}`,
            method: 'post',
            data: { email: emailInputRef.current.value, password: passwordInputRef.current.value },
            contentType: "application/json",
        }).then((res) => {
            dispatch(addToAuth({ accessToken: res?.data?.payload }))
            window.localStorage.setItem('password', '');

            switch (res?.request?.status) {
                case 201:
                    navigate('/signin', { replace: true });
                    break;
                case 200:
                    navigate(`${location?.state?.from || '/homepage'}`, { replace: true })
                    break;
                default: StatusRenderer({ message: 'Please Try Again', StatusRef: ShowTextRef })

            }

        }).catch((error) => {
            ErrorRenderer({ err: error, ErrorContainerRef: ErrorContainer })
            window.localStorage.setItem('email', emailInputRef.current.value);
            window.localStorage.setItem('password', passwordInputRef.current.value);

        })
    }
    return (
        <div className={AuthenticPageCss.MainContainer}>
            <div className={AuthenticPageCss.ReferingContainer}>
                <div className={StatusHandlerCss.StatusContainer} ref={ShowTextRef}></div>
                <div className={StatusHandlerCss.StatusContainer} ref={ErrorContainer}></div>
                <div className={AuthenticPageCss.AuthenticContainer}>
                    <p>{pageType == 'signin' ? 'Signin' : 'Signup'}</p>
                    <div>Email</div>
                    <input ref={emailInputRef} name="email" type="text" placeholder="Enter Email Here"></input>
                    <div>Password</div>
                    <input ref={passwordInputRef} name="password" type="text" placeholder="Enter Password Here"></input>
                    <button onClick={onClick}>{pageType == 'signin' ? 'Signin' : 'Signup'}</button>
                </div>
            </div>

        </div>
    );
}

export default SignPage;