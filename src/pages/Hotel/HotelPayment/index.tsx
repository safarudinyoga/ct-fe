import React, { FC, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import './style.scss';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import HeaderData from '../HotelReservation/HeaderData';
import PaymentMethod from './PaymentMethod';
import { priceDecimal } from 'utils/helper';
import Axios from 'axios';

export interface State {
  // name?: string,
  // code?: string,
  // default_occupancy?: number,
  // provider?: string,
  // breakfast?: boolean,
  // refundable?: boolean,
  // reschedule?: boolean,
  // price?: number,
  // ratekey?: string,
  // allotment?: number,
  // search_id?: number
  booking_id?: number,
  salutation?: string,
  name?: string,
  phone?: string,
  email?: string,
  book_for_other_guest?: boolean,
  guest_salutation?: string,
  guest_name?: string,
  guest_phone?: string,
  special_request?: string[],
  note_request?: string,
  payment_method?: string,
  bank_code?: string
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

export interface HotelPaymentProps {
  location?: LocationProps
  match?: MatchProps
}
const HotelPayment: FC<HotelPaymentProps> = params => {
  const history = useHistory()
  let state = params?.location?.state
  const [showModal, setShowModal] = useState(false);
  const [price, setPrice] = useState(0);
  const [bankCode, setBankCode] = useState('')
  const p = {
    page: 'payment',
    showModal,
    setShowModal,
    bankCode,
    setBankCode
  }

  useEffect(() => {
    if(state == undefined) {
      history.push('/hotels')
    }
  }, [])

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem('price') || '')
    setPrice(data)
  }, [])

  const handleClickNext = () => {
    if(!bankCode) {
      alert('Pilih Metode Pembayaran Terlebih Dahulu')
    }
    else {
      let dataPost = {
        ...state,
        payment_method: 'virtual_account',
        bank_code: bankCode,
      }
      console.log('dataPost: ', dataPost)
      Axios.post(`https://api.caritempat.id/user` + `/guest/hotel/reservation`, dataPost)
      .then((res: any) => {
        let data = res.data.data
        // localStorage.setItem('paymentResult', JSON.stringify(data))
        history.push({
          pathname: `/hotel-reservation/${params?.match?.params?.id}/${params?.match?.params?.bookingId}/payment-result`,
          state: data
        })
      })
      .catch((err:any) => {
          throw(err)
      });
    }
  }
  return (
    <div className="reservation-wrapper">
      <div className="row">
        <div className="col col-md-1"/>
          <div className="col col-md-6">
            <HeaderData {...p}/>
            <div className="mt-3 mb-1">
              <span className="text-title purple">Metode Pembayaran</span>
            </div>
            <PaymentMethod 
              {...p}
              onClick={()=> setShowModal(!showModal)}
              onHide={()=> setShowModal(false)}
            />
             <div className="row mt-3 mb-3">
              <div className="col text-start">
                <span className="total-price">Total</span>
              </div>
              <div className="col text-end">
                <span className="price-room purple">Rp {priceDecimal(price.toString())}</span>
              </div>
            </div>
            <div className="">
              <button 
                className="btn btn-warning btn-block btn-next"
                onClick={handleClickNext}
              >
                LANJUTKAN KE PEMBAYARAN
              </button>
            </div>
          </div>
      </div>
    </div>
  )
}

export default HotelPayment;
