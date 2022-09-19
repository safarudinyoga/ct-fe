import axios from "axios";
import { SITE_COOKIES, COOKIES } from "./cookies";

const authUrl = '/auth'
const userUrl = '/user'
const adminUrl = '/admin'
const paymentUrl = '/payment'
const orderUrl = '/order'
const transportUrl = '/transport'

const _axios = axios.create({ baseURL: "https://api.caritempat.id" })

const defaultConfig = (contentType?: string) => ({
  headers: {
    'Content-Type': contentType || 'application/json',
    Authorization: `Bearer ${COOKIES.get(SITE_COOKIES.ACCESSTOKEN)}`,
  },
})

export {
  _axios,
  authUrl,
  userUrl,
  adminUrl,
  paymentUrl,
  orderUrl,
  transportUrl,
  defaultConfig
}

// _axios.interceptors.request.use(
//   (config) => {
//     const access_token = COOKIES.get(SITE_COOKIES.ACCESSTOKEN)

//     if (access_token) {
//       config.headers["Authorization"] = `Bearer ${access_token}`;
//     }

//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )