/**
 * 以下是返回结果的统一处理的建议流程，需要后端的配合.
 * 这只是一个参照，可以按照自己的项目定制
 */
import { Message } from 'element-ui'
import ErrorCode from './error-code'

// 请求设计接口

// export default function(res) {
//   // 判断code是否存在不存在直接抛错
//   if (!res.data.code) {
//     Message.error('服务器出错！')
//     return Promise.reject({ ErrorCode: ErrorCode.REQUEST_EXCEPTION })
//   }
//
//   let data = res.data.data
//   let errorCode = res.data.code
//   let errorMsg = res.data.message
//
//   if (errorCode === ErrorCode.SUCCESS) {
//     // 成功，将实际结果返回给业务方
//     return data
//   } else {
//     // 失败，api错误 和 业务错误分开处理
//     if (errorCode.length === 5 && errorCode.indexOf('2') === 0) {
//       // 长度为5，并且2开头 就是为需处理的业务错误
//       switch (errorCode) {
//         // 处理未登陆的情况
//         case ErrorCode.REQUEST_NO_LOGIN:
//           setTimeout(() => {
//             handleNoLogin()
//           }, 100)
//           return Promise.reject(res.data)
//         default:
//       }
//       return Promise.reject(res.data)
//     } else {
//       Message.error(errorMsg)
//     }
//     return Promise.reject(res.data)
//   }
// }

// 请求原接口

export default function(res) {
  // 判断code是否存在不存在直接抛错
  // if (!res.data.code) {
  //   Message.error('服务器出错！')
  //   return Promise.reject({ ErrorCode: ErrorCode.REQUEST_EXCEPTION })
  // }

  let data = res.data
  // let data = res.data.data
  // let errorCode = res.data.code
  // let errorMsg = res.data.message

  // if (errorCode === ErrorCode.SUCCESS) {
  if (true) {
    // 成功，将实际结果返回给业务方
    return data
  }
  // else {
  //   // 失败，api错误 和 业务错误分开处理
  //   if (errorCode.length === 5 && errorCode.indexOf('2') === 0) {
  //     // 长度为5，并且2开头 就是为需处理的业务错误
  //     switch (errorCode) {
  //       // 处理未登陆的情况
  //       case ErrorCode.REQUEST_NO_LOGIN:
  //         setTimeout(() => {
  //           handleNoLogin()
  //         }, 100)
  //         return Promise.reject(res.data)
  //       default:
  //     }
  //     return Promise.reject(res.data)
  //   } else {
  //     Message.error(errorMsg)
  //   }
  //   return Promise.reject(res.data)
  // }
}

const handleRepeatCommit = () => {
  window.location.reload()
}

/**
 * 处理需要登录的情况
 */
const handleNoLogin = () => {
  location.replace('/login')
  // let currentUrl = window.location.href
  // // 增加一个随机参数，触发返回页的数据刷新
  // if (currentUrl.indexOf('?') < 0) {
  //   currentUrl = currentUrl + '?'
  // } else {
  //   currentUrl = currentUrl + '&'
  // }
  // currentUrl = `${currentUrl}timestamp=${new Date().valueOf()}`
  // location.replace(
  //   '/index.html#/login?returnUrl=' + encodeURIComponent(currentUrl)
  // )
}

/**
 * 处理收货地址未选择的问题
 */
const handleNoChooseShipShop = () => {
  location.href = '/index.html#/user/ship-shop/choose-city'
}
