import { ActionType } from "../action-types/index"
import { Action } from "../actions"

const initialState = 0;

const reducer = (state: number = initialState, action: Action): number => {
    switch (action.type){
        case ActionType.FETCH_SEARCH_PENDING:
            return state
        default:
            return state
    }
}

export default reducer