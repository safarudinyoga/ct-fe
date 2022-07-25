import { ActionType } from "../action-types/index";

export interface areaContentTypes {
    name?: string
    type?: string
    slug?: string
    additionalInfo?: string
    accomodation?: number
}
export interface hotelContentTypes {
    id?: number
    name?: string
    slug?: string
    description?: string
    price?: number
    stars?: number
    additionalInfo?: string
    images?: string
    facilities?: []
}
export interface dataTypes {
    areaContent: areaContentTypes[],
    hotelContent: hotelContentTypes[]
}
export interface dataHotelTypes {
    succes: boolean,
    data: dataTypes
}

interface CallAPISearchPending {
    type: ActionType.FETCH_SEARCH_PENDING
};
interface CallAPISearchSuccess {
    type: ActionType.FETCH_SEARCH_SUCCESS,
    payload: dataHotelTypes
};
interface CallAPISearchFailed {
    type: ActionType.FETCH_SEARCH_FAILED
};

interface GetListHotelPending {
    type: ActionType.FETCH_LIST_HOTEL_PENDING
};
export interface GetListHotelSuccessPayload {
    success: boolean,
    search: [
        {
            id: number,
            name: string,
            code: string,
            size: string,
            description: string,
            thumbnail: string,
            rooms: [
                {
                    name: string,
                    code: string,
                    provider: string,
                    breakfast: boolean,
                    refundable: boolean,
                    reschedule: boolean,
                    price: number,
                    ratekey: string,
                    search_id: number
                }
            ]
        },
    ],
    // data: [
    data: {
        id: number,
        name: string,
        description: string,
        slug: string,
        stars: number,
        address: string,
        images: string,
        facilities: [
            id: number,
            name: string,
            active: boolean,
            created_at: "string",
            updated_at: "string",
            facilities: [
                id: number,
                group_id: number,
                name: string,
                active: boolean,
                created_at: string,
                updated_at: string
            ]
        ],
    }
    // ]
}
interface GetListHotelSuccess {
    type: ActionType.FETCH_LIST_HOTEL_SUCCESS,
    payload: GetListHotelSuccessPayload,
    slug: string
};
interface GetListHotelFailed {
    type: ActionType.FETCH_LIST_HOTEL_FAILED,
    errorMessage: string
};

interface OnChangeInputValue {
    type: ActionType.ONCHANGE_INPUT,
    payload: string
};

interface onChangeAdult {
    type: ActionType.ONCHANGE_ADULT,
    payload: number
}
interface onChangeChildren {
    type: ActionType.ONCHANGE_CHILDREN,
    payload: number
}
interface onChangeRoom {
    type: ActionType.ONCHANGE_ROOM,
    payload: number
}
interface onChangeDate {
    type: ActionType.ONCHANGE_DATE,
    payload: {
        startDate: moment.Moment | null,
        endDate: moment.Moment | null
    }
}

interface OnClickListSearch {
    type: ActionType.ONCLICK_LIST_SEARCH,
    payload: string,
    slug: string
}

export type Action =  
    CallAPISearchPending 
    | CallAPISearchSuccess
    | CallAPISearchFailed
    | GetListHotelPending
    | GetListHotelSuccess
    | GetListHotelFailed
    | OnChangeInputValue 
    | onChangeAdult
    | onChangeChildren
    | onChangeRoom
    | onChangeDate
    | OnClickListSearch