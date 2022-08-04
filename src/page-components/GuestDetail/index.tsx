import React, { Fragment, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import NcInputNumber from "components/NcInputNumber/NcInputNumber";
import { FC } from "react";
import ClearDataButton from "../../components/HeroSearchForm/ClearDataButton";
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from 'state';
import { RootState } from 'state/reducers';

export interface GuestsInputProps {
  defaultValue: {
    guestAdults?: number;
    guestChildren?: number;
    guestInfants?: number;
  };
  onChange?: (data: GuestsInputProps["defaultValue"]) => void;
  fieldClassName?: string;
}

const GuestsInput: FC<GuestsInputProps> = ({
  defaultValue,
  onChange,
  fieldClassName = "[ nc-hero-field-padding ]",
}) => {
  const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(
    defaultValue.guestAdults || 0
  );
  const [guestChildrenInputValue, setGuestChildrenInputValue] = useState(
    defaultValue.guestChildren || 0
  );
  const [guestInfantsInputValue, setGuestInfantsInputValue] = useState(
    defaultValue.guestInfants || 0
  );

  const state = useSelector((state: RootState) => state.hotel)
  const dispatch = useDispatch();
  const { 
    onChangeAdult,
    onChangeChildren,
    onChangeRoom
  } = bindActionCreators(actionCreators, dispatch)

  useEffect(() => {
    if(localStorage.hotelAdult | localStorage.hotelChildren | localStorage.hotelRoom) {
      setGuestAdultsInputValue(JSON.parse(localStorage.getItem('hotelAdult') || '1'))
      setGuestChildrenInputValue(JSON.parse(localStorage.getItem('hotelChildren') || '0'))
      setGuestInfantsInputValue(JSON.parse(localStorage.getItem('hotelRoom') || '1'))
    }
    else {
      setGuestAdultsInputValue(defaultValue.guestAdults || 1);
      setGuestChildrenInputValue(defaultValue.guestChildren || 0);
      setGuestInfantsInputValue(defaultValue.guestInfants || 1);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (onChange) {
      onChange({
        guestAdults: guestAdultsInputValue,
        guestChildren: guestChildrenInputValue,
        guestInfants: guestInfantsInputValue,
      });
    }
  }, [guestAdultsInputValue, guestChildrenInputValue, guestInfantsInputValue]);

  const totalGuests = guestChildrenInputValue + guestAdultsInputValue;

  const totalRooms = guestInfantsInputValue

  return (
    <Popover className="flex relative [ nc-flex-1 ]">
      {({ open }) => (
        <>
          <Popover.Button
            className={`flex text-left w-full flex-shrink-0 items-center ${fieldClassName} space-x-3 focus:outline-none cursor-pointer ${open ? "nc-hero-field-focused" : ""
              }`}
          >
            <div className="text-neutral-300 dark:text-neutral-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="nc-icon-field"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <div className="flex-grow">
              <span className="block xl:text-lg font-semibold">
                {totalGuests || ""} Tamu
              </span>
              <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
                {totalRooms || ""} Kamar 
              </span>
              {!!totalGuests && open && (
                <ClearDataButton
                  onClick={() => {
                    setGuestAdultsInputValue(0);
                    setGuestChildrenInputValue(0);
                    setGuestInfantsInputValue(0);
                  }}
                />
              )}
            </div>
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
            <Popover.Panel className="absolute right-0 z-10 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl">
              <NcInputNumber
                className="w-full"
                defaultValue={guestAdultsInputValue}
                onChange={(value) => {
                  setGuestAdultsInputValue(value)
                  onChangeAdult(value)
                }}
                max={10}
                min={1}
                label="Dewasa"
                desc="Usia > 13th"
              />
              <NcInputNumber
                className="w-full mt-6"
                defaultValue={guestChildrenInputValue}
                onChange={(value) => {
                  setGuestChildrenInputValue(value)
                  onChangeChildren(value)
                }}
                max={4}
                label="Anak"
                desc="Usia 2 – 12th"
              />

              <NcInputNumber
                className="w-full mt-6"
                defaultValue={guestInfantsInputValue}
                onChange={(value) => {
                  setGuestInfantsInputValue(value)
                  onChangeRoom(value)
                }}
                max={4}
                label="Kamar"
              />
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default GuestsInput;
