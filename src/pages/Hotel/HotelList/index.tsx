import React, { FC, useEffect, useState } from "react";
import BgGlassmorphism from "page-components/BgGlassmorphism/BgGlassmorphism";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'state/reducers';
import { HotelListProps } from "./HotelListProps";
import img from "images/hero-right-3.png";
import { useHistory } from "react-router-dom";
import './style.scss';

const HotelList: FC<HotelListProps> = p => {

  const history = useHistory()
  const state = useSelector((state: RootState) => state.hotel)
  const [data, setData] = useState([] as any[])
  const [perPage, setPerPage] = useState(10)

  useEffect(() => {
    console.log('dataList: ', state)
    let dataList = state.dataListHotel
    if(dataList.length > 0) {
      localStorage.setItem('dataListHotel', JSON.stringify(dataList))
    }
  }, [])

  useEffect(() => {
    if(localStorage.dataListHotel) {
      setData(JSON.parse(localStorage.dataListHotel))
    }
  }, [])

  useEffect(() => {
    console.log('data: ', data)
  }, [data])

  interface HandleClickCardProps {
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

  const handleClickCard = (a: HandleClickCardProps) => {
    localStorage.setItem('hotelSlug', JSON.stringify(a.slug))
    history.push({
        pathname: `/hotels/${a.id}`
    })
  }

  p = {
    ...p,
    currentPage: "Hotel",
  }
  
  return (
    <div
      // className={`nc-ListingStayMapPage relative ${p.className}`}
      className={`nc-ListingStayMapPage relative overflow-hidden ${p.className}`}
      data-nc-id="ListingStayMapPage"
    >
      <Helmet>
        <title>Caritempat</title>
      </Helmet>
      <BgGlassmorphism />
      <div className="container relative overflow-hidden pt-3 pb-3">
        <div
        className={`nc-SectionHeroArchivePage flex flex-col relative ${p.className}`}
        data-nc-id="SectionHeroArchivePage"
        >
          <div className="flex flex-col lg:flex-row lg:items-center ml-3 mt-2 mb-2">
            <span className="text-result">
                Your hotel search result...
            </span>
          </div>
          <div className="container p-3">
          { data && data.filter((_, i) => i >= 1 && i <= perPage).map((a, index) => (
            <div className="row list-hotel" key={index}>
              <div className="col-md-6 p-2">
                  <a 
                      onClick={()=> handleClickCard(a)} 
                      href=""
                  >
                    <div className="card hotel-content">
                      <div className="row p-0 row-content">
                        <div className="col-md-4 col-sm-4 card-hotel-img">
                          <img src={img} alt="" className="hotel-img"/>
                        </div>
                        <div className="col-md-8 col-sm-8 card-data">
                          <div className="mb-1">
                            <span className="title">{a.name}</span>
                          </div>
                          <div className="mb-1">
                            <i className={`text-1xl las la-map-marker text-danger`}></i>
                            <span className="address">{a.additionalInfo}</span>
                          </div>
                          <div className="mb-1">
                            <i className={`text-1xl las la-map-marker text-danger`}></i>
                            <span className="address">{a.address}</span>
                          </div>
                      </div>
                    </div>
                    </div>
                  </a>
              </div>
          </div>
        ))}
        </div>
        <div className="d-flex justify-content-center mb-4" onClick={()=> setPerPage(perPage+10)}>
            <button className="btn btn-success btn-loadmore">Load More</button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default HotelList;
