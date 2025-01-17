import { createSlice } from "@reduxjs/toolkit"
import consoleLog from "../../hooks/consoleLog"
const logMessage = consoleLog();
const personalInfoInitial = {
    name: '',
    email: '',
    phoneNumber: '',
    type: '',
    userStatus: '',
    restaurantId: ''
}

const personalInfoSlice = createSlice({
    initialState: personalInfoInitial,
    name: 'personalInfo',
    reducers: {
        addToPersonalInfo: (state, action) => {
            logMessage("PersonalInfo add Triggered ", JSON.stringify(state))
            return { ...state, ...action?.payload }
        },
        emptyPersonalInfo: (state, action) => {
            logMessage("PersonalInfo empty Triggered ", JSON.stringify(state))
            return {
                name: '',
                email: '',
                phoneNumber: '',
                type: '',
                userStatus: '',
                restaurantId: ''
            }
        }
    }
})



export const { addToPersonalInfo, emptyPersonalInfo } = personalInfoSlice.actions;
export default personalInfoSlice.reducer; 