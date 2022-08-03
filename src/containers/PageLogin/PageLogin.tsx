import React, { FC, useEffect } from "react";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import { Link } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { TextError } from "shared/TextError";
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from 'state/action-creators/login'
import { RootState } from 'state/reducers';
import { signInWithGoogle, auth } from '../../services/firebase';
export interface PageLoginProps {
  className?: string;
}

const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {
  const dispatch = useDispatch();
  const { postLogin } = bindActionCreators(actionCreators, dispatch)
  const state = useSelector((state: RootState) => state.authLogin)

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      console.log(user);
    })
  }, [])

  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email format').required('Email is Required!'),
      password: Yup.string().required('Password is Required!')
    }),
    onSubmit: (val) => {

      postLogin(val)
    }
  })

  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
        <title>Login || Booking React Template</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Login
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <div className="grid gap-3">
            <div
              className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px] cursor-pointer"
              onClick={signInWithGoogle}
            >
              <img
                className="flex-shrink-0"
                src={googleSvg}
                alt='Continue with Google'
              />
              <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                Continue with Google
              </h3>
            </div>
          </div>
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          {/* FORM */}
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
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
                <Link to="/forgot-password" className="text-sm">
                  Forgot password?
                </Link>
              </span>
              <Input
                name="password"
                id="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                className={errors.password && touched.password ? 'is-invalid mt-1' : 'mt-1'}
              />
              {errors.password && touched.password &&
                <TextError>{errors.password}</TextError>
              }
            </label>
            <ButtonPrimary type="submit">Continue</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user? {` `}
            <Link to="/signup">Create an account</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;