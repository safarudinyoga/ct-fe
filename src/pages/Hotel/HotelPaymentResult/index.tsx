import React, { useEffect, useState, FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import BgGlassmorphism from 'components/BgGlassmorphism/BgGlassmorphism';
import { priceDecimal } from 'utils/helper';
import Regulation from '../HotelReservation/Regulation';
import './style.scss';

interface StateProps {
  expired_at?: string
  method_payment?: string
  name?: string
  total?: number
  virtual_account_number?: string
}

interface LocationProps {
  state?: StateProps
}

interface MatchParamsProps {
  id?: number
}

interface MatchProps {
  params?: MatchParamsProps
}

interface ParamsProps {
  location?: LocationProps
  match?: MatchProps
}

const HotelPaymentResult: FC<ParamsProps> = p => {
  const params = useParams()
  const history = useHistory()
  useEffect(() => {
    console.log('p.locationState: ', p?.location?.state)
    console.log('p: ', p)
  }, [p])
  const data = p?.location?.state

  useEffect(() => {
    if(data == undefined) {
      history.push('/hotels')
    }
  }, [])
  const [date, setDate] = useState({
    startDate: '',
    endDate: ''
  });
  const [title, setTitle] = useState('');
  useEffect(() => {
    if(localStorage.getItem('dateString')) {
        let date = JSON.parse(localStorage.getItem('dateString') || '')
        setDate({
            startDate: date.startDate,
            endDate: date.endDate
        })    
    }
  }, [])

  useEffect(() => {
    if(localStorage.getItem('hotelSearchValue')) {
        let title = JSON.parse(localStorage.getItem('hotelSearchValue') || '')
        setTitle(title)
    }
  }, [])

  const handleClickConfirm = () => {
    history.push(`/hotels/${p?.match?.params?.id}`)
  }
  return (
    <div className="reservation-wrapper">
      <BgGlassmorphism/>
      <div className="row">
        <div className="col col-md-1"/>
          <div className="col col-md-6">
            <div className="card card-top">
              <div className="card-content">
                <div>
                    <i className={`text-3xl text-neutral-6000 las la-building mr-1 purple`}></i>
                    <span className="text-title purple">{title}</span>
                </div>
                <div className="row mt-2 mb-3">
                    <div className="col col-md-3">
                        <div>
                            <span className="text-small">Check-In</span>
                        </div>
                        <div>
                            <span className="text-small">Check-Out</span>
                        </div>
                    </div>
                    <div className="col">
                        <div>
                            <span className="text-small">{date.startDate}</span>
                        </div>
                        <div>
                            <span className="text-small">{date.endDate}</span>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="text-center mt-3 mb-3">
                  <span>Transfer sesuai nominal di bawah ini :</span>
                  <p>Rp. {priceDecimal(data?.total?.toString())}</p>
                </div>
                <hr/>
                <div className="mt-3 mb-3">
                      <span className="mt-3 text-medium purple">(x1) STUDIO</span>
                      <hr className="mt-3"/>
                      <div className="mt-3">
                          <i className={`text-2xl text-neutral-6000 las la-utensils mr-1`}></i>
                          {/* <span className="text-success">{p.refundable? '' : 'Tidak '}Bisa Refund</span> */}
                          <span className="text-success">{'Tidak '}Bisa Refund</span>
                      </div>
                      <div>
                          <i className={`text-2xl text-neutral-6000 las la-utensils mr-1`}></i>
                          {/* <span className="text-success">{p.reschedule? '' : 'Tidak '}Bisa Di-reschedule</span> */}
                          <span className="text-success">{'Tidak '}Bisa Di-reschedule</span>
                      </div>
                </div>
              </div>
              <div className="card-footer">
                <div className="row footer-position">
                  <div className="col col-md-1 col-sm-1 col-xs-1">
                    <i className={`text-3xl text-neutral-6000 las la-info-circle mr-1 white`}></i>
                  </div>
                  <div className="col col-md-8 col-sm-8 col-xs-8">
                    <span>PENTING!, Pastikan transfer sesuai hingga digit terakhir.</span>
                  </div>
                  <div className="col col-md-1 col-sm-1 col-xs-1 bg-info"/>
                </div>
              </div>
            </div>
            <div className="card card-mid">
              <div className="row detail-payment">
                <div className="col">
                  <span className="purple"><strong>Kode Bank</strong></span>
                  <div>
                    <span>536</span>
                  </div>
                  <br/>
                  <span className="purple"><strong>Nama Rekening</strong></span>
                  <div>
                    <span>{data?.method_payment}</span>
                  </div>
                </div>
                <div className="col">
                  <span className="purple"><strong>Nomor Rekening</strong></span>
                    <div>
                      <span>{data?.virtual_account_number}</span>
                    </div>
                </div>
              </div>
            </div>
            <div className="card card-bottom">
              <div className="col countdown-detail">
                <span><strong>Selesaikan Pembayaran Sebelum</strong></span>
                <div className="text-center purple">
                  <span>Sabtu, 13 Agustus 2022 - 23.59</span>
                </div>
                <div className="text-center">
                  <span><strong>04 : 59 : 59</strong></span>
                </div>
              </div>
              <div className="countdown-footer">
                <div className="row">
                  <div className="col text-center">
                    <span>08123456789</span>
                  </div>
                  <div className="col text-center">
                    <span>caritempat@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="btn btn-warning payment-confirm" onClick={handleClickConfirm}>
              <span>KONFIRMASI PEMBAYARAN</span>
            </div>
          </div>
          <div className="col col-md-4 col-sm-12 col-xs-12">
            <Regulation/>
          </div>
      </div>
    </div>
  )
}

export default HotelPaymentResult