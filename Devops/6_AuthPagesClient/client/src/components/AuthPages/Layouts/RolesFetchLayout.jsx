import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import AxiosReqWithInteceptor from "../../../axios/axiosInterceptors";
function RolesFetchLayout() {
const axiosRequest = AxiosReqWithInteceptor()
    useEffect(()=>{
        (async()=>{
            await axiosRequest({
                url: '/auth/user',
                method: 'get',
                contentType: 'application/json'
            }).then((res) => {
                logMessage(res?.data);
                mydata.current.innerText = `My Name is ${res?.data?.payload?.firstName} ${res?.data?.payload?.lastName} \n PhoneNo = ${res?.data?.payload?.phoneNumber} \n Email = ${res?.data?.payload?.email}`
    
            }).catch((err) => {
                logMessage(`Error Occured in HomePage Api Request - `, err?.response?.data?.message)
            })
        })()
    })
    
    return (<Outlet />)

}

export default RolesFetchLayout
