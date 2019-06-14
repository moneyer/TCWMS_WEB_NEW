/**
* Created by  on 2019/6/5.
*/
<template>
  <div
    class="module-wrapper"
    v-on:click="jumpToPath(module.jumpUrl,module.jumpBcd)">
    <tc-icon :icon="module.icon"></tc-icon>
    <div class="module-text">{{ module.moduleText }}</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import TcIcon from '../../components/icon/icon'
    // 组件名
    const COMPONENT_NAME = 'tc-module'

    export default {
      name: COMPONENT_NAME,
      props: {
        module: Object
      },
      data() {
          return {
          }
      },
      components: {
        TcIcon
      },
      computed: {},
      methods: {
        jumpToPath(pathName, bcd) {
          const _this = this
          let pathInfo = { path: pathName, query: { 'bcd': bcd } }
          _this.$router.push(pathInfo)
        }
      }
    }
</script>

<style scoped lang="stylus" type="text/stylus">
  @import "../../assets/stylus/variable.styl"
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
