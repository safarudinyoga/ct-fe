export interface HotelDetailProps {
    match?: {
      isExact?: boolean,
      params?: {
        id: number
      }
    }
  }
  
  export interface HotelFacilities {
    id?: number,
    group_id?: number,
    name?: string,
    active?: boolean,
    created_at?: string,
    updated_at?: string
  }
  
  export interface DataFacilities {
    id?: number,
    name?: string,
    active?: boolean,
    created_at?: string,
    updated_at?: string,
    facilities?: HotelFacilities[]
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
  
  export interface DataProps {
    name?: string,
    address?: string,
    stars?: number,
    description?: string,
    facilities?: Facilities[],
    room_groups?: DataRoom[]
  }