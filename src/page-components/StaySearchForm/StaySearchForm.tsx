import React, { useEffect, useState } from "react";
import LocationInput from "page-components/LocationInput/LocationInput";
import GuestsInput, { GuestsInputProps } from "page-components/GuestsInput/GuestsInput";
import { FocusedInputShape } from "react-dates";
import StayDatesRangeInput from "../../components/HeroSearchForm/StayDatesRangeInput";
import ButtonSubmit from "page-components/ButtonSubmit/ButtonSubmit";
import moment from "moment";
import { FC } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from 'state';
import { RootState } from 'state/reducers';
export interface DateRage {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
}
export interface StaySearchFormProps {
  haveDefaultValue?: boolean;
  currentPage?: "Pesawat" | "Hotel" | "Villa" | "Mobil" | "Kereta";
}

const defaultDateRange = {
  startDate: moment(),
  endDate: moment().add(4, "days"),
};

const defaultGuestValue: GuestsInputProps["defaultValue"] = {
  guestAdults: 1,
  guestChildren: 0,
  guestInfants: 0,
};

const StaySearchForm: FC<StaySearchFormProps> = ({
  haveDefaultValue = false,
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
  const { callApiSearch, onChangeInputValue, getListHotel } = bindActionCreators(actionCreators, dispatch)

  const handleListHotel = () => {
    let data = {
      adult: state.adult,
      children: state.children,
      room: state.room
    }
    getListHotel(data)
    console.log('hasilListHotel: ', state.dataListHotel)
    console.log('hasilListHotelType: ', typeof(state.dataListHotel))
  }

  useEffect(() => {
    setLocationInputValue(state.inputValue)
  }, [state.inputValue]);

  useEffect(() => {
  }, [state.dataHotel]);

  const renderForm = () => {
    return (
      <form className="w-full relative mt-8 flex flex-col md:flex-row  rounded-3xl lg:rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700 md:divide-y-0">
        <LocationInput
          defaultValue={locationInputValue}
          onChange={(e) => {setLocationInputValue(e); onChangeInputValue(e); callApiSearch(e)}}
          onInputDone={() => setDateFocused("startDate")}
        />
        <StayDatesRangeInput
          defaultValue={dateRangeValue}
          defaultFocus={dateFocused}
          onChange={(data) => setDateRangeValue(data)}
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
