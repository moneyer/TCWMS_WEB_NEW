import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router/index'
import Vuex from 'vuex'
import store from './store/index'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(VueAxios, axios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 初始化状态存储信息
Vue.prototype.initStoreLoginInfo = function (loginData, objStore) {
  // DTO赋值
  // 员工ID
  objStore.$store.commit('setOpId', loginData.Opid)
  // 员工工号
  objStore.$store.commit('setOpCd', loginData.Opcd)
  // 员工姓名
  objStore.$store.commit('setOpName', loginData.Opname)
  // 所属配中
  objStore.$store.commit('setDcId', loginData.Dcid)
  // 配中代码
  objStore.$store.commit('setDcCd', loginData.Dccd)
  // 配中名称
  objStore.$store.commit('setDcName', loginData.Dcname)
  // 仓库ID
  objStore.$store.commit('setWhId', loginData.Dcid + '0001')// response.data.Whid)
  // 仓库CD
  objStore.$store.commit('setWhCd', loginData.Whcd)
  // 仓库名称
  objStore.$store.commit('setWhName', loginData.Whname)
  /* if(loginData.Dcid=='00007876'){
      // WS地址
      objStore.$store.commit('setWMSSERVERSYS', 'http://218.72.252.14:20992/TCWMS_Serv_SYS.svc/')
      // WS地址
      objStore.$store.commit('setWMSSERVERPICK', 'http://218.72.252.14:20992/TCWMS_Serv_PICK.svc/')
  }else{
      // WS地址
      objStore.$store.commit('setWMSSERVERSYS', 'http://192.168.0.22:20992/TCWMS_Serv_SYS.svc/')
      // WS地址
      objStore.$store.commit('setWMSSERVERPICK', 'http://192.168.0.22:20992/TCWMS_Serv_PICK.svc/')
  } */
}

// 获取服务字符串
Vue.prototype.getServerPath = function (objStore, serverType, serverName) {
  return location.protocol + '//localhost:4441/' +
    // location.hostname + ':' +
    // objStore.state.serv_port + '/' +
    serverType + '/' +
    serverName
}
