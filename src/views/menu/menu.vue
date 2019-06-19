<template>
  <div
    id="divMenu"
    class="container"
  >
    <div class="menu-wrapper">
      <div
        v-for="moduleItem in moduleList"
        :key="moduleItem.moduleId"
      >
        <menu-module :module="moduleItem" />
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getModuleList } from 'api/menu'
  import MenuModule from 'components/module'
  import pageCreate from 'utils/page-creat'

  export default pageCreate({
    data() {
      return {
        moduleList: []
      }
    },
    components: {
      MenuModule
    },
    created() {
      getModuleList(1).then(
        data => {
          this.moduleList = data.moduleList
        })
    },
    computed: {
      opid() {
        return this.$store.state.Opname
      }
    }
  })
</script>

<style scoped lang="stylus" type="text/stylus">
  @import "~stylus/variable.styl"

  .container
    width 100%

  .menu-wrapper
    width 100%
    display flex
    flex-direction row
    flex-wrap wrap
    justify-content center
    padding $spacing-page-margin 0
</style>
