import TCHttp from '../assets/js/http/http-client'

/**
 * 获取摘果单数据
 * @param sWhId 仓库ID
 * @param sBcd 业务代码
 * @param sOpCd 员工工号
 * @param sPickBoxCd 拣货箱号
 * @returns {*}
 */
export function getBillInfo({ sWhId, sBcd, sOpCd, sPickBoxCd }) {
  const url = '/TCWMS_Serv_PICK.svc/GetBillData'
  return TCHttp.post(url, {
    sWhId, sBcd, sOpCd, sPickBoxCd
  })
}

/**
 * 单行更新完成处理
 * @param sBillNo 单据号
 * @param sGdsId 商品ID
 * @param sSlId 货位ID
 * @param sNum 应拣数
 * @param sFactNum 实拣数
 * @returns {*}
 */
export function setUnitePickRowDone({ sBillNo, sGdsId, sSlId, sNum, sFactNum }) {
  const url = '/TCWMS_Serv_PICK.svc/SetUnitePickRowDone'
  return TCHttp.post(url, {
    sBillNo, sGdsId, sSlId, sNum, sFactNum
  })
}

// ChargeBoxInPool
// let postData = {
//   "sBoxcd": self.$data.pageStates.curBoxcd,
//   "sWhId": self.$data.pageStates.curWhid
// };

// GetOptionValue
// let postData = {"sOptionId": 'delidifftype'};

// GetAllocCount
// let postData = {};

// GetDeliPickData
// let postData = {
//   "sBcd": self.$data.pageStates.curBillBcd,
//   "sOpId": self.$store.state.Opid,
//   "sType": self.$data.pageStates.upgdsType,
//   "sBoxcds": BoxCds,
//   "sWhid": self.$data.pageStates.curWhid
// };

// DoFinishDeliPick
// let postData = {
//   "sBillNo": row.Billno,
//   "sGdsId": row.Gdsid,
//   "dFactNum": row.Factnum,
//   "sOpId": self.$store.state.Opid,
//   "Iferr": row.Iferr,
//   "sRowstatus": sRowstatus
// };

// DoCheckDeliPickBill
// let postData = {
//   "sBillNo": self.$data.billHead.Billno,
//   "sOpId": self.$store.state.Opid,
// };

// GetAllocData
// let postData = {
//   "sOutCountId": this.pageStates.selOutCount,
//   "sInCountId": this.pageStates.selInCount,
//   "sBillNo": this.pageStates.billno,
//   "sOpId": this.$store.state.Opid,
// };

// SetAllocRowDone
// let postData = {
//   "sBillNo": this.pageStates.billno,
//   "sSeq": row.Seq,
//   "sFactNum": row.FactNum,
//   "sOpId": this.$store.state.Opid,
// };

// CheckAllocCollection
// let postData = {
//   "sPickBillNo": this.pageStates.billno,
//   "sOpId": this.$store.state.Opid,
// };

// showbox
// GetBoardIds
// let postData = {"sOpid": self.$store.state.Opid,
//   "sLoginShopid":self.$store.state.Dcid
// };

// UpdateTempBoardUsed
// let postData ={
//   "lbid":ID,
//   "ifused":'1'
// };

// UpdateTempBoardUsed

// let postData ={
//   "lbid":self.$data.curLbid,
//   "ifused":'0'
// };

// GetTempBoardLoadBin
// let postData = {"lbid":this.$data.curLbid};

// CheckTempBoardAllDone
//                 let postData = {
//                     "lbid":self.$data.curLbid,
//                     "sOpid": self.$store.state.Opid
//                 };

// GetShopToJHCheck
// let postData = {
//   "sOpid": self.$store.state.Opid,
//   "sLoginShopid":self.$store.state.Dcid,
//   "sJhType":self.$data.pageStates.curJhType };
