import React, { FC, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import './style.scss';
import DataReservation from './DataReservation';
import DataGuest from './DataGuest';
import DataKhusus from './DataKhusus';
import Regulation from './Regulation';
import HeaderData from './HeaderData';
import { Form } from 'react-bootstrap';
import { priceDecimal } from 'utils/helper';
import { useHistory, useLocation } from 'react-router-dom';
import BgGlassmorphism from 'components/BgGlassmorphism/BgGlassmorphism';

interface RoomPostProps {
  room_id?: number,
  room_name?: string,
  room_code?: string,
  qty?: number
}

interface RoomProps {
  name?: string,
  code?: string,
  default_occupancy?: number,
  provider?: string,
  breakfast?: boolean,
  refundable?: boolean,
  reschedule?: boolean,
  price?: number,
  ratekey?: string,
  allotment?: number,
  search_id?: number,
  count?: number,
}
export interface State {
  room?: RoomProps,
  roomPost?: RoomPostProps
}

export interface LocationProps {
  state?: State
}

export interface ParamsProps {
  id?: number
  bookingId?: string
}

export interface MatchProps {
  params?: ParamsProps
}

export interface HotelReservationProps {
  location?: LocationProps
  match?: MatchProps
}
const HotelReservation: FC<HotelReservationProps> = p => {

  let state = p?.location?.state
  const history = useHistory()

  useEffect(() => {
    console.log('PARAM: ', p)
  }, [])

  const [salutation, setSalutation] = useState('Mr')
  const [salutationGuest, setSalutationGuest] = useState('Mr')
  const [isRadio, setIsRadio] = useState({
    mr: true,
    mrs:false
  });
  const [isRadioGuest, setIsRadioGuest] = useState({
    mr: true,
    mrs:false
  });
  const [data, setData] = useState({
    name: '',
    hp: '',
    email: ''
  })
  const [dataGuest, setDataGuest] = useState({
    name: '',
    hp: '',
    email: ''
  })
  const [specialRequest, setSpecialRequest] = useState([])
  const [dataSpecial, setDataSpecial] = useState({
    bebasAsap: false,
    pintuPenghubung: false,
    lantaiAtas: false,
    lainnya: false
  })
  const [isGuest, setIsGuest] = useState(false)
  const [salutationErr, setSalutationErr] = useState({});
  const [dataBooking, setDataBooking] = useState<any[]>([])

  useEffect(() => {
    console.log('DATA: ', state)
  }, [])

  useEffect(() => {
    if(p?.location?.state == undefined) {
      history.push('/hotels')
    }
    else {
      localStorage.setItem("dataBooking", JSON.stringify(p?.location?.state?.room))
    }
  })

  useEffect(() => {
    console.log('specialRequest: ', specialRequest)
    console.log('dataSpecial: ', dataSpecial)
    // console.log('p: ', p?.location?.state?.price)
    // localStorage.setItem('price', JSON.stringify(p?.location?.state?.price))
  }, [dataSpecial])

  useEffect(() => {
    if(isGuest) {
      setDataGuest(data)
      setIsRadioGuest(isRadio)
    }
    else {
      setDataGuest({
        name: '',
        hp: '',
        email: ''
      })
      setIsRadioGuest({
        mr: true,
        mrs:false
      })
    }
  }, [isGuest])


  const dataPemesan = {
    title: "Data Pemesan",
    state: "pemesan",
    salutation,
    setSalutation,
    isRadio,
    setIsRadio,
    data,
    setData,
    salutationErr
  }

  const guestData = {
    title: "Detail Tamu",
    state: "guest",
    salutationGuest,
    setSalutationGuest,
    isRadioGuest,
    setIsRadioGuest,
    dataGuest,
    setDataGuest,
    isGuest,
    setIsGuest
  }

  const specialData = {
    specialRequest,
    setSpecialRequest,
    dataSpecial,
    setDataSpecial
  }

  const handleClickNext = () => {
    let bookOther = true;
    if(isGuest) {
      bookOther = false
    }
    let postData = {
      booking_id : p?.match?.params?.bookingId,
      salutation : salutation,
      name : data.name,
      phone : data.hp,
      email : data.email,
      book_for_other_guest : bookOther,
      guest_salutation : salutationGuest,
      guest_name : dataGuest.name,
      guest_phone : dataGuest.hp,
      special_request: specialRequest,
      guest_rooms: state?.roomPost,
      note_request: "",
      payment_method: "",
      bank_code: ""
    }

  console.log('postData: ', postData)

    history.push({
      pathname: `/hotel-reservation/${p?.match?.params?.id}/${p?.match?.params?.bookingId}/payment`,
      state: postData
    })
  }

  useEffect(() => {
    console.log('Error: ', salutationErr)
  }, [salutationErr])

  return (
    <div className="reservation-wrapper">
      <BgGlassmorphism/>
      <div className="row d-flex justify-content-center">
          <div className="col col-md-6 col-sm-12 col-xs-12">
            <HeaderData 
              {...state?.room}
              page="reservation"
            />
            <DataReservation
              {...dataPemesan}
            />
            <DataGuest
              {...guestData}
            />
            <DataKhusus
              {...specialData}
            />
            <div className="row mt-3 mb-3">
              <div className="col text-start">
                <span className="total-price">Total</span>
              </div>
              <div className="col text-end">
                <span className="price">Rp -</span>
                {/* <span className="price">Rp {priceDecimal(state?.price?.toString())}</span> */}
              </div>
            </div>
            <div className="">
              <button 
                className="btn btn-warning btn-block btn-next"
                onClick={handleClickNext}
              >
                <span className="font-weight-bold">
                  <strong>
                    LANJUTKAN KE PEMBAYARAN
                  </strong>
                </span>
              </button>
            </div>
          </div>
          <div className="col col-md-4 col-sm-12 col-xs-12">
            <Regulation/>
          </div>
      </div>
    </div>
  )
}

export default HotelReservation;
