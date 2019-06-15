import { getCookie } from 'hanutil'
import { HttpConst } from '../constant'

let token
/**
 * 发起请求前置拦截器，可以做请求发出前的统一处理。注意的一点是一定要把config return回去
 * @param config
 * @returns {*}
 */
export default function(config) {
  // 原 WMS 接口 API MOCK 地址
  // let _config = { baseURL: 'https://3c030aaf-0d63-4b37-86fd-b224f755c772.mock.pstmn.io' }
  // 设计 WMS 接口 API MOCK 地址
  // let _config = { baseURL: 'https://74782739-fd40-4040-a1eb-a7db43d27a76.mock.pstmn.io' }
  // 本地后台地址
  // let _config = { baseURL: 'http://localhost:4441/' }

  let _config = { baseURL: HttpConst.BASE_URL }
  if (!token) {
    token = getCookie('cookie-token')
  }
  if (token) {
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.Authorization = token
  }
  Object.assign(config, _config)
  return config
}
