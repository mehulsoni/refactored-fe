import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App/App";
import {BrowserRouter} from "react-router-dom";
import Header from "./Components/Header";
import {CookiesProvider} from 'react-cookie';

ReactDOM.render(
    <CookiesProvider>
        <BrowserRouter>
            <Header/>
            <App/>
        </BrowserRouter>
    </CookiesProvider>,
    document.getElementById("root")
);
