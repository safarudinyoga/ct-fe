import React, { FC, Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import GuestsInput from "components/HeroSearchForm/GuestsInput";
import StayDatesRangeInput from "components/HeroSearchForm/StayDatesRangeInput";
import { DateRage } from "components/HeroSearchForm/StaySearchForm";
import StartRating from "components/StartRating/StartRating";
import useWindowSize from "hooks/useWindowResize";
import moment from "moment";
import { DayPickerRangeController, FocusedInputShape } from "react-dates";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import NcImage from "shared/NcImage/NcImage";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'state/reducers';
import { useLocation } from "react-router-dom";
import SectionGridHasMap from "page-components/SectionGridHasMap/SectionGridHasMap";
import { Modal, Row, Col } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { actionCreators } from 'state';
import { HotelDetailProps, DataProps } from "./HotelDetailProps";
import './style.scss';
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import RoomList from 'page-components/RoomList';

const PHOTOS: string[] = [
  "https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  "https://images.pexels.com/photos/7163619/pexels-photo-7163619.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/6527036/pexels-photo-6527036.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/6969831/pexels-photo-6969831.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/6438752/pexels-photo-6438752.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/1320686/pexels-photo-1320686.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/261394/pexels-photo-261394.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/2861361/pexels-photo-2861361.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/2677398/pexels-photo-2677398.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
];

const HotelDetail: FC<HotelDetailProps> = (p) => {
  const state = useSelector((state: RootState) => state.hotel)
  const history = useHistory();
  const dispatch = useDispatch();
  const [data, setData] = useState<DataProps>({});
  const { getListHotel } = bindActionCreators(actionCreators, dispatch)
  useEffect(() => {
    if(localStorage.hotelSlug == undefined) {
      localStorage.removeItem('hotelSearchValue')
      history.push({
        pathname: '/hotels'
      })
    }
    else {
      let slug = JSON.parse(localStorage.getItem('hotelSlug') || '')
      let dateString = JSON.parse(localStorage.getItem('dateString') || '')
      let data = {
        date: dateString.startDate,
        duration: JSON.parse(localStorage.getItem('dateDuration') || '1'),
        adult: JSON.parse(localStorage.getItem('adult') || '1'),
        children: JSON.parse(localStorage.getItem('children') || '0'),
        room: JSON.parse(localStorage.getItem('room') || '1')
      }
      getListHotel(data, slug)
    }
  }, [])

  useEffect(() => {
    setData(state.dataListDetailHotel)
  }, [state.dataListDetailHotel])

  // const [isOpen, setIsOpen] = useState(false);
  // const [openFocusIndex, setOpenFocusIndex] = useState(0);
  const [isOpenModalAmenities, setIsOpenModalAmenities] = useState(false);
  const [modalState, setModalState] = useState(0);
  const [selectedDate, setSelectedDate] = useState<DateRage>({
    startDate: moment(),
    endDate: moment().add(4, "days"),
  });

  const dataRoom = {
    ...data.room_groups
  }

  useEffect(() => {
    console.log('data: ', data)
  }, [data])
  // const [focusedInputSectionCheckDate, setFocusedInputSectionCheckDate] =
  //   useState<FocusedInputShape>("startDate");

  const windowSize = useWindowSize();
  const getDaySize = () => {
    if (windowSize.width <= 375) {
      return 34;
    }
    if (windowSize.width <= 500) {
      return undefined;
    }
    if (windowSize.width <= 1280) {
      return 56;
    }
    return 48;
  };

  function closeModalAmenities() {
    setIsOpenModalAmenities(false);
  }

  function openModalAmenities() {
    setIsOpenModalAmenities(true);
  }

  // const handleOpenModal = (index: number) => {
  //   setIsOpen(true);
  //   setOpenFocusIndex(index);
  // };

  // const handleCloseModal = () => setIsOpen(false);

  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap !space-y-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold purple">
          {data.name}
        </h2>
        <div className="flex items-center space-x-4">
            <i className="las la-map-marker-alt"></i>
            <span className="ml-1">
                {data.address}
            </span>
          <StartRating 
            point={data.stars}
          />
        </div>
      </div>
    );
  };

  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap">
        <h2 className="text-2xl font-semibold purple">Hotel information</h2>
        <div className="text-neutral-6000 dark:text-neutral-300">
          <span className="text-justify">
            {data.description}
          </span>
        </div>
      </div>
    );
  };

  const renderSection3 = () => {
    return (
      <div>
        { data?.facilities && data?.facilities.map ((a, index) => (
            <>
          <div className="listingSection__wrap mb-4">
            <div>
              <h2 className="text-2xl font-semibold purple">{a.name} </h2>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 text-sm text-neutral-700 dark:text-neutral-300 ">
              {a?.facilities && a?.facilities.filter((_, i) => i < 12).map((item) => (
                <div key={item.name} className="flex items-center space-x-3">
                  <div className="flex items-center space-x-3">
                    <i className={`text-3xl las la-bed`}></i>
                    <span className=" ">{item.name}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-14 border-b border-neutral-200"></div>
            <div>
              <ButtonSecondary onClick={() => {
                openModalAmenities()
                setModalState(index)
                }}>
                View more 20 amenities
              </ButtonSecondary>
            </div>
            {renderModalAmenities()}
          </div>
          </>
      ))}
      </div>
    );
  };
 
  const renderSection4 = () => {
    return (
      <div className="listingSection__wrap mb-4">
         <div>
            <h2 className="text-2xl font-semibold purple">Room Groups</h2>
          </div>
          <RoomList
            {...data}
          />
      </div>
    )
  }

  const renderSidebar = () => {
    return (
      <div className="listingSectionSidebar__wrap shadow-xl card-sidebar">
        <div className="text-center icon">
          <i className={`text-4xl text-neutral-6000 purple las la-info-circle mr-1`}></i>
        </div>
        <div className="text-justify">
          <span className="">Baca regulasi dan peraturan perjalanan serta akomodasi berkaitan dengan situasi pandemic COVID 19. Pastikan kebijakan pembatalan sesuai dengan kebutuhan</span>
        </div>
      </div>
    );
  };

  const renderModalAmenities = () => {
    return (
      <Modal 
        show={isOpenModalAmenities} 
        size="lg"
        centered
        onHide={closeModalAmenities}
      >
        <Modal.Body>
          <Row className="d-flex justify-content-around">
              <Col md={2}>
              </Col>
              <Col md={8} className="d-flex justify-content-center">
                  <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="headlessui-dialog-title-70"
                  >
                      Amenities
                  </h3>
              </Col>
              <Col md={2} className="d-flex justify-content-end">
                  <button className="btn btn-close" onClick={closeModalAmenities}></button>
              </Col>
          </Row>
          <div className="px-1 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200 box-modal">
              {data?.facilities && data?.facilities.map((a, index) => (
                  <div
                      key={index}
                      className="flex items-center py-6 space-x-8"
                  >
                  <i
                      className={`text-4xl text-neutral-6000 las la-coffee`}
                  ></i>
                  <span>{a.name}</span>
                  </div>
              ))}
          </div>
        </Modal.Body>
      </Modal>
    )
  }

  return (
    <div
      className={`nc-ListingStayDetailPage mt-4`}
      data-nc-id="ListingStayDetailPage"
    >
      <>
        <header className="container 2xl:px-14 rounded-md sm:rounded-xl">
          <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2">
            <div
              className="col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
              // onClick={() => handleOpenModal(0)}
            >
              <NcImage
                containerClassName="absolute inset-0"
                className="object-cover w-full h-full rounded-md sm:rounded-xl"
                src={PHOTOS[0]}
              />
              <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
            </div>
            {PHOTOS.filter((_, i) => i >= 1 && i < 5).map((item, index) => (
              <div
                key={index}
                className={`relative rounded-md sm:rounded-xl overflow-hidden ${
                  index >= 3 ? "hidden sm:block" : ""
                }`}
              >
                <NcImage
                  containerClassName="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5"
                  className="object-cover w-full h-full rounded-md sm:rounded-xl "
                  src={item || ""}
                />

                <div
                  className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                  // onClick={() => handleOpenModal(index + 1)}
                />
              </div>
            ))}

            <div
              className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 cursor-pointer hover:bg-neutral-200 z-10"
              // onClick={() => handleOpenModal(0)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              <span className="ml-2 text-neutral-800 text-sm font-medium">
                Show all photos
              </span>
            </div>
          </div>
        </header>
      </>
      <main className="container relative z-10 mt-11 flex flex-col lg:flex-row ">
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10">
        <BgGlassmorphism/>
          {renderSection1()}
          {renderSection2()}
          {renderSection3()}
          {renderSection4()}
        </div>
        <div className="block flex-grow mt-14 lg:mt-0">
          <div className="sticky top-24">{renderSidebar()}</div>
        </div>
      </main>
    </div>
  );
};

export default HotelDetail;
