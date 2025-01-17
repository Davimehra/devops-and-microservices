import { axiosConfig } from "../axios/axiosConfig";
import consoleLog from "./consoleLog";

// Donot try to update Token in auth here
const requestAccessToken = () => {
    const refreshToken = async () => {
        const logMessage = consoleLog();
        let accessToken = null;
        let roleIds = [];
        await axiosConfig({ url: '/auth/authorization/refreshtoken', withCredentials: true, method: 'get' }).then((res) => {
            logMessage("Refreshing Occured")
            accessToken = res?.data?.payload?.accessToken;
            roleIds = res?.data?.payload?.roleIds
        }).catch((err) => {
            logMessage("Error Occured While Refreshing Token")
            logMessage(err?.response?.data?.message)
        })

        return { accessToken, roleIds }


    }
    return refreshToken;
}


export default requestAccessToken;