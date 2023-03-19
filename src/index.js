import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/configStore';
import 'antd/dist/antd';
import * as signalR from '@aspnet/signalr';
import 'react-toastify/dist/ReactToastify.css';
const root = ReactDOM.createRoot(document.getElementById('root'));


export const connection = new signalR.HubConnectionBuilder().withUrl(`https://movienew.cybersoft.edu.vn/DatVeHub`).configureLogging(signalR.LogLevel.Information).build();


connection.start().then(function() {
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}).catch(error => {
  console.log(error);
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
