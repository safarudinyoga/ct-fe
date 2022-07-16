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
    description?: string,
    slug?: string,
    stars?: number,
    address?: string,
    images?: string,
    facilities?: [
        id: number,
        group_id: number,
        name: string,
        active: boolean,
        created_at: "string",
        updated_at: "string"
    ],
}

export interface DataListDetailHotelProps {
    id: number | string,
    name: string,
    description: string,
    slug: string,
    stars: number | string,
    address: string
    images: string,
    facilities: [
        id: number | string,
        name: string,
        active: boolean,
        created_at: string,
        updated_at: string,
        facilities: [
            id: number | string,
            group_id: number | string,
            name: string,
            active: boolean,
            created_at: string,
            updated_at: string,
        ]
    ],
    // vendors?: [
    //     created_at: string,
    //     // default: boolean,
    //     id: number,
    //     updated_at: string,
    //     vendor_code: string,
    //     vendor_name: string
    // ],
    // room_groups?: [
    //     code: string,
    //     description: string,
    //     id: number,
    //     name: string,
    //     size: string,
    //     thumbnail: string,
    //     rooms: [
    //         breakfast: boolean,
    //         code: string,
    //         name: string,
    //         price: number,
    //         provider: string,
    //         ratekey: string,
    //         refundable: boolean,
    //         reschedule: boolean,
    //         search_id: number
    //     ]
    // ]
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
            let dataObj = action.payload.data
            let modifData = {
                id: dataObj.id,
                name: dataObj.name,
                description: dataObj.description,
                slug: dataObj.slug,
                stars: dataObj.stars,
                address: dataObj.address,
                images: dataObj.images,
                facilities: dataObj.facilities
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