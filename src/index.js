import React from "react";
import ReactDOM from "react-dom"; //removed {render}
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Reducers from './reducers';
import registerServiceWorker from "./registerServiceWorker";
import thunk from 'redux-thunk';

const store = createStore(Reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Router>
    <Provider store={store}>
        <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
