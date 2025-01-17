import { createSlice } from "@reduxjs/toolkit"
import consoleLog from "../../hooks/consoleLog"
const logMessage = consoleLog();
const authInitial = {
    accessToken: '',
    roleIds: []
}

const authSlice = createSlice({
    initialState: authInitial,
    name: 'auth',
    reducers: {
        addToAuth: (state, action) => {
            logMessage("Auth add Triggered ", JSON.stringify(state))
            return { ...state, ...action?.payload }
        },
        emptyAuth: (state, action) => {
            logMessage("Auth empty Triggered ", JSON.stringify(state))
            return { accessToken: '', roleIds: [] }
        }
    }
})



export const { addToAuth, emptyAuth } = authSlice.actions;
export default authSlice.reducer; 