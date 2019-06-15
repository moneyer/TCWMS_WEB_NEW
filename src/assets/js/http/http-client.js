/**
 * Created by zhengyangchen on 2018/1/5.
 */
import create from 'tc-http'
import requestInterceptor from './request-interceptor'
import responseInterceptor from './response-interceptor'
import { Message, Loading } from 'element-ui'
let loadingInstance

const tcHttp = create({
  showToast(...   args) {
    Message(...args)
  },
  showLoading() {
    loadingInstance = Loading.service()
  },
  closeLoading() {
    loadingInstance.close()
  },
  requestInterceptor: requestInterceptor,
  responseInterceptor: responseInterceptor
})

export default tcHttp
