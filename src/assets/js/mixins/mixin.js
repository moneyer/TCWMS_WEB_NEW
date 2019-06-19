/**
 * 混淆
 */

/**
 * 主混淆
 */
export const mainMixin = {
  mounted () {
    // if (!tcStarter.getPageRenderComplete()) { // 设置页面初始化标识
    //   tcStarter.setPageRenderComplete(true)
    // }
  },
  methods: {
    $_routerPush (url) {
      this.$router.push(url)
    },
    $_routerReplace (url) {
      this.$router.replace(url)
    },
    $_routerBack () {
      this.$router.go(-1)
    },
    $_routeReturnPath () {
      this.$_routerReplace(this.$route.query.returnPath)
    },
    $_commit (type, payload) {
      if (this.$store) {
        return this.$store && this.$store.commit(type, payload)
      }
    },
    $_dispatch (type, payload) {
      if (this.$store) {
        return this.$store.dispatch(type, payload)
      }
    },
    /**
     * 自定义的类似nexttick的作用，比nexttick更可靠一点
     * @param func
     * @param delay
     */
    $_customNextTick (func, delay) {
      setTimeout(func, delay || 60)
    }
  }
}

export const messageMixin = {
  methods: {
    $_showTips(message) {
      this.$message({
        message: message,
        duration: 2000,
        center: true,
        offset: 420,
        type: 'info'
      })
    },
    $_showErrorTips(message) {
      this.$message({
        message: message,
        duration: 2000,
        center: true,
        offset: 420,
        type: 'error'
      })
    },
    $_showSuccessTips(message) {
      this.$message({
        message: message,
        duration: 2000,
        center: true,
        offset: 420,
        type: 'success'
      })
    },
    $_showWarningTips(message) {
      this.$message({
        message: message,
        duration: 2000,
        center: true,
        offset: 420,
        type: 'warning'
      })
    }
  }
}
