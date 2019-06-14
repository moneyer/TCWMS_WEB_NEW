import Global from '@/assets/js/global.js'
import Vue from 'vue'

import { Table, TableColumn, Button, Message, Loading } from 'element-ui'

Vue.use(Table)
  .use(TableColumn)
  .use(Button)
  .use(Loading.directive)

export const AppStart = () => {
  setPrototype()
}

// 设置Vue.prototype
function setPrototype() {
  Vue.prototype.$global = Global
  Vue.prototype.$message = Message
  // Vue.prototype.$loading = Loading.service
}
