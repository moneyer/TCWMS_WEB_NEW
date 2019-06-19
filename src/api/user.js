import TCHttp from 'http/http-client'

// export function userLogin({ sOpCd, sPwd }) {
//   const url = '/TCWMS_Serv_SYS.svc/handleLogin'
//   return TCHttp.post(url, {
//     sOpCd, sPwd
//   })
// }

export function userLogin({ userName, password }) {
  const url = '/api/user/login'
  return TCHttp.post(url, {
    userName, password
  })
}
