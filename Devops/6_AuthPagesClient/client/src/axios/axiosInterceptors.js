import { useEffect } from 'react';
import { axiosConfig } from './axiosConfig';
import { addToAuth } from '../redux/slices/authSlice'
import accessTokenRequest from '../hooks/refreshTokenApi';
import { useDispatch, useSelector } from 'react-redux';
import consoleLog from '../hooks/consoleLog';

export default function AxiosReqWithInteceptor() {
    const axiosPrivate = axiosConfig;
    const auth = useSelector((state) => state?.auth);
    const dispatch = useDispatch();
    const refresh = accessTokenRequest();
    const logMessage = consoleLog();

    useEffect(() => {
        const request = axiosPrivate.interceptors.request.use((config) => {
            if (!config.headers.Authorization) config.headers.Authorization = `Bearer ${auth.accessToken}`
            return config;
        }, (err) => {
            return Promise.reject(err)
        })

        const response = axiosPrivate.interceptors.response.use((config) => {
            return config;
        }, async (error) => {

            const prevReq = error?.config;

            if (!prevReq?.send && error?.response?.status === 403) {
                logMessage("Token Expired ,Requesting Again with new AccessToken")
                prevReq.send = true;

                const { accessToken, roleIds } = await refresh();
                if (accessToken) {
                    prevReq.headers.Authorization = `Bearer ${accessToken}`
                    dispatch(addToAuth({ accessToken, roleIds }))
                    return axiosPrivate(prevReq);
                }



            }

            logMessage("Token Expired Permanently")

            return Promise.reject(error)
        })


        return () => {
            axiosPrivate.interceptors.response.eject(response);
            axiosPrivate.interceptors.request.eject(request);
        }
    }, [auth, accessTokenRequest])

    return axiosPrivate;
}


