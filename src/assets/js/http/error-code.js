/**
 * Created by zhengyangchen on 2018/1/20.
 * 错误代码
 */

const ErrorCode = {
  SUCCESS: '0',
  INTERNAL_SERVER_ERROR: '500',
  REQUEST_HEADER_INVALID_PARAMETERS: '1001',
  REQUEST_TIME_EXPIRED: '1002',
  REQUEST_SIGNATURE_INFO_ERROR: '1003',
  REQUEST_USER_TOKEN_ERROR: '1004',
  REQUEST_TOKEN_NULL: '1005',
  REQUEST_EXCEPTION: '9999',
  REQUEST_NO_LOGIN: '20002',
  REQUEST_NO_CHOOSE_SHIP_SHOP: '20003',
  REQUEST_REPEAT_COMMIT: '20007'
}

export default ErrorCode
