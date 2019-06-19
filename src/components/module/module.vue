/**
* Created by  on 2019/6/5.
*/
<template>
  <div
    class="module-wrapper"
    @click="jumpToPath()"
  >
    <tc-icon :icon="module.icon" />
    <div class="module-text">
      {{ module.moduleText }}
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import TcIcon from 'base/icon'
  import pageCreate from 'utils/page-creat'
  // 组件名
  const COMPONENT_NAME = 'menu-module'

  export default pageCreate({
    name: COMPONENT_NAME,
    components: {
      TcIcon
    },
    props: {
      module: Object
    },
    data() {
        return {
        }
    },
    computed: {},
    methods: {
      jumpToPath() {
        let pathInfo = { path: this.module.jumpUrl, query: { 'bcd': this.module.bcd } }
        this.$_routerPush(pathInfo)
      }
    }
  })
</script>

<style scoped lang="stylus" type="text/stylus">
  @import "~stylus/variable.styl"
  .module-wrapper
    width 300px
    height 80px
    display flex
    flex-direction row
    align-items center
    margin $spacing-text
    padding $spacing-page-margin
    primary-text()
    letter-spacing $letter-spacing
    text-align center
    font-weight bolder
    background $color-background-3

  .module-text
    width 220px
    padding 0 $spacing-text
</style>
