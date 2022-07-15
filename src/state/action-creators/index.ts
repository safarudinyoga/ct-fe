import { Dispatch } from "redux"
import { ActionType } from "../action-types"
import { Action } from "../actions/index"
import axios from "axios"

const url =  "https://api.caritempat.id";

export const callApiSearch = (params: string) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.FETCH_SEARCH_PENDING
        })

        return axios.get(url + `/user/guest/hotel/search?q=${params}`)
            .then((res: any) => {
                let data = res.data
                console.log('search: ', data)
                dispatch({
                    type: ActionType.FETCH_SEARCH_SUCCESS,
                    payload: data,
                });
            })
            .catch((err:any) => {
                dispatch({
                    type: ActionType.FETCH_SEARCH_FAILED,
                });
                throw(err)
            });
    }
}
export interface getListHotelProps {
    adult: number,
    children: number,
    room: number
}

export const getListHotel = (data: getListHotelProps) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.FETCH_LIST_HOTEL_PENDING,
            payload: data
        });
        let slug = "sahid-bandar-lampung"
        console.log('dataPost: ', data)
        return axios.get(url + `/user/guest/hotel/availability/${slug}`, {
            params: data
        })
        .then((res: any) => {
            let data = res.data
            console.log('getListHotel: ', data)
            alert('successCallAPI')
            dispatch({
                type: ActionType.FETCH_LIST_HOTEL_SUCCESS,
                // payload: data,
                payload: data,
            });
        })
        .catch((err:any) => {
            console.log(err)
            dispatch({
                type: ActionType.FETCH_LIST_HOTEL_FAILED,
            });
            throw(err)
        });
    }
}

export const onChangeInputValue = (params: string) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.ONCHANGE_INPUT,
            payload: params
        });
    }
}

export const onChangeAdult = (params: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.ONCHANGE_ADULT,
            payload: params
        });
    }
}

export const onChangeChildren = (params: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.ONCHANGE_CHILDREN,
            payload: params
        });
    }
}

export const onChangeRoom = (params: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.ONCHANGE_ROOM,
            payload: params
        });
    }
}

export const onClickListSearch = (params: string) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.ONCLICK_LIST_SEARCH,
            payload: params || ''
        })
    }
}

