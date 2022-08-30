import React, { FC, useEffect, useState } from 'react';
import './style.scss';
import { priceDecimal } from 'utils/helper';

export interface HeaderDataProps {
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
    page?: string
}
const HeaderData: FC<HeaderDataProps> = p => {
  const [date, setDate] = useState({
    startDate: '',
    endDate: ''
  });
  const [title, setTitle] = useState('');
  const [dataHeader, setDataHeader] = useState<any[]>([])
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
    let data = JSON.parse(localStorage.getItem('dataBooking')||'')
    if(data !== undefined) {
        setTimeout(() => {
            setDataHeader(JSON.parse(localStorage.getItem('dataBooking')||''))
        }, 1000)
    }
  }, [])

  useEffect(() => {
    console.log('dataHeader: ', dataHeader)
  }, [dataHeader])

  useEffect(() => {
    if(localStorage.getItem('hotelSearchValue')) {
        let title = JSON.parse(localStorage.getItem('hotelSearchValue') || '')
        setTitle(title)
    }
  }, [])
  return (
    <div className="card card-top-left">
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
        { p.page == 'payment' ?
            null :
            (
                dataHeader && dataHeader.map((a, index) => (
                <div key={index}>
                    <hr/>
                        <p className="mt-3 text-medium purple">(x{a.default_occupancy}) {a.name}</p>
                        {/* <p className="mt-3 text-medium purple">Rp {priceDecimal(a.price.toString() * a.count.toString())}</p> */}
                    <hr className="mt-3"/>
                    <div className="mt-3">
                        <i className={`text-2xl text-neutral-6000 las la-utensils mr-1`}></i>
                        <span className="text-success">{a.breakfast? '' : 'Tidak'} Termasuk Sarapan</span>
                      </div>
                    <div>
                        <i className={`text-2xl text-neutral-6000 las la-utensils mr-1`}></i>
                        <span className="text-success">{a.refundable? '' : 'Tidak '}Bisa Refund</span>
                    </div>
                    <div>
                        <i className={`text-2xl text-neutral-6000 las la-utensils mr-1`}></i>
                        <span className="text-success">{a.reschedule? '' : 'Tidak '}Bisa Di-reschedule</span>
                    </div>
                </div>
                ))
            )
        }
    </div>
  )
}

export default HeaderData;