import { combineReducers } from "redux";

import { routerReducer } from "react-router-redux";
//import the reducers to here
//search
//favorites
import search from "./search.js";
import favorite from "./favorite.js";

const rootReducer = combineReducers({}); //thing, thing, routing:routerReducer})

export default rootReducer;
