import * as types from './mutation-types'

const mutations = {
  // 设置员工ID
  setOpId(state, opid) {
    state.Opid = opid
  },
  // 设置员工CD
  setOpCd(state, opcd) {
    state.Opcd = opcd
  },
  // 设置员工姓名
  setOpName(state, opname) {
    state.Opname = opname
  },
  // 设置配中ID
  setDcId(state, dcid) {
    state.Dcid = dcid
  },
  // 设置配中代码
  setDcCd(state, dccd) {
    state.Dccd = dccd
  },
  // 设置配中名称
  setDcName(state, dcname) {
    state.Dcname = dcname
  },
  // 设置仓库ID
  setWhId(state, whid) {
    state.Whid = whid
  },
  // 设置仓库代码
  setWhCd(state, whcd) {
    state.Whcd = whcd
  },
  // 设置仓库名称
  setWhName(state, whname) {
    state.Whname = whname
  },
  // 设置wmsSYS服务地址
  setWMSSERVERSYS(state, wssys) {
    state.wms_serv = wssys
  },
  // 设置wmsPICK服务地址
  setWMSSERVERPICK(state, wspick) {
    state.wms_serv_pick = wspick
  }
  // 示例 正式请删除
  // [types.GET_CART_LIST](state, list) {
  //   state.cartList.forEach(tabItem => { // 保持原有的数据
  //     list.splice(list.findIndex(item => item.splitType === tabItem.splitType), 1, tabItem)
  //   })
  //   if (list.length === 2) {
  //     let sortList = []
  //     if (list[0].splitType > list[1].splitType) {
  //       sortList.push(...[list[1], list[0]])
  //       list = sortList
  //     }
  //   }
  //   state.cartList = list
  // }
}

export default mutations
