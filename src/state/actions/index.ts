import { ActionType } from "../action-types/index"

interface CallAPISearchPending {
    type: ActionType.FETCH_SEARCH_PENDING
}



export type Action =  CallAPISearchPending;