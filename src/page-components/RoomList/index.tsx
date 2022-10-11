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
    allotment?: number,
    default_occupancy?: number,
    name?: string,
    code?: string,
    provider?: string,
    breakfast?: boolean,
    refundable?: boolean,
    reschedule?: boolean,
    price?: number,
    ratekey?: string,
    search_id?: number,
    count?: number,
}

export interface DataRooms {
    id?: number,
    name?: string,
    code?: string,
    size?: number,
    max_occupancy?: number,
    description?: string,
    thumbnail?: string,
    rooms?: Rooms[]
}

export interface RoomListProps {
  id?: number,
  room_groups?: DataRooms[],
  onClick?: React.MouseEventHandler
}


const RoomList: FC<RoomListProps> = p => {
  const history = useHistory() 
  const [dataRoom, setDataRoom] = useState<DataRooms | any>(null);
  const [totalList, setTotalList] = useState<DataRooms[] | any>([]);
  const [room, setRoom] = useState<DataRooms>({});
  const [showModal, setShowModal] = useState(false)
  const [totalPrice, setTotalPrice] = useState<string | any>(0);

  useEffect(() => {
    console.log('RoomGroups: ', p.room_groups)
    if(p?.room_groups !== undefined) {
      setDataRoom(p?.room_groups)
    }
  }, [p.room_groups])

  useEffect(() => {
    console.log('dataRoom: ', dataRoom)
  }, [dataRoom])

  useEffect(() => {
    console.log('room: ', room)
  }, [room])
  // const [counter, setCounter] = useState(0)

  const handleClickSee = (data: DataRooms) => {
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
    console.log('dataRoomClicked: ', totalList)
    let getData = [...totalList]
    let dataRooms = getData.map(a => a.rooms).flat()
    console.log('dataRoomsPost: ', dataRooms)
    // console.log('id: ', p.id)
    let dateString = JSON.parse(localStorage.getItem('dateString') || '')
    let RoomItems = dataRooms.map((a, index) => (
      {
        room_id: p?.id,
        room_name: a.name,
        room_code: a.code,
        qty: a.default_occupancy
      }
    ))
    let RoomItemsParams = dataRooms.map((a, index) => (
      {
        room_id: p?.id,
        guest_name: '',
        guest_email: '',
      }
    ))
    let dataPost = {
      accommodation_id : JSON.parse(localStorage.getItem('accomodationId') || ''),
      room_id: p?.id,
      start_date : dateString.startDate,
      duration : JSON.parse(localStorage.getItem('dateDuration') || '1'),
      total_room : JSON.parse(localStorage.getItem('room') || '1'),
      total_adult : JSON.parse(localStorage.getItem('adult') || '1'),
      total_child : JSON.parse(localStorage.getItem('children') || '0'),
      room_items : RoomItems
    }
    console.log('dataPost: ', dataPost)
    Axios.post(`https://api.caritempat.id/user` + `/guest/hotel/booking`, dataPost)
    .then((res: any) => {
      let data = res.data.data
      history.push({
        pathname: `/hotel-reservation/${p.id}/${data.booking_id}`,
        state: {
          room: dataRooms,
          roomPost: RoomItemsParams,
          totalPrice: totalPrice
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

  useEffect(() => {
    console.log('totalList: ', totalList)
  }, [totalList])

  useEffect(() => {
    let getData = [...totalList]
    if(getData.length > 0) {
      let dataRooms = getData.map(a => a.rooms).flat()
      console.log('dataROOMS: ', dataRooms)
      let priceResult = []
      for(let i = 0; i < dataRooms.length; i++) {
        let totalPrice = dataRooms[i].price * dataRooms[i].default_occupancy
        // console.log('TOTALPRICE: ', totalPrice)
        priceResult.push(totalPrice)
      }
      let lastResult = priceResult.reduce<number>((accumulator, current) => {
        return accumulator + current;
      }, 0);
      setTotalPrice(lastResult)
    }
    // console.log('getDataPrice: ', getDataPrice)
  }, [totalList])

  const addTotalList = (data: DataRooms, indexRoom: number) => {
    if(data?.rooms !== undefined) {
      let newData = data.rooms.map(a => a.default_occupancy || 0)
      let result = newData.reduce<number>((accumulator, current) => {
        return accumulator + current;
      }, 0);
      if(result == 0) {
        let list = [...totalList]
        let getIndex = list.findIndex(a => a.code == data.code)
        list.splice(getIndex, 1)
        setTotalList(list)
      }
      else {
        let list = [...totalList]
        let check = list.filter(a => a.code == data.code)
        console.log('check: ', check)
        if(check.length > 0) {
          let renewList = list.filter(a => a.code !== data.code)
          renewList.push(data)
          setTotalList(renewList)
        }
        else {
          list.push(data)
          setTotalList(list)
        }
      }
    }
    
    console.log('DATAAAROOMS: ', data.rooms)

  }

  const handleCounterMin = (data:DataClickCounter, index: number, indexRoom: number) => {
    if(dataRoom?.[index]?.rooms?.[indexRoom]?.default_occupancy > 0) {
      let getRoomGroups = dataRoom?.[index]
      let getRoom = getRoomGroups?.rooms?.[indexRoom]
      getRoom.default_occupancy = Number(getRoom.default_occupancy) - 1
      let newData = [...dataRoom]
      newData.splice(index, 1, getRoomGroups)
      console.log('getRoomGroups: ', getRoomGroups)
      addTotalList(getRoomGroups, indexRoom)
      setDataRoom(newData)
    }
    else {

    }
  } 

  const handleCounterPlus = (data:DataClickCounter, index: number, indexRoom: number) => {
    let getRoomGroups = dataRoom?.[index]
    let getRoom = getRoomGroups?.rooms?.[indexRoom]
    getRoom.default_occupancy = Number(getRoom.default_occupancy) + 1
    let newData = [...dataRoom]
    newData.splice(index, 1, getRoomGroups)
    console.log('getRoomGroups: ', getRoomGroups)
    addTotalList(getRoomGroups, indexRoom)
    setDataRoom(newData)
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

  // interface Rooms {
  //   name?: string,
  //   code?: string,
  //   provider?: string,
  //   breakfast?: boolean,
  //   refundable?: boolean,
  //   reschedule?: boolean,
  //   price?: number,
  //   ratekey?: string,
  //   search_id?: number,
  //   count?: number
  // }

  // interface DataRoom {
  //   id?: number,
  //   name?: string,
  //   code?: string,
  //   size?: number,
  //   description?: string,
  //   thumbnail?: string,
  //   rooms?: Rooms[]
  // }

  const renderContent = (data: DataRooms, index: number) => {
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
      {/* { p.room_groups ?  */}
      { dataRoom ? 
        (
          // p.room_groups.map((a, index) => (
          dataRoom.map((a: DataRooms, index: number) => (
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
                    {/* <button className="btn btn-warning btn-sm" onClick={()=> handleClickSee(a)}>
                      <span>See available rooms</span>
                    </button> */}
                    {/* <button className="btn btn-warning btn-sm" onClick={()=> alert(a.id)}>
                      <span>id</span>
                    </button> */}
                  </div>
                </div>
              </button>
            <div>
            { a.rooms && a.rooms.map((a, indexRoom) => (
                  <div>
                    <div
                      className={`room-list`}
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
                          <div className="room-counter">
                            <div className="btn btn-count" onClick={()=> handleCounterMin(a, index, indexRoom)}><span>-</span></div>
                            <span>{a.default_occupancy}</span>
                            <div className="btn btn-count" onClick={()=> handleCounterPlus(a, index, indexRoom)}>+</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            </div>
  
            </>
          ))
        )
        :
        null
    }
    { totalList.length > 0 ?
      (
        <div className="modal-total">
          <div className="row total-wrapper">
            <div className="col total-left col-xs-6 col-sm-6 col-md-6">
              <h3>Rp {priceDecimal(totalPrice)}</h3>
            </div>
            <div className="col total-right col-xs-6 col-sm-6 col-md-6">
            <button 
                onClick={handleClickNext}
                className="btn btn-sm btn-warning btn-pilih" 
                style={{width: '125px', height: '50px', borderRadius: '50px'}}
                >
                Pilih Kamar
              </button>
            </div>
          </div>
        </div>
      ) : null
    }
    </div>
  );
};

export default RoomList;
