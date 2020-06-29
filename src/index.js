
import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import './assets/main.css'
import Modal from "react-modal";
import App from './App';
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
//import Paper from "./Paper"
import authReducer from "./store/reducers/auth";
import memberReducer from "./store/reducers/membership";
// import membershipReducer from "./store/reducers/auth"
import * as actions from "./store/actions/auth";


const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  membership: memberReducer
});

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));
Modal.setAppElement("#root");


const app = (
  <Provider store={store}>
   <App />
  </Provider>
);
ReactDOM.render(app, document.getElementById('root')
);
