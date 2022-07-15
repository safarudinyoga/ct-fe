export const RESPONSE_STATUS = [200, 201, 202, 203, 204]
export const RESPONSE_STATUS_NOT_AUTHENTICATED = [401, 403]

// interface Error {
//   status?: number;
//   code?: number;
// }

// export const getErrorMessage = (err: Error, defaultMessage: string = 'Terjadi kesalahan') => {
//   let errorMessage = ''

//   if (err instanceof Error) {
//     const { response } = err

//     if (typeof response === 'object') {
//       if (response.hasOwnProperty('data')) {
//         const { message } = response.data
//         errorMessage = message
//       }
//     } else {
//       const { message } = err

//       switch (message) {
//         case 'Network Error':
//           errorMessage = 'Mohon periksa koneksi internet Anda'
//           break
//         default:
//           errorMessage = defaultMessage
//       }
//     }
//   }

//   return errorMessage
// }