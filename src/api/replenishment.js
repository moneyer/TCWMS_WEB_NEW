import TCHttp from '../assets/js/http/http-client'

/**
 * 完成补货任务
 * @param sType 操作类型
 * @param sBillNo 单据号
 * @param sSeq
 * @param sFactBigNum
 * @param sOpId
 * @returns {*}
 */
export function doFinishReplenish({ sType, sBillNo, sSeq, sFactBigNum, sOpId }) {
  const url = '/TCWMS_Serv_PICK.svc/DoFinishReplenish'
  return TCHttp.post(url, {
    sType, sBillNo, sSeq, sFactBigNum, sOpId
  })
}

/**
 * 获取补货任务
 * @param sType 补货类型
 * @param sBillNo 单据号
 * @param sBcd 业务代码
 * @param sOpId 操作人ID
 * @returns {*}
 */
export function getReplenishmentData({ sType, sBillNo, sBcd, sOpId }) {
  const url = '/TCWMS_Serv_PICK.svc/GetReplenishmentData'
  return TCHttp.post(url, {
    sType, sBillNo, sBcd, sOpId
  })
}

/**
 * 生效补货单
 * @param sBillNo 单据号
 * @param sOpId 操作人
 * @returns {*}
 */
export function doCheckReplenishBill({ sBillNo, sOpId }) {
  const url = '/TCWMS_Serv_PICK.svc/GetReplenishmentData'
  return TCHttp.post(url, {
    sBillNo, sOpId
  })
}

/**
 * 获取补货任务数量
 * @param sBcd 业务代码
 * @returns {*}
 */
export function getReplenishTaskNum({ sBcd }) {
  const url = '/TCWMS_Serv_PICK.svc/GetReplenishTaskNum'
  return TCHttp.post(url, {
    sBcd
  })
}

/**
 * 获取补货记录
 * @param sBillNo 单据号
 * @returns {*}
 */
export function getReplenishRecord({ sBillNo }) {
  const url = '/TCWMS_Serv_PICK.svc/GetReplenishRecord'
  return TCHttp.post(url, {
    sBillNo
  })
}
