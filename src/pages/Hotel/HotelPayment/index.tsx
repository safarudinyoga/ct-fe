import React, { FC, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import './style.scss';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import HeaderData from '../HotelReservation/HeaderData';
import PaymentMethod from './PaymentMethod';
import { priceDecimal } from 'utils/helper';

export interface State {
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
  search_id?: number
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
  useEffect(() => {
    console.log('params: ', params)
  }, [])
  let state = params?.location?.state
  const [showModal, setShowModal] = useState(false);
  const [price, setPrice] = useState(0);
  const p = {
    page: 'payment',
    showModal,
    setShowModal
  }

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem('price') || '')
    setPrice(data)
  }, [])
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
                onClick={()=> {
                  alert('click')
                }}
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
