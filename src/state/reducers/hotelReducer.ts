import { ActionType } from "../action-types/index";
import { Action } from "../actions";
import moment from "moment";
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
    id?: number,
    name?: string,
    slug?: string,
    description?: string,
    price?: number,
    stars?: number,
    additionalInfo?: string,
    images?: string,
    facilities?: []
    // id?: number,
    // name?: string,
    // description?: string,
    // slug?: string,
    // stars?: number,
    // address?: string,
    // images?: string,
    // facilities?: [
        // id: number,
        // group_id: number,
        // name: string,
        // active: boolean,
        // created_at: "string",
        // updated_at: "string"
    // ],
}

export interface HotelFacilities {
    id?: number,
    group_id?: number,
    name?: string,
    active?: boolean,
    created_at?: string,
    updated_at?: string,
}

export interface Facilities {
    id?: number,
    name?: string,
    active?: boolean,
    created_at?: string,
    updated_at?: string,
    facilities?: HotelFacilities[]
}

export interface Rooms {
    name?: string,
    code?: string,
    provider?: string,
    breakfast?: boolean,
    refundable?: boolean,
    reschedule?: boolean,
    price?: number,
    ratekey?: string,
    search_id?: number
}

export interface DataRoom {
    id?: number,
    name?: string,
    code?: string,
    size?: number,
    description?: string,
    thumbnail?: string,
    rooms?: Rooms[]
}
export interface DataListDetailHotelProps {
    id?: number,
    name?: string,
    description?: string,
    slug?: string,
    stars?: number,
    address?: string
    images?: string,
    facilities?: Facilities[],
    room_groups?: DataRoom[]
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
    dateMoment: {
        startDate: moment.Moment | null;
        endDate: moment.Moment | null;
    }
    dateString: {
        startDate: string | undefined,
        endDate: string | undefined
    },
    dateDuration: number | null,
    dataListHotel: DataListHotelSuccess[],
    dataListDetailHotel: DataListDetailHotelProps
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
    dateMoment: {
        startDate: moment(),
        endDate: moment().add(1, "days")
    },
    dateString: {
        startDate: moment().format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD")
    },
    dateDuration: null,
    dataListHotel: [],
    dataListDetailHotel: {} as any
};

const reducer = (state: HotelReducer = initialState, action: Action): HotelReducer => {
    switch (action.type){
        case ActionType.FETCH_SEARCH_PENDING:
            return {
                ...state,
                loading: true
            }
        case ActionType.FETCH_SEARCH_SUCCESS:
            let data = action.payload.data
            let newData = [...data.areaContent, ...data.hotelContent]
            let dataListHotel = data.hotelContent
            return {
                ...state,
                loading: false,
                dataHotel: newData,
                dataListHotel: dataListHotel
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
            let dataObj = action.payload.data
            let modifData = {
                id: dataObj.id,
                name: dataObj.name,
                description: dataObj.description,
                slug: dataObj.slug,
                stars: dataObj.stars,
                address: dataObj.address,
                images: dataObj.images,
                facilities: dataObj.facilities,
                room_groups: dataObj.room_groups
            }
            return {
                ...state,
                loading: false,
                dataListDetailHotel: modifData
            }
        case ActionType.FETCH_LIST_HOTEL_FAILED:
            alert(action.errorMessage)
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: action.errorMessage
            }
        case ActionType.ONCHANGE_INPUT:
            return {
                ...state,
                inputValue: action.payload
            }
        case ActionType.ONCHANGE_ADULT:
            localStorage.setItem('adult', JSON.stringify(action.payload))
            return {
                ...state,
                adult: action.payload
            }
        case ActionType.ONCHANGE_CHILDREN:
            localStorage.setItem('children', JSON.stringify(action.payload))
            return {
                ...state,
                children: action.payload
            }
        case ActionType.ONCHANGE_ROOM:
            localStorage.setItem('room', JSON.stringify(action.payload))
            return {
                ...state,
                room: action.payload
            }
        case ActionType.ONCHANGE_DATE:
            let dateDiff = null
            let stringDate = {
                startDate: action.payload.startDate?.format("YYYY-MM-DD"),
                endDate: action.payload.endDate?.format("YYYY-MM-DD")
            }
            if(action.payload.endDate !== null) {
                let start = action.payload.startDate 
                let end = action.payload.endDate
                dateDiff = end.diff(start, 'days')
            }
            else {
                dateDiff = null
            }
            localStorage.setItem('dateString', JSON.stringify(stringDate))
            localStorage.setItem('dateMoment', JSON.stringify(action.payload))
            localStorage.setItem('dateDuration', JSON.stringify(dateDiff))
            return {
                ...state,
                dateMoment: action.payload,
                dateString: stringDate,
                dateDuration: dateDiff
            }
        case ActionType.ONCLICK_LIST_SEARCH:
            return {
                ...state,
                inputValue: action.payload,
                slug: action.slug
            }
        default:
            return state
    }
}

export default reducer;