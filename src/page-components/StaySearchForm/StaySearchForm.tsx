import React, { useEffect, useState, useCallback } from "react";
import LocationInput from "page-components/LocationInput/LocationInput";
import GuestsInput, { GuestsInputProps } from "page-components/GuestsInput/GuestsInput";
import { FocusedInputShape } from "react-dates";
import StayDatesRangeInput from "page-components/StayDatesRangeInput/StayDatesRangeInput";
import ButtonSubmit from "page-components/ButtonSubmit/ButtonSubmit";
import moment from "moment";
import { FC } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from 'state';
import { RootState } from 'state/reducers';
import Axios from 'axios';
import { useHistory } from "react-router-dom";
var debounce = require('lodash.debounce');
export interface DateRage {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
}
export interface StaySearchFormProps {
  // haveDefaultValue?: boolean;
  currentPage?: "Pesawat" | "Hotel" | "Villa" | "Mobil" | "Kereta";
}

const StaySearchForm: FC<StaySearchFormProps> = ({
  currentPage
}) => {
  const history = useHistory()
  const [locationInputValue, setLocationInputValue] = useState("");
  const [guestValue, setGuestValue] = useState({});
  const [dateFocused, setDateFocused] = useState<FocusedInputShape | null>(null);
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
    if(locationInputValue == "") {
      alert('Pilih Lokasi')
    }
    else {
      if (state.slug == '') {
        alert('tampilkan list')
      }
      else {
        let data = {
          adult: state.adult,
          children: state.children,
          room: state.room
        }
        getListHotel(data, state.slug)
        return Axios.get(`https://api.caritempat.id/user` + `/guest/hotel/availability/${state.slug}`, {
            params: data
        })
        .then((res: any) => {
          let data = res.data.data
          let params = {
            id: data.id,
            name: data.name,
            address: data.address,
            description: data.description,
            facilities: data.facilities,
            stars: data.stars,
            slug: data.slug,
          }
          history.push({
            pathname: '/listing-hotel-detail',
            state: params
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

  useEffect(() => {
  }, [state.dataHotel]);

  const changeHandler = (e: string) => {
      setLocationInputValue(e)
      onChangeInputValue(e)
      callApiSearch(e)
  };

  const debouncedChangeHandler = useCallback(
    debounce(changeHandler, 500)
  , []);

  const renderForm = () => {
    return (
      <>
      <div className="w-full relative mt-8 flex flex-col md:flex-row  rounded-3xl lg:rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700 md:divide-y-0">
        <LocationInput
          defaultValue={locationInputValue}
          onChange={debouncedChangeHandler}
          onInputDone={() => setDateFocused("startDate")}
        />
        <StayDatesRangeInput
          defaultValue={dateRangeValue}
          defaultFocus={dateFocused}
          onChange={(data) => {
            setDateRangeValue(data)
            onChangeDate(data)
          }}

        />
        <GuestsInput
          defaultValue={guestValue}
          onChange={(data) => setGuestValue(data)}
        />
        <div className="px-4 py-4 lg:py-0 flex items-center justify-center">
          <ButtonSubmit 
            onClick={handleListHotel}
          />
        </div>
      </div>
      {/* <button onClick={handleListHotel}>tes</button> */}
      </>
    );
  };

  return renderForm();
};

export default StaySearchForm;
