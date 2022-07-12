import { Dispatch } from "redux"
import { ActionType } from "../action-types"
import { Action } from "../actions/index"
import Axios from "axios"

const url =  "https://api.caritempat.id"

export const callApiSearch = (params: string) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.FETCH_SEARCH_PENDING
        })

        return Axios.get(url + `/user/guest/hotel/search?q=${params}`)
            .then((res: any) => {
                let data = res.data
                console.log('search: ', data)
                // dispatch({
                //     type: ActionType.FETCH_SEARCH_SUCCESS,
                //     payload,
                // });
            })
            .catch((err:any) => {
                throw(err)
            })
        
    }
}

