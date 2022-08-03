import TextError from "components/TextError";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from 'state/action-creators/forgotpassword'
import { RootState } from 'state/reducers';
// import './forgotpassword.sass'
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Main from "page-components/Main";

export interface ResetPasswordProps {
  className?: string;
}

const ResetPassword: FC<ResetPasswordProps> = ({ className = "" }) => {
  // const dispatch = useDispatch();
  // const state = useSelector((state: RootState) => state.authOTP)

  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      newPassword: Yup.string().required(),
      confirmPassword: Yup.string().required(),
    }),
    onSubmit: (val) => {
    }
  })

  return (
    <Main>
      <div className={`nc-OTP ${className} OTP_page`} data-nc-id="OTP">
        <div className="container mb-24 lg:mb-32 flex flex-col items-center">
          <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
            Forgot Password
          </h2>
          <h5 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
            Membuat kata sandi baru.
          </h5>
          <div className="wrapper flex flex-col items-center">
            <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Kata Sandi Baru
                </span>
                <Input
                  name="newPassword"
                  id="newPassword"
                  type="password"
                  value={values.newPassword}
                  placeholder="*******"
                  onChange={handleChange}
                  className={errors.newPassword && touched.newPassword ? 'is-invalid mt-1' : 'mt-1'}
                />
                {errors.newPassword && touched.newPassword &&
                  <TextError>{errors.newPassword}</TextError>
                }
              </label>
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Konfirmasi Kata Sandi Baru
                </span>
                <Input
                  name="confirmPassword"
                  id="confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  placeholder="*******"
                  onChange={handleChange}
                  className={errors.confirmPassword && touched.confirmPassword ? 'is-invalid mt-1' : 'mt-1'}
                />
                {errors.confirmPassword && touched.confirmPassword &&
                  <TextError>{errors.confirmPassword}</TextError>
                }
              </label>
              <ButtonPrimary type="submit">Continue</ButtonPrimary>
            </form>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default ResetPassword;
