import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
Vue.use(Router)

const router = new Router({
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // 设置页面标题
  setDocumentTitle(to)
  next()
})

const setDocumentTitle = (to) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
}

export default router
