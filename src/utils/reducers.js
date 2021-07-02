import { componentReducer } from "../components/reducers"
import { includeReducers } from "../includes"
import { utilReducer } from "./config"
export const appReducers = {
    utilReducer,
    ...includeReducers,
    ...componentReducer
}