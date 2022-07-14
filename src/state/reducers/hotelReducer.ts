import { ActionType } from "../action-types/index";
import { Action } from "../actions";
export interface dataHotelTypes {
    id?: string | number,
    name?: string,
    slug?: string,
    additionalInfo?: string,
    accomodation?: number,
    description?: string,
    price?: number | string,
    stars?: number | string,
    images?: string,
    facilities?: []
}

export interface DataListHotelSuccess {
    id: number,
    name: string,
    description: string,
    slug: string,
    stars: number,
    address: string,
    images: string,
    facilities: [
        id: number,
        group_id: number,
        name: string,
        active: boolean,
        created_at: "string",
        updated_at: "string"
    ],
}
export interface HotelReducer {
    inputValue: string,
    loading: boolean,
    error: boolean,
    errorMessage: string
    dataHotel?: dataHotelTypes[]
    slug: string,
    adult: number,
    children: number,
    room: number,
    dataListHotel: DataListHotelSuccess[]
}

const initialState = {
    inputValue: '',
    loading: false,
    error: false,
    errorMessage: '',
    dataHotel: [],
    slug: '',
    adult: 1,
    children: 0,
    room: 1,
    dataListHotel: []
};

const reducer = (state: HotelReducer = initialState, action: Action): HotelReducer => {
    switch (action.type){
        case ActionType.FETCH_SEARCH_PENDING:
            return {
                ...state,
                loading: true
            }
        case ActionType.FETCH_SEARCH_SUCCESS:
            console.log('dataHotel: ', action.payload.data)
            let data = action.payload.data
            let newData = [...data.areaContent, ...data.hotelContent]
            console.log('newData: ', newData)
            return {
                ...state,
                loading: false,
                dataHotel: newData
            }
        case ActionType.FETCH_SEARCH_FAILED:
            return {
                ...state,
                loading: false,
                error: true
            }
        case ActionType.FETCH_LIST_HOTEL_PENDING:
            return {
                ...state,
                loading: true
            }
        case ActionType.FETCH_LIST_HOTEL_SUCCESS:
            console.log('getListHotelSuccess: ', action.payload)
            return {
                ...state,
                loading: false,
                dataListHotel: action.payload.data
            }
        case ActionType.FETCH_LIST_HOTEL_FAILED:
            return {
                ...state,
                loading: false,
                error: true
            }
        case ActionType.ONCHANGE_INPUT:
            return {
                ...state,
                inputValue: action.payload
            }
        case ActionType.ONCHANGE_ADULT:
            return {
                ...state,
                adult: action.payload
            }
        case ActionType.ONCHANGE_CHILDREN:
            return {
                ...state,
                children: action.payload
            }
        case ActionType.ONCHANGE_ROOM:
            return {
                ...state,
                room: action.payload
            }
        case ActionType.ONCLICK_LIST_SEARCH:
            return {
                ...state,
                inputValue: action.payload,
                // slug: action.payload.slug
            }
        default:
            return state
    }
}

export default reducer;