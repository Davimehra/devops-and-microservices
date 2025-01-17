import React, { useEffect, useRef, useState } from "react";
import Header from "../HelperComponents/Header";
import AxiosReqWithInteceptor from "../../axios/axiosInterceptors";
import { useSelector } from "react-redux";
import consoleLog from "../../hooks/consoleLog";


export default function HomePage() {
    const logMessage = consoleLog();
    const auth = useSelector((state) => state?.auth)
    const [userData, setUserData] = useState();
    const axiosRequest = AxiosReqWithInteceptor();
    const mydata = useRef()
    const axiosRequestWithInterceptor = AxiosReqWithInteceptor();

    logMessage("HomePage Rendered")

    useEffect(() => {
        (async () => {
            await axiosRequestWithInterceptor({
                url: `/auth/user`,
                method: 'get',
                contentType: "application/json",
            }).then((res) => {
                // dispatch(addToPersonalInfo(
                //     {
                //         name: res?.data?.payload?.firstName + " " + res?.data?.payload?.lastName,
                //         restaurantId: res?.data?.payload?.restaurantId,
                //         type: res?.data?.payload?.type,
                //         phoneNumber: res?.data?.payload?.phoneNumber,
                //         userStatus: res?.data?.payload?.userStatus,
                //         email: res?.data?.payload?.email
                //     }
                // ))

                console.log(res?.data?.payload)
            }).catch((err) => {
                logMessage(`Error Occured in HomePage Api Request - `, err?.response?.data?.message)
            })
        })()
        // (async () => {
        //     await axiosRequest({
        //         url: '/auth/user',
        //         method: 'get',
        //         contentType: 'application/json'
        //     }).then((res) => {
        //         logMessage(res?.data);
        //         mydata.current.innerText = `My Name is ${res?.data?.payload?.firstName} ${res?.data?.payload?.lastName} \n PhoneNo = ${res?.data?.payload?.phoneNumber} \n Email = ${res?.data?.payload?.email}`

        //     }).catch((err) => {
        //         logMessage(`Error Occured in HomePage Api Request - `, err?.response?.data?.message)
        //     })
        // })()
    }, [])


    const fetchUserHander = async () => {
        await axiosRequestWithInterceptor({
            url: '/auth/user',
            method: 'get',
            contentType: 'application/json'
        }).then((res) => {
            logMessage(res?.data);
            mydata.current.innerText = `My Name is ${res?.data?.payload?.firstName} ${res?.data?.payload?.lastName} \n PhoneNo = ${res?.data?.payload?.phoneNumber} \n Email = ${res?.data?.payload?.email}`

        }).catch((err) => {
            logMessage(`Error Occured in HomePage Api Request - `, err?.response?.data?.message)
        })
    }
    return (
        <React.Fragment>
            <Header />
            <div>HomePage</div>
            <p><b>Fetch User Information</b></p>
            <div ref={mydata}>Data</div>
            <button onClick={fetchUserHander}>Fetch</button>
        </React.Fragment>
    )
}