/**
 * Created by zhengyangchen on 2018/7/24.
 */
import tcHttp from '@/assets/js/http/http-client'

/**
 * 这里书写具体发起请求的代码
 * @param params
 * @returns {*}
 */
export const requestDemo = (params = {}) => {
  const url = 'getRemindPHRep'
  return tcHttp.post(url, params)
}
export const requestDemo2 = (params = {}) => {
  const url = '/api/Home/GetUserStatusInfo'
  return tcHttp.get(url, params, {
    showLoading: false, // 需要关闭此次请求的loading只需将showLoading至为false
    timeout: 5 * 1000 // 设置自定义的超时时间，只对本次请求有效，下次请求将会恢复默认值
  })
}
