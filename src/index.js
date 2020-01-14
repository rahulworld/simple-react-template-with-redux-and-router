import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import reducers from './reducers';


const middlewares = [thunk];
const middlewareEnhancer = applyMiddleware(...middlewares);

const storeEnhancers = [middlewareEnhancer];
const preloadedState = [];

const composedEnhancer = process.env.REACT_APP_ENV === 'production' || process.env.REACT_APP_ENV === 'staging' ? compose(...storeEnhancers) : composeWithDevTools(...storeEnhancers);

const store = createStore(
  reducers,
  preloadedState,
  composedEnhancer,
);


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
