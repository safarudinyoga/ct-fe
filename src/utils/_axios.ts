import axios from "axios";

export const _axios = axios.create({ baseURL: "https://api.caritempat.id" })

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