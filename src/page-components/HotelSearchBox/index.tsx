import React, { useEffect, useState, useCallback } from "react";
import LocationSearch from "page-components/LocationSearch";
import GuestDetail from "page-components/GuestDetail";
import DateRange from "page-components/DateRange";
import ButtonSubmit from "page-components/ButtonSubmit/ButtonSubmit";
import { FocusedInputShape } from "react-dates";
import moment from "moment";
import { FC } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from 'state';
import { RootState } from 'state/reducers';
import Axios from 'axios';
import { useHistory } from "react-router-dom";
import {HotelSearchBoxProps} from './HotelSearchBoxProps';
import { Link } from "react-router-dom";
import './style.scss';
var debounce = require('lodash.debounce');
export interface DateRage {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
}


const HotelSearchBox: FC<HotelSearchBoxProps> = p => {
  const history = useHistory()
  const [locationInputValue, setLocationInputValue] = useState("");
  const [guestValue, setGuestValue] = useState({});
  const [dateFocused, setDateFocused] = useState<FocusedInputShape | null>(null);
  const [showAlert, setShowAlert] = useState(false)
  const [dateRangeValue, setDateRangeValue] = useState<DateRage>({
    startDate: null,
    endDate: null,
  });

  const state = useSelector((state: RootState) => state.hotel)
  const dispatch = useDispatch();
  const { callApiSearch, onChangeInputValue, getListHotel, onChangeDate } = bindActionCreators(actionCreators, dispatch)

  const defaultDateRange = {
    startDate: moment(),
    endDate: moment().add(1, "days"),
  };
  
  useEffect(() => {
      setDateRangeValue(defaultDateRange)
  }, [])

  const handleListHotel = () => {
    console.log('locationinputvalue: ', locationInputValue.length)
    console.log('locationinputvalueType: ', typeof(locationInputValue))
    if(locationInputValue.length === 0) {
      setShowAlert(true)
    }
    else {
      let slug = JSON.parse(localStorage.getItem('hotelSlug') || '')
      if (slug == null) {
        history.push({
          pathname: '/hotel/list',
        })
      }
      else {
        let data = {
          adult: state.adult,
          children: state.children,
          room: state.room,
          date: state.dateString.startDate,
          duration: state.dateDuration
        }
        getListHotel(data, slug)
        return Axios.get(`https://api.caritempat.id/user` + `/guest/hotel/availability/${slug}`, {
            params: data
        })
        .then((res: any) => {
          let data = res.data.data
          history.push({
            pathname: `/hotels/${data.id}`,
            state: {
              dateRangeValue: JSON.stringify(dateRangeValue),
              slug: slug
            }
          })
        })
        .catch((err:any) => {
            throw(err)
        });
      }
    }
  }

  useEffect(() => {
    setLocationInputValue(state.inputValue)
  }, [state.inputValue]);

  const changeHandler = (e: string) => {
    if(e.length > 2) {
      setLocationInputValue(e)
      onChangeInputValue(e)
      callApiSearch(e)
    }
  };

  useEffect(() => {
    if(localStorage.hotelSearchValue) {
      setLocationInputValue(JSON.parse(localStorage.getItem('hotelSearchValue') || ''))
    }
  }, [])

  const debouncedChangeHandler = useCallback(
    debounce(changeHandler, 500)
  , []);

    return (
      <>
        <div className="w-full relative mt-8 flex flex-col md:flex-row  rounded-3xl lg:rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700 md:divide-y-0">
          <LocationSearch
            defaultValue={locationInputValue}
            onChange={debouncedChangeHandler}
            onInputDone={() => setDateFocused("startDate")}
          />
          <DateRange
            defaultValue={dateRangeValue}
            defaultFocus={dateFocused}
            onChange={(data) => {
              setDateRangeValue(data)
              onChangeDate(data)
            }}
          />
          <GuestDetail
            defaultValue={guestValue}
            onChange={(data) => setGuestValue(data)}
          />
          <div className="px-4 py-4 lg:py-0 flex items-center justify-center">
            <ButtonSubmit 
              onClick={handleListHotel}
            />
          </div>
        </div>
        <div className={showAlert ? 'alert-wrapper' : 'alert-wrapper-inactive'}>
          <div id="alert-2" className="alert flex p-4 mb-4 bg-red-100 rounded-lg dark:bg-red-200" role="alert">
            <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-red-700 dark:text-red-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
            <span className="sr-only">Info</span>
            <div className="ml-3 text-sm font-medium text-red-700 dark:text-red-800">
              Pilih lokasi yang anda inginkan terlebih dahulu...
            </div>
            <button onClick={()=>setShowAlert(false)} type="button" className="ml-auto -mx-1.5 -my-1.5 bg-red-100 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300" data-dismiss-target="#alert-2" aria-label="Close">
              <span className="sr-only">Close</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
          </div>
        </div>
      </>
    );
};

export default HotelSearchBox;
