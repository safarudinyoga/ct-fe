import React, { FC, useRef, useEffect } from "react";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Link } from "react-router-dom";
import { TextError } from "shared/TextError";
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from 'state/action-creators/register'
import Main from "page-components/Main";
export interface PageSignUpProps {
  className?: string;
}

const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {
  const dispatch = useDispatch();

  const ref = useRef<any>(null)
  const { postRegister } = bindActionCreators(actionCreators, dispatch)

  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Password is Required!'),
      phone: Yup.string().required('Password is Required!'),
      email: Yup.string().email('Invalid email format').required('Email is Required!'),
      password: Yup.string().required('Password is Required!'),
    }),
    onSubmit: (val) => {
      console.log(val);

      const payload = {
        ...val,
        action_url: "http://app_user"
      }

      postRegister(payload)
    }
  })

  const googleResponse = (response: GoogleLoginResponse) => {
    console.log(response);
  }

  return (
    <Main>
      <div className={`nc-PageSignUp  ${className}`} data-nc-id="PageSignUp">
        <Helmet>
          <title>Sign up || Booking React Template</title>
        </Helmet>
        <div className="container mb-24 lg:mb-32">
          <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
            Signup
          </h2>
          <div className="max-w-md mx-auto space-y-6 ">
            <div className="grid gap-3">
              <div
                className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px] cursor-pointer"
                onClick={() => ref.current.querySelector('button').click()}
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
              <div ref={ref}>
                <GoogleLogin
                  clientId="617246850621-95f9qhmehd380g2df86pjhrqc84n8nij.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={(response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
                    googleResponse(response as GoogleLoginResponse)
                  }}
                  onFailure={googleResponse}
                  cookiePolicy={'single_host_origin'}
                  className='hidden'
                />
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
                  Name
                </span>
                <Input
                  name="name"
                  id="name"
                  type="name"
                  value={values.name}
                  placeholder="John Doe"
                  onChange={handleChange}
                  className={errors.name && touched.name ? 'is-invalid mt-1' : 'mt-1'}
                />
                {errors.name && touched.name &&
                  <TextError>{errors.name}</TextError>
                }
              </label>
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Phone Number
                </span>
                <Input
                  name="phone"
                  id="phone"
                  type="phone"
                  value={values.phone}
                  placeholder="08************"
                  onChange={handleChange}
                  className={errors.phone && touched.phone ? 'is-invalid mt-1' : 'mt-1'}
                />
                {errors.phone && touched.phone &&
                  <TextError>{errors.phone}</TextError>
                }
              </label>
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
              Already have an account? {` `}
              <Link to="/login">Sign in</Link>
            </span>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default PageSignUp;
