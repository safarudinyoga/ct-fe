import React, { useEffect, useState } from "react";
import LocationInput from "page-components/LocationInput/LocationInput";
import GuestsInput, { GuestsInputProps } from "../../components/HeroSearchForm/GuestsInput";
import { FocusedInputShape } from "react-dates";
import StayDatesRangeInput from "../../components/HeroSearchForm/StayDatesRangeInput";
import ButtonSubmit from "../../components/HeroSearchForm/ButtonSubmit";
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

// DEFAULT DATA FOR ARCHIVE PAGE
const defaultLocationValue = "Jakarta, Indonesia";
const defaultDateRange = {
  startDate: moment(),
  endDate: moment().add(4, "days"),
};
const defaultGuestValue: GuestsInputProps["defaultValue"] = {
  guestAdults: 2,
  guestChildren: 2,
  guestInfants: 1,
};

const StaySearchForm: FC<StaySearchFormProps> = ({
  haveDefaultValue = false,
  currentPage
}) => {
  const [dateRangeValue, setDateRangeValue] = useState<DateRage>({
    startDate: null,
    endDate: null,
  });
  const [locationInputValue, setLocationInputValue] = useState("");
  const [guestValue, setGuestValue] = useState({});

  const [dateFocused, setDateFocused] = useState<FocusedInputShape | null>(
    null
  );

  //
  useEffect(() => {
    if (haveDefaultValue) {
      setDateRangeValue(defaultDateRange);
      setLocationInputValue(defaultLocationValue);
      setGuestValue(defaultGuestValue);
    }
  }, []);
  //

  const state = useSelector((state: RootState) => state.hotel)
  const dispatch = useDispatch();

  const { callApiSearch } = bindActionCreators(actionCreators, dispatch)

  useEffect(() => {
    callApiSearch('l')
  }, [])

  const renderForm = () => {
    return (
      <form className="w-full relative mt-8 flex flex-col md:flex-row  rounded-3xl lg:rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700 md:divide-y-0">
        <LocationInput
          defaultValue={locationInputValue}
          onChange={(e) => setLocationInputValue(e)}
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
        {/* BUTTON SUBMIT OF FORM */}
        <div className="px-4 py-4 lg:py-0 flex items-center justify-center">
          <ButtonSubmit />
        </div>
      </form>
    );
  };

  return renderForm();
};

export default StaySearchForm;
