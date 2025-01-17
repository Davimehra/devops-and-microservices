import { Tuple, configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk'


import authReducer from './slices/authSlice';
import personalInfoReducer from './slices/personalInfoSlice'

const Store = configureStore({
    reducer: {
        auth: authReducer,
        personalInfo: personalInfoReducer
    },
    devTools: import.meta.env.VITE_REACT_APP_NODE_ENV !== 'prod',
    preloadedState: {
        auth: { accessToken: '', roleIds: [] },
        personalInfo: {
            name: '', email: '', phoneNumber: '', type: '', userStatus: '', restaurantId: ''
        }
    },
    middleware: () => new Tuple(thunk)
})


export default Store;