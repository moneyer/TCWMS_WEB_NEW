<template>
  <div
    id="divMenu"
    class="container">
<!--    <div class="col1 clearfix">-->
    <div class="menu-wrapper">
      <div
        v-for="moduleItem in moduleList"
        :key="moduleItem.moduleId">
        <tc-module :module="moduleItem"/>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import TcModule from '../../components/module/module'

  export default {
    data() {
      return {
        moduleList: [
          { moduleId: 1, icon: 'iconPicking', jumpUrl: '/zero-pick', jumpBcd: 'CLP', moduleText: '零工位拣货' },
          { moduleId: 2, icon: 'iconPicking', jumpUrl: '/zero-pick', jumpBcd: 'CZP', moduleText: '拆零整件拣货' },
          { moduleId: 3, icon: 'iconPicking', jumpUrl: '/zero-pick', jumpBcd: 'ZJP', moduleText: '整件拣货' },
          { moduleId: 4, icon: 'iconPicking', jumpUrl: '/zero-pick', jumpBcd: 'ECP', moduleText: '电商拣货' },
          { moduleId: 5, icon: 'iconRectangleCopy', jumpUrl: '/supply/replenishment', jumpBcd: 'CRD', moduleText: '拆零补货' },
          { moduleId: 6, icon: 'iconRectangleCopy', jumpUrl: '/supply/replenishment', jumpBcd: 'ZRD', moduleText: '整件补货' },
          { moduleId: 7, icon: 'iconRectangleCopy', jumpUrl: '/supply/replenishment', jumpBcd: 'SRD', moduleText: '拆零暂存补货' },
          { moduleId: 8, icon: 'iconTransfer', jumpUrl: '/delipick', jumpBcd: 'DBP', moduleText: '调拨上架' },
          { moduleId: 9, icon: 'iconTransfer', jumpUrl: '/collection', jumpBcd: 'DB', moduleText: '调拨集货' },
          { moduleId: 10, icon: 'iconTransfer', jumpUrl: '/delipick', jumpBcd: 'CDP', moduleText: '仓间调拨' },
          { moduleId: 11, icon: 'iconBox', jumpUrl: '/sowbox', jumpBcd: '', moduleText: '播物流箱' },
          { moduleId: 12, icon: 'iconPickingList', jumpUrl: '/jhcheck', jumpBcd: 'CZP', moduleText: '集货复查' },
          { moduleId: 13, icon: 'iconPickingList', jumpUrl: '/jhcheck', jumpBcd: 'XD', moduleText: '新店集货' },
          { moduleId: 14, icon: 'iconExit', jumpUrl: '/login', jumpBcd: 'ECP', moduleText: '退出' }
        ]
      }
    },
    components: {
      TcModule
    },
    computed: {
      opid() {
        return this.$store.state.Opname
      }
    }
  }
  document.title = '菜单-同驰WMS系统'
</script>

<style scoped lang="stylus" type="text/stylus">
  @import "../../assets/stylus/variable.styl"
  @import "../../assets/css/icon-styles.css"
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
