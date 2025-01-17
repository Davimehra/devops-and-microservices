import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AxiosReqWithInteceptor from "../../../axios/axiosInterceptors";
import { addToPersonalInfo } from "../../../redux/slices/personalInfoSlice";
function ImportantInfoFetchLayout() {
    const axiosRequestWithInterceptor = AxiosReqWithInteceptor()
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await axiosRequestWithInterceptor({
                url: `/auth/user`,
                method: 'get',
                contentType: "application/json",
            }).then((res) => {
                dispatch(addToPersonalInfo(
                    {
                        name: res?.data?.payload?.firstName + " " + res?.data?.payload?.lastName,
                        restaurantId: res?.data?.payload?.restaurantId,
                        type: res?.data?.payload?.type,
                        phoneNumber: res?.data?.payload?.phoneNumber,
                        userStatus: res?.data?.payload?.userStatus,
                        email: res?.data?.payload?.email
                    }
                ))
            }).catch((err) => {
                console.log(error)
            })
        })()
    }, [])

    return (<Outlet />)

}

export default ImportantInfoFetchLayout
