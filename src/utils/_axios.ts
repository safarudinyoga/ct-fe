import axios from "axios";

const authUrl = '/auth'
const userUrl = '/user'
const adminUrl = '/admin'
const paymentUrl = '/payment'
const orderUrl = '/order'

const _axios = axios.create({ baseURL: "https://api.caritempat.id" })

export {
  _axios,
  authUrl,
  userUrl,
  adminUrl,
  paymentUrl,
  orderUrl
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