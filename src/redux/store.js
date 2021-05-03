// Module Imports
import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';

// File Imports
import rootReducer from "./reducers/rootReducer";

// React Store creation
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  
);

export default store;
