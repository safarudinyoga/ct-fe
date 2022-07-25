import { Dispatch } from "redux"
import { ActionType } from "../action-types"
import { Action } from "../actions/index"
import Axios from "axios"

const url =  "https://api.caritempat.id";

export const callApiSearch = (params: string) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.FETCH_SEARCH_PENDING
        })

        return Axios.get(url + `/user/guest/hotel/search?q=${params}`)
            .then((res: any) => {
                let data = res.data
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

export const getListHotel = (data: getListHotelProps, slug: string) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.FETCH_LIST_HOTEL_PENDING,
            payload: data
        });
        let slugParam;
        if(slug.length > 0) {
            slugParam = slug
        }
        else {
            slugParam = ':?'
        }
        return Axios.get(url + `/user/guest/hotel/availability/${slugParam}`, {
            params: data
        })
        .then((res: any) => {
            let data = res.data
            dispatch({
                type: ActionType.FETCH_LIST_HOTEL_SUCCESS,
                payload: data,
                slug: slug
            });
        })
        .catch((err:any) => {
            dispatch({
                type: ActionType.FETCH_LIST_HOTEL_FAILED,
                errorMessage: err.response.data.message
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

export interface onChangeDateProps {
    startDate: moment.Moment | null,
    endDate: moment.Moment | null
}

export const onChangeDate = (params: onChangeDateProps) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.ONCHANGE_DATE,
            payload: params
        });
    }
}

export const onClickListSearch = (params: string, slug: string) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.ONCLICK_LIST_SEARCH,
            payload: params || '',
            slug: slug || ''
        })
    }
}

