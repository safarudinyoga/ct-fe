import { combineReducers } from "redux";
import hotelReducer from "./hotelReducer"


const reducers = combineReducers({
    hotel: hotelReducer
})

export default reducers

export type RootState = ReturnType<typeof reducers>