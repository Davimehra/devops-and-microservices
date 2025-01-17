import ReactDOM from "react-dom/client";
import { App } from "./App";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";
import Store from './redux/createStore'

const root = ReactDOM.createRoot(document.querySelector('#root'))

function Index() {
    return (
        <Provider store={Store}>
            <BrowserRouter >
                <Routes >
                    <Route path="/*" element={<App />}></Route>
                </Routes>
            </BrowserRouter>
        </Provider>

    )
}

root.render(<Index />)