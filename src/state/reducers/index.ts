import { combineReducers } from "redux";
import hotelReducer from "./hotelReducer"
import loginReducer from "./loginReducers"
import registerReducer from './registerReducers'
import otpReducers from './otpReducers'
import trainReducers from './trainReducers'

const reducers = combineReducers({
    hotel: hotelReducer,
    authLogin: loginReducer,
    authRegister: registerReducer,
    authOTP: otpReducers,
    trainState: trainReducers
})

export default reducers

export type RootState = ReturnType<typeof reducers>