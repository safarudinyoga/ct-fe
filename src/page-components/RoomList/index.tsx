import React, { FC, useEffect, useState } from "react";
import GallerySlider from "components/GallerySlider/GallerySlider";
import { DEMO_STAY_LISTINGS } from "data/listings";
import BtnLikeIcon from "components/BtnLikeIcon/BtnLikeIcon";
import SaleOffBadge from "components/SaleOffBadge/SaleOffBadge";
import Badge from "shared/Badge/Badge";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { priceDecimal } from "utils/helper";
import Axios from "axios";
import './style.scss';
import axios from "axios";

const DEMO_DATA = DEMO_STAY_LISTINGS[0];

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

export interface DataRooms {
    id?: number,
    name?: string,
    code?: string,
    size?: number,
    description?: string,
    thumbnail?: string,
    ratekey?: string,
    rooms?: Rooms[]
}

export interface RoomListProps {
  id?: number,
  room_groups?: DataRooms[],
  onClick?: React.MouseEventHandler
}

const RoomList: FC<RoomListProps> = p => {
  useEffect(() => {
    // console.log('paramsRoom: ', p.room_groups)
    localStorage.setItem('accomodationId', JSON.stringify(p.id))
  }, [])
  const history = useHistory() 
  const [room, setRoom] = useState<DataRooms>({});
  const [showModal, setShowModal] = useState(false)

  const handleClickSee = (data: DataRoom) => {
    // localStorage.setItem('roomId', JSON.stringify(data.id))
    console.log('handleclicksee: ', data)
    setRoom(data)
    setShowModal(true)
  }

  const renderSliderGallery = () => {
    let galleryImgs= [
      "https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/1179156/pexels-photo-1179156.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/2373201/pexels-photo-2373201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    ]
    return (
      <div className="relative flex-shrink-0 w-full sm:w-72 ">
        <GallerySlider
          ratioClass="aspect-w-6 aspect-h-5"
          galleryImgs={galleryImgs}
          uniqueID={`StayCardH_${p}`}
        />
        <BtnLikeIcon isLiked={true} className="absolute right-3 top-3" />
        <SaleOffBadge className="absolute left-3 top-3" />
      </div>
    );
  };

  interface RoomParamsClick {
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

  const handleClickRoom = (params: RoomParamsClick) => {
    alert('mashok')
    // let dateString = JSON.parse(localStorage.getItem('dateString') || '')
    // let data = {
    //     accommodation_id : JSON.parse(localStorage.getItem('accomodationId') || ''),
    //     room_id : JSON.parse(localStorage.getItem('roomId') || ''),
    //     start_date : dateString.startDate,
    //     duration : JSON.parse(localStorage.getItem('dateDuration') || '1'),
    //     total_room : JSON.parse(localStorage.getItem('room') || '1'),
    //     total_adult : JSON.parse(localStorage.getItem('adult') || '1'),
    //     total_child : JSON.parse(localStorage.getItem('children') || '0')
    // }
    // console.log('dataLcl: ', data)
    console.log('params: ', params)
    // return Axios.get(`https://api.caritempat.id/user` + `/guest/hotel/accommodation/booking`, {
    //     params: data
    // })
    // .then((res: any) => {
    //   let data = res.data
    //   console.log('suksesBooking: ', data)
      history.push({
        pathname: `/hotel-reservation/${p.id}/112mockbookingid`,
        state: params
      })
    // })
    // .catch((err:any) => {
    //     throw(err)
    // });
  }

  const renderTienIch = () => {
    return (
      <div className="hidden sm:grid grid-cols-3 gap-2">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <i className="las la-user text-lg"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              6 guests
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <i className="las la-bed text-lg"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              6 beds
            </span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <i className="las la-bath text-lg"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              3 baths
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <i className="las la-smoking-ban text-lg"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              No smoking
            </span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <i className="las la-door-open text-lg"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              6 bedrooms
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <i className="las la-wifi text-lg"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              Wifi
            </span>
          </div>
        </div>
      </div>
    );
  };

  interface Rooms {
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

  interface DataRoom {
    id?: number,
    name?: string,
    code?: string,
    size?: number,
    description?: string,
    thumbnail?: string,
    rooms?: Rooms[]
  }

  const renderContent = (data: DataRoom, index: number) => {
    return (
      <div className="flex-grow p-3 sm:p-5 flex flex-col">
        <div className="space-y-2">
          <div className="text-sm text-neutral-500 dark:text-neutral-400 text-justify">
            <span className="list-desc">
              {data.description}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Badge name={data.code} color="green" />
            <h2 className="text-lg font-medium capitalize">
              <span className="line-clamp-1">
                {data.name}
              </span>
            </h2>
          </div>
        </div>
        <div className="hidden sm:block w-14 border-b border-neutral-100 dark:border-neutral-800 my-4"></div>
        {renderTienIch()}
        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800 my-4"></div>
        <div className="flex justify-between items-end">
          <span className="text-base font-semibold text-secondary-500">
            {data.size}
            <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
              {/* /night */}
            </span>
          </span>
          <button className="btn btn-warning btn-sm">
            <span>See available rooms</span>
          </button>
        </div>
      </div>
      // <> 
      //   <div className="flex-grow p-3 sm:p-5 flex flex-col text-start">
      //     <span>{data.name}</span>
      //     <div>
      //       <i className={`text-2xl text-neutral-6000 las la-coffee mr-1`}></i>
      //       <span>Tidak termasuk sarapan</span>
      //     </div>
      //     <div>
      //       <i className={`text-2xl text-neutral-6000 las la-coffee mr-1`}></i>
      //       <span>Bisa Refund</span>
      //     </div>
      //     <div>
      //       <i className={`text-2xl text-neutral-6000 las la-coffee mr-1`}></i>
      //       <span>Tidak Bisa Di-reschedule</span>
      //     </div>
      //     <br/>
      //     <div className="row">
      //       <div className="col col-md-8">
      //         <div>
      //           <span>Rp 1.410.003,02</span>
      //         </div>
      //         <span>Perkamar permalam</span>
      //       </div>
      //       <div className="col col-md-4">
      //         <button 
      //           className="btn btn-sm btn-warning" 
      //           style={{width: '125px', height: '50px', borderRadius: '50px'}}
      //         >
      //           Pilih Kamar
      //         </button>
      //       </div>
      //     </div>
      //   </div>
      // </>
    );
  };

  const renderContent2 = () => {
    return (
      <div className="flex-grow p-3 sm:p-5 flex flex-col">
        <div className="space-y-2">
          <div className="text-sm text-neutral-500 dark:text-neutral-400">
            <span>
            Hotel Sahid Bandar Lampung terletak di Teluk Betung, wilayah yang populer dengan pantainya yang eksotis. Hotel bintang 3 ini mempunyai 70 kamar yang didesain sesuai dengan selera anda, berbagai jenis kamar dari Superior ke Suite dan dilengkapi dengan Kola
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Badge name="RM_842_3" color="green" />
            <h2 className="text-lg font-medium capitalize">
              <span className="line-clamp-1">4 Bedroom</span>
            </h2>
          </div>
        </div>
        <div className="hidden sm:block w-14 border-b border-neutral-100 dark:border-neutral-800 my-4"></div>
        {renderTienIch()}
        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800 my-4"></div>
        <div className="flex justify-between items-end">
          {/* <StartRating reviewCount={reviewCount} point={reviewStart} /> */}
          <span className="text-base font-semibold text-secondary-500">
            4
            {` `}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div>
      { p.room_groups ? 
        (
          p.room_groups.map((a, index) => (
            <>
            <div
              className={`mb-4 nc-StayCardH group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow will-change-transform`}
              data-nc-id="StayCardH"
            >
              <button className="flex flex-col sm:flex-row sm:items-center" disabled>
                {renderSliderGallery()}
                {/* {renderContent(a, index)} */}
                <div className="flex-grow p-3 sm:p-5 flex flex-col">
                  <div className="space-y-2">
                    <div className="text-sm text-neutral-500 dark:text-neutral-400 text-justify">
                      <span className="list-desc">
                        {a.description}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge name={a.code} color="green" />
                      <h2 className="text-lg font-medium capitalize">
                        <span className="line-clamp-1">
                          {a.name}
                        </span>
                      </h2>
                    </div>
                  </div>
                  <div className="hidden sm:block w-14 border-b border-neutral-100 dark:border-neutral-800 my-4"></div>
                  {renderTienIch()}
                  <div className="w-14 border-b border-neutral-100 dark:border-neutral-800 my-4"></div>
                  <div className="flex justify-between items-end">
                    <span className="text-base font-semibold text-secondary-500">
                      {a.size}
                      <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                        {/* /night */}
                      </span>
                    </span>
                    <button className="btn btn-warning btn-sm" onClick={()=> handleClickSee(a)}>
                      <span>See available rooms</span>
                    </button>
                    {/* <button className="btn btn-warning btn-sm" onClick={()=> alert(a.id)}>
                      <span>id</span>
                    </button> */}
                  </div>
                </div>
              </button>
            </div>
            <Modal
              show={showModal}
              // size="lg"
              centered
              onHide={()=> setShowModal(!showModal)}
              keyboard={false}
            >
              <Modal.Body>
                { room.rooms && room.rooms.map((a, index) => (
                  <div>
                    <div className="modal-title">
                      <span className="title-text">List Rooms</span>
                    </div>
                    <div
                      className={`mb-4 nc-StayCardH group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow will-change-transform room-list`}
                      data-nc-id="StayCardH"
                    >
                      <span className="room-title">{a.name}</span>
                      <div>
                        <i className={`text-2xl text-neutral-6000 las la-utensils mr-1`}></i>
                        <span className="room-desc">{a.breakfast? '' : 'Tidak'} Termasuk Sarapan</span>
                      </div>
                      <div>
                        <i className={`text-2xl text-neutral-6000 las la-utensils mr-1`}></i>
                        <span className="room-desc">{a.refundable? '' : 'Tidak'}Bisa Refund</span>
                      </div>
                      <div className="mb-3">
                        <i className={`text-2xl text-neutral-6000 las la-utensils mr-1`}></i>
                        <span className="room-desc">{a.reschedule? '' : 'Tidak'} Bisa Di-Reschedule</span>
                      </div>
                      <div className="row">
                        <div className="col">
                          {/* <span className="room-price">{priceDecimal(numbea.price)}</span> */}
                          <span className="room-price">Rp {priceDecimal(a.price?.toString())}</span>
                          <div className="room-per">
                            <span>Perkamar permalam</span>
                          </div>
                        </div>
                        <div className="col col-md-4 col-sm-4 col-xs-4 d-flex justify-content-center" onClick={()=> {
                          handleClickRoom(a)
                          // console.log('clickroom: ', a)
                          localStorage.setItem('roomId', JSON.stringify(a.code))
                        }}
                        >
                          <button className="btn btn-warning btn-sm btn-select-room">Pilih Kamar</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Modal.Body>
            </Modal>
            </>
          ))
        )
        :
        null
    }
    </div>
  );
};

export default RoomList;
