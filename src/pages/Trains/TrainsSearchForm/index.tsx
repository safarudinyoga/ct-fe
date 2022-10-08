import React, { useEffect, useState, useCallback } from "react";
import { FocusedInputShape } from "react-dates";
import { FC } from "react";
import { Button, DatePicker, Input, Switch } from 'antd';
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import moment from "moment";
import NcInputNumber from "components/NcInputNumber/NcInputNumber";
// import LocationInput from "components/HeroSearchForm/LocationInput";
import LocationInput from '../LocationSearch'
import ButtonSubmit from "../ButtonSubmit";
import RentalCarDatesRangeInput from "components/HeroSearchForm/RentalCarDatesRangeInput";
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from 'state/action-creators/train'
import { RootState } from 'state/reducers';
import useWindowDimensions from "utils/useWindowDimension";

import '../trains.sass'

var debounce = require('lodash.debounce');
export interface DateRage {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
}

export interface TimeRage {
  startTime: string;
  endTime: string;
}

export interface TrainsSearchFormProps {
  haveDefaultValue?: boolean;
  placeholder?: string;
  description?: string;
}

const trainsClass = [
  {
    name: "Economy",
    href: "##",
  },
  {
    name: "Business",
    href: "##",
  },
  {
    name: "Multiple",
    href: "##",
  },
];

const TrainsSearchForm: FC<TrainsSearchFormProps> = ({ haveDefaultValue, placeholder, description }) => {
  const { isMobile } = useWindowDimensions()

  const dispatch = useDispatch();
  const { list_station, isLoading, isError } = useSelector((state: RootState) => state.trainState)
  const { callApiSearchTrain } = bindActionCreators(actionCreators, dispatch)

  // DEFAULT DATA FOR ARCHIVE PAGE
  const defaultPickUpInputValue = "";
  const defaultDropOffInputValue = "";

  // USE STATE
  const [dateRangeValue, setDateRangeValue] = useState<DateRage>({
    startDate: null,
    endDate: null,
  });
  const [timeRangeValue, setTimeRangeValue] = useState<TimeRage>({
    startTime: "10:00 AM",
    endTime: "10:00 AM",
  });
  const [pickUpInputValue, setPickUpInputValue] = useState("");
  const [dropOffInputValue, setDropOffInputValue] = useState("");
  const [fieldFocused, setFieldFocused] = useState<
    FocusedInputShape | "dropOffInput" | null
  >(null);
  const [dropOffLocationType, setDropOffLocationType] = useState<
    "roundTrip" | "oneWay" | ""
  >("roundTrip");
  const [guests, setGuests] = useState(1);
  // const [trainsClassState, setTrainsClassState] = useState("Economy");
  const [isRoundTrip, setisRoundTrip] = useState(true)
  const [filteredData, setfilteredData] = useState<any>({
    pickUpFiltered: [],
    dropOffFiltered: []
  })
  const { pickUpFiltered, dropOffFiltered } = filteredData
  const [isNotFound, setisNotFound] = useState({
    pickUp: false,
    dropOff: false
  })

  // USER EFFECT
  useEffect(() => {
    if (haveDefaultValue) {
      setDateRangeValue({
        startDate: moment(),
        endDate: moment().add(4, "days"),
      });

      setPickUpInputValue(defaultPickUpInputValue);
      setDropOffInputValue(defaultDropOffInputValue);
    }
    callApiSearchTrain()
  }, []);

  const changeHandlerPickUp = (e: string) => {
    if(e.length > 2) {
      setPickUpInputValue(e)
      const filtered = list_station.filter(res => res.name.toLowerCase().includes(e.toLowerCase()))
      if (filtered.length) {
        setfilteredData({
          ...filteredData,
          pickUpFiltered: filtered
        })
      } else {
        setisNotFound({
          ...isNotFound,
          pickUp: true
        })
      }
    }
  };

  const debouncedChangeHandlerPickUp = useCallback(
    debounce(changeHandlerPickUp, 500)
  , []);

  const changeHandlerDropOff = (e: string) => {
    if(e.length > 2) {
      setDropOffInputValue(e)
      const filtered = list_station.filter(res => res.name.toLowerCase().includes(e.toLowerCase()))
      if (filtered.length) {
        setfilteredData({
          ...filteredData,
          dropOffFiltered: filtered
        })
      } else {
        setisNotFound({
          ...isNotFound,
          dropOff: true
        })
      }
    }
  };

  const debouncedChangeHandlerDropOff = useCallback(
    debounce(changeHandlerDropOff, 500)
  , []);

  const renderGuest = () => {
    return (
      <div className="">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={`
           ${open ? "" : ""}
            px-4 py-1.5 rounded-md inline-flex items-center font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 text-xs`}
              >
                <span>{`${guests} Guest`}</span>
                <ChevronDownIcon
                  className={`${
                    open ? "" : "text-opacity-70"
                  } ml-2 h-4 w-4 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                  aria-hidden="true"
                />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute z-10 px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 ">
                  <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10">
                    <div className="relative bg-white dark:bg-neutral-800 p-4">
                      <NcInputNumber
                        onChange={(e) => setGuests(e)}
                        min={1}
                        defaultValue={guests}
                        max={20}
                      />
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    );
  };

  // const renderSelectClass = () => {
  //   return (
  //     <div className="">
  //       <Popover className="relative">
  //         {({ open, close }) => (
  //           <>
  //             <Popover.Button
  //               className={`
  //          ${open ? "" : ""}
  //           px-4 py-1.5 rounded-md inline-flex items-center font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 text-xs`}
  //             >
  //               <span>{`${trainsClassState}`}</span>
  //               <ChevronDownIcon
  //                 className={`${
  //                   open ? "" : "text-opacity-70"
  //                 } ml-2 h-4 w-4 group-hover:text-opacity-80 transition ease-in-out duration-150`}
  //                 aria-hidden="true"
  //               />
  //             </Popover.Button>
  //             <Transition
  //               as={Fragment}
  //               enter="transition ease-out duration-200"
  //               enterFrom="opacity-0 translate-y-1"
  //               enterTo="opacity-100 translate-y-0"
  //               leave="transition ease-in duration-150"
  //               leaveFrom="opacity-100 translate-y-0"
  //               leaveTo="opacity-0 translate-y-1"
  //             >
  //               <Popover.Panel className="absolute z-10 w-screen max-w-[200px] sm:max-w-[220px] px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 ">
  //                 <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10 ">
  //                   <div className="relative grid gap-8 bg-white dark:bg-neutral-800 p-7 ">
  //                     {trainsClass.map((item) => (
  //                       <a
  //                         key={item.name}
  //                         href={item.href}
  //                         onClick={(e) => {
  //                           e.preventDefault();
  //                           setTrainsClassState(item.name);
  //                           close();
  //                         }}
  //                         className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
  //                       >
  //                         <p className="text-sm font-medium ">{item.name}</p>
  //                       </a>
  //                     ))}
  //                   </div>
  //                 </div>
  //               </Popover.Panel>
  //             </Transition>
  //           </>
  //         )}
  //       </Popover>
  //     </div>
  //   );
  // };

  const renderRadioBtn = () => {
    return (
      <div className=" py-5 [ nc-hero-field-padding ] flex flex-row flex-wrap border-b border-neutral-100 dark:border-neutral-700">
        <div
          className={`py-1.5 px-4 flex items-center rounded-full font-medium text-xs cursor-pointer mr-2 my-1 sm:mr-4 ${
            dropOffLocationType === "roundTrip"
              ? "bg-black shadow-black/10 shadow-lg text-white"
              : "border border-neutral-300 dark:border-neutral-700"
          }`}
          onClick={(e) => {
            setDropOffLocationType("roundTrip")
            setisRoundTrip(true)
          }}
        >
          Round-trip
        </div>
        <div
          className={`py-1.5 px-4 flex items-center rounded-full font-medium text-xs cursor-pointer mr-2 my-1 sm:mr-4 ${
            dropOffLocationType === "oneWay"
              ? "bg-black text-white shadow-black/10 shadow-lg"
              : "border border-neutral-300 dark:border-neutral-700"
          }`}
          onClick={(e) => {
            setDropOffLocationType("oneWay")
            setisRoundTrip(false)
          }}
        >
          One-way
        </div>
        {/* <div className=" mr-2 my-1 sm:mr-4 border border-neutral-300 dark:border-neutral-700 rounded-full">
          {renderSelectClass()}
        </div> */}
        <div className="my-1 border border-neutral-300 dark:border-neutral-700 rounded-full">
          {renderGuest()}
        </div>
      </div>
    );
  };

  const renderForm = () => {
    return (
      <div className="w-full">
        <form className="w-full relative mt-8 rounded-3xl shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800">
          {renderRadioBtn()}
          <div className=" flex flex-col md:flex-row w-full rounded-full [ nc-divide-field ] ">
            <div className="relative flex flex-col md:flex-row flex-grow [ nc-divide-field ] ">
              <LocationInput
                onChange={debouncedChangeHandlerPickUp}
                listStation={pickUpFiltered}
                isNotFound={isNotFound.pickUp}
                // defaultValue={pickUpInputValue}
              />
              <LocationInput
                onChange={debouncedChangeHandlerDropOff}
                listStation={dropOffFiltered}
                isNotFound={isNotFound.dropOff}
                // defaultValue={pickUpInputValue}
              />
            </div>
            <RentalCarDatesRangeInput
              defaultDateValue={dateRangeValue}
              defaultTimeValue={timeRangeValue}
              defaultFocus={
                fieldFocused === "dropOffInput" ? null : fieldFocused
              }
              onFocusChange={(focus) => setFieldFocused(focus)}
              onChange={(data) => {
                setDateRangeValue(data.stateDate);
                setTimeRangeValue(data.stateTimeRage);
              }}
              isRoundTrip={isRoundTrip}
            />
            {/* BUTTON SUBMIT OF FORM */}
            <div className="px-4 py-3 flex items-center justify-center">
              <ButtonSubmit />
            </div>
          </div>
        </form>
      </div>
    );
  };

  const renderFormMobile = () => {
    return (
      <div className="mobile-view-trains">
        <div className="flex flex-column gap-3">
          <div className="flex flex-column gap-2 justify-content-start">
            <h4>Dari</h4>
            <Input placeholder="Jakarta" />
          </div>
          <div className="flex flex-column gap-2 justify-content-start">
            <h4>Ke</h4>
            <Input placeholder="Surabaya" />
          </div>
          <div className="flex flex-column gap-2 justify-content-start">
            <h4>Tanggal Berangkat</h4>
            <div className="flex align-items-center gap-4 w-100">
              <DatePicker onChange={(date) => console.log(date)} className='w-3/4' />
              <Switch />
            </div>
          </div>
          <div className="flex flex-column gap-2 justify-content-start">
            <h4>Tanggal Pulang</h4>
            <DatePicker onChange={(date) => console.log(date)} className='w-3/4' />
          </div>
          <div className="flex flex-column gap-2 justify-content-start">
            <h4>Jumlah Penumpang</h4>
            <Input placeholder="1" />
          </div>
        </div>
        <Button className='mt-4'>Cari Kereta</Button>
      </div>
    )
  }

  return isMobile ? renderFormMobile() : renderForm();
};

export default TrainsSearchForm;
