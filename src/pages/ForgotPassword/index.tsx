import TextError from "components/TextError";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from 'state/action-creators/forgotpassword'
import { RootState } from 'state/reducers';
import './forgotpassword.sass'
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { useFormik } from 'formik'
import * as Yup from 'yup'

export interface ForgotPasswordProps {
  className?: string;
}

const ForgotPassword: FC<ForgotPasswordProps> = ({ className = "" }) => {
  const dispatch = useDispatch();
  const { postForgotPassword } = bindActionCreators(actionCreators, dispatch)
  // const state = useSelector((state: RootState) => state.authOTP)

  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email format').required('Email is Required!'),
    }),
    onSubmit: (val) => {
      postForgotPassword({
        email: val.email,
        action_url: "https://app.caritempat.id"
      })
    }
  })

  return (
    <div className={`nc-OTP ${className} OTP_page`} data-nc-id="OTP">
      <div className="container mb-24 lg:mb-32 flex flex-col items-center">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Forgot Password
        </h2>
        <h5 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
          Tuliskan email untuk membuat kata sandi baru.
        </h5>
        <div className="wrapper flex flex-col items-center">
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                name="email"
                id="email"
                type="email"
                value={values.email}
                placeholder="example@example.com"
                onChange={handleChange}
                className={errors.email && touched.email ? 'is-invalid mt-1' : 'mt-1'}
              />
              {errors.email && touched.email &&
                <TextError>{errors.email}</TextError>
              }
            </label>
            <ButtonPrimary type="submit">Continue</ButtonPrimary>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
