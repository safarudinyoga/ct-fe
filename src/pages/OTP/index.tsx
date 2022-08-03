import TextError from "components/TextError";
import React, { FC, useEffect, useState } from "react";
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from 'state/action-creators/otp'
import { RootState } from 'state/reducers';
import './otp.sass'

export interface OTPProps {
  className?: string;
}

const OTP: FC<OTPProps> = ({ className = "" }) => {
  const dispatch = useDispatch();
  const { postOTP } = bindActionCreators(actionCreators, dispatch)
  const state = useSelector((state: RootState) => state.authOTP)

  const [otp, setOtp] = useState<any>('')

  const handleChange = (otp: any) => setOtp(otp);

  useEffect(() => {
    if (otp.length === 6) {
      postOTP({otp})
    }
  }, [otp])

  return (
    <div className={`nc-OTP ${className} OTP_page`} data-nc-id="OTP">
      <div className="container mb-24 lg:mb-32 flex flex-col items-center">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Signup OTP
        </h2>
        <h5 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
          Masukkan 6 digit kode yang kami kirim ke +62817236123123.
        </h5>
        <div className="wrapper flex flex-col items-center">
          <OtpInput
            value={otp}
            onChange={handleChange}
            numInputs={6}
            className='otp_input'
            isDisabled={state.isLoading}
          />
          {state.isError && <TextError>Masukkan kode yang kami kirim.</TextError>}
        </div>
        {/* <h5 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
          Butuh kode baru? <span className="resend_code">KIRIM KODE BARU</span>
        </h5> */}
      </div>
    </div>
  );
};

export default OTP;
