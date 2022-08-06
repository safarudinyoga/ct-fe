import React, { FC } from 'react';
import './style.scss';
import img from "images/hero-right-3.png";

export interface DataListHotel {
    id?: number,
    name?: string,
    slug?: string,
    description?: string,
    price?: number,
    stars?: number,
    additionalInfo?: string,
    images?: string,
    facilities?: []
}
export interface CardListProps {
    onClickButton: React.MouseEventHandler,
    dataListHotel: DataListHotel[]
}

const CardList: FC<CardListProps> = (p) => {
    console.log('p: ', p)
  return (
    <>
    { p.dataListHotel && p.dataListHotel.map((a, index) => (
        <div className="row list-hotel">
            <div className="col-md-6 p-2">
                <a 
                    onClick={p.onClickButton} 
                    // href=""
                >
                    <div className="card hotel-content">
                        <div className="row">
                        <div className="col-md-4 col-sm-4">
                            <img src={img} alt="" className="img-hotel"/>
                        </div>
                        <div className="col-md-8 col-sm-8 card-data">
                            <div className="mb-1">
                            <span className="title">{a.name}</span>
                            </div>
                            <div className="mb-1">
                            <i className={`text-1xl las la-map-marker text-danger`}></i>
                            <span className="address">{a.additionalInfo}</span>
                            </div>
                            <div className="mb-2">
                                <i className={`text-2xl las la-star text-warning`}></i>
                            </div>
                            <div>
                            <span className="price">Rp {a.price}</span>
                            </div>
                            <div>
                            <span className="per-price">Perkamar Permalaman</span>
                            </div>
                        </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    ))}
    </>
  )
}

export default CardList
