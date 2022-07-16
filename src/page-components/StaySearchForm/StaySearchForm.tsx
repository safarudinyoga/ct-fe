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
    let data = {
      adult: state.adult,
      children: state.children,
      room: state.room
    }
    getListHotel(data, state.slug)
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
      <form className="w-full relative mt-8 flex flex-col md:flex-row  rounded-3xl lg:rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700 md:divide-y-0">
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
      </form>
    );
  };

  return renderForm();
};

export default StaySearchForm;
