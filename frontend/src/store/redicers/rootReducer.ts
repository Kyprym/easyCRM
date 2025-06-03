import { combineReducers } from "redux";
import { issueReducer } from "./reduser";

export const rootReducer = combineReducers({
    issue:issueReducer
})