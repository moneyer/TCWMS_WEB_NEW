/**
 * 这里存储平时用到的常量
 * 建议命名格式为XXXConst
 * 不同类别的可以写多个
 */

let baseUrl
// 原 WMS 接口 API MOCK 地址
// baseUrl = 'https://3c030aaf-0d63-4b37-86fd-b224f755c772.mock.pstmn.io'
// 设计 WMS 接口 API MOCK 地址
// baseUrl = 'https://74782739-fd40-4040-a1eb-a7db43d27a76.mock.pstmn.io'
// 本地后台地址
// baseUrl = 'http://localhost:4441/'

// switch ('development') {
//   case 'development':
//     // 原 WMS 接口 API MOCK 地址
//     // baseUrl = 'https://3c030aaf-0d63-4b37-86fd-b224f755c772.mock.pstmn.io'
//     // 设计 WMS 接口 API MOCK 地址
//     // baseUrl = 'https://74782739-fd40-4040-a1eb-a7db43d27a76.mock.pstmn.io'
//     // 本地后台地址
//     // baseUrl = 'http://localhost:4441/'
//     break
//   case 'production':
//     // !!!!危险，请勿修改，生产环境地址
//     baseUrl = 'https://api.lbbcol.com'
//     break
//   case 'test-production':
//     baseUrl = 'http://testapi.lbbcol.com'
//     break
//   default:
//     baseUrl = 'https://api.lbbcol.com'
//     break
// }

export const HttpConst = {
  BASE_URL: baseUrl
}
