/*
 * @Author: your name
 * @Date: 2020-10-05 16:09:56
 * @LastEditTime: 2020-10-14 22:29:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project\src\index.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducer from './store'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

const middleWare = [thunk]
const store = createStore(reducer, applyMiddleware(...middleWare))
 
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
