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
import BgGlassmorphism from "page-components/BgGlassmorphism/BgGlassmorphism";

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
    search_id?: number,
    count?: number
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
  const history = useHistory() 
  const [room, setRoom] = useState<DataRooms>({});
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    console.log('room: ', room)
  }, [room])
  // const [counter, setCounter] = useState(0)

  const handleClickSee = (data: DataRoom) => {
    // localStorage.setItem('roomId', JSON.stringify(data.id))
    console.log('handleclicksee: ', data)
    let newData = data?.rooms?.map((a, index) => (
      {
        name: a.name,
        code: a.code,
        price: a.price,
        refundable: a.refundable,
        breakfast: a.breakfast,
        reschedule: a.reschedule,
        count: 0
      }
    ))
    let destructureData = {
      id: data.id,
      name: data.name,
      code: data.code,
      description: data.description,
      rooms: newData
    }
    // setRoom(data)
    setRoom(destructureData)
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

  const handleClickNext = () => {
    let dateString = JSON.parse(localStorage.getItem('dateString') || '')
    let RoomItems = room?.rooms?.map((a, index) => (
      {
        room_id: room?.id,
        room_name: a.name,
        room_code: a.code,
        qty: a.count
      }
    ))
    let RoomItemsParams = room?.rooms?.map((a, index) => (
      {
        room_id: room?.id,
        guest_name: '',
        guest_email: '',
      }
    ))
    let dataPost = {
      accommodation_id : JSON.parse(localStorage.getItem('accomodationId') || ''),
      room_id: room?.id,
      start_date : dateString.startDate,
      duration : JSON.parse(localStorage.getItem('dateDuration') || '1'),
      total_room : JSON.parse(localStorage.getItem('room') || '1'),
      total_adult : JSON.parse(localStorage.getItem('adult') || '1'),
      total_child : JSON.parse(localStorage.getItem('children') || '0'),
      room_items: RoomItems
    }
    console.log('dataPost: ', dataPost)
    // console.log('room: ', room)
    // const config = {
    //   headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY2MDkyOTYxNiwiZXhwIjoxNjkyNDY1NjE2fQ.PzQ_OigdD4pml91Dvr4JaIgoQ-a6xLX9p2cgwNX2M-c` }
    // };
    Axios.post(`https://api.caritempat.id/user` + `/guest/hotel/booking`, dataPost)
    .then((res: any) => {
      let data = res.data.data
      history.push({
        pathname: `/hotel-reservation/${p.id}/${data.booking_id}`,
        state: {
          room: room?.rooms,
          roomPost: RoomItemsParams
        }
      })
    })
    .catch((err:any) => {
        throw(err)
    });
  }

  const handleClickRoom = (params: RoomParamsClick) => {
    let dateString = JSON.parse(localStorage.getItem('dateString') || '')
    let dataPost = {
        accommodation_id : JSON.parse(localStorage.getItem('accomodationId') || ''),
        // accommodation_id : params.code,
        // room_id : JSON.parse(localStorage.getItem('roomId') || ''),
        room_id : params.code,
        start_date : dateString.startDate,
        duration : JSON.parse(localStorage.getItem('dateDuration') || '1'),
        total_room : JSON.parse(localStorage.getItem('room') || '1'),
        total_adult : JSON.parse(localStorage.getItem('adult') || '1'),
        total_child : JSON.parse(localStorage.getItem('children') || '0')
    }
    Axios.post(`https://api.caritempat.id/user` + `/guest/hotel/booking`, dataPost)
    .then((res: any) => {
      let data = res.data.data
      history.push({
        pathname: `/hotel-reservation/${p.id}/${data.booking_id}`,
        state: params
      })
    })
    .catch((err:any) => {
        throw(err)
    });
  }

  interface DataClickCounter {
    code?: string,
    name?: string
  }

  const handleCounterMin = (data:DataClickCounter, index: number) => {
    let dataRooms = room.rooms
    if(dataRooms?.[index].count == 0) {

    }
    else {
      let newData = dataRooms?.map((a, index) => (
        {
          name: a.name,
          code: a.code,
          price: a.price,
          refundable: a.refundable,
          breakfast: a.breakfast,
          reschedule: a.reschedule,
          count: Number(a.count) - 1
        }
      ))
      setRoom({
        ...room,
        rooms: newData
      })
    }
  } 

  const handleCounterPlus = (data:DataClickCounter, index: number) => {
    let dataRooms = room.rooms
    let newData = dataRooms?.map((a, index) => (
      {
        name: a.name,
        code: a.code,
        price: a.price,
        refundable: a.refundable,
        breakfast: a.breakfast,
        reschedule: a.reschedule,
        count: Number(a.count) + 1
      }
    ))
    setRoom({
      ...room,
      rooms: newData
    })
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
    search_id?: number,
    count?: number
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
              <Modal.Body className="p-4">
                { room.rooms && room.rooms.map((a, index) => (
                  <div>
                    {/* <BgGlassmorphism/> */}
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
                          <span className="room-price">Rp {priceDecimal(a.price?.toString())}</span>
                          <div className="room-per">
                            <span>Perkamar permalam</span>
                          </div>
                        </div>
                        <div className="col col-md-4 col-sm-4 col-xs-4 d-flex justify-content-center">
                          {/* <button className="btn btn-warning btn-sm btn-select-room" onClick={()=> {
                          handleClickRoom(a)
                          localStorage.setItem('roomId', JSON.stringify(a.code))
                        }}>Pilih Kamar</button> */}
                          <div className="room-counter">
                            <div className="btn btn-count" onClick={()=> handleCounterMin(a, index)}><span>-</span></div>
                            <span>{a.count}</span>
                            <div className="btn btn-count" onClick={()=> handleCounterPlus(a, index)}>+</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="">
                  <button className="btn btn-warning btn-sm btn-select-room" onClick={handleClickNext}>Lanjutkan</button>
                </div>
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
