import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import store, {persistor} from "./store";
import {Provider} from "react-redux";
import {PersistGate} from 'redux-persist/lib/integration/react';
import "./i18/i18";




ReactDOM.render(
    <Provider store = {store}>
        <BrowserRouter>
            <PersistGate loading={null} persistor={persistor}>
              <React.StrictMode>
                <App />
              </React.StrictMode>
            </PersistGate>
        </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
