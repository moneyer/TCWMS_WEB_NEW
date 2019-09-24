<template>
  <div
    id="divMenu"
    class="container">
    <div class="menu-wrapper">
      <div
        v-for="moduleItem in moduleList"
        :key="moduleItem.moduleId">
        <menu-module :module="moduleItem" />
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import { getModuleList } from 'api/menu'
  import MenuModule from 'components/module'
  import pageCreate from 'utils/page-creat'

  export default pageCreate({
    data() {
      return {
        moduleList: [
          {
            moduleId: 1,
            icon: 'iconPicking',
            backgroundColor: '#04ACAD',
            jumpUrl: '/zero-pick',
            jumpBcd: 'CLP',
            moduleText: '零工位拣货'
          },
          {
            moduleId: 2,
            icon: 'iconPicking',
            backgroundColor: '#83A8C3',
            jumpUrl: '/zero-pick',
            jumpBcd: 'CZP',
            moduleText: '拆零整件拣货'
          },
          {
            moduleId: 3,
            icon: 'iconPicking',
            backgroundColor: '#EF3A5B',
            jumpUrl: '/zero-pick',
            jumpBcd: 'ZJP',
            moduleText: '整件拣货'
          },
          {
            moduleId: 4,
            icon: 'iconPicking',
            backgroundColor: '#385E82',
            jumpUrl: '/zero-pick',
            jumpBcd: 'ECP',
            moduleText: '电商拣货'
          },
          {
            moduleId: 5,
            icon: 'iconRectangleCopy',
            backgroundColor: '#8BBA30',
            jumpUrl: '/supply/replenishment',
            jumpBcd: 'CRD',
            moduleText: '拆零补货'
          },
          {
            moduleId: 6,
            icon: 'iconRectangleCopy',
            backgroundColor: '#EBB741',
            jumpUrl: '/supply/replenishment',
            jumpBcd: 'ZRD',
            moduleText: '整件补货'
          },
          {
            moduleId: 7,
            icon: 'iconRectangleCopy',
            backgroundColor: '#BEA881',
            jumpUrl: '/supply/replenishment',
            jumpBcd: 'SRD',
            moduleText: '拆零暂存补货'
          },
          {
            moduleId: 8,
            icon: 'iconTransfer',
            backgroundColor: '#F2854C',
            jumpUrl: '/delipick',
            jumpBcd: 'DBP',
            moduleText: '调拨上架'
          },
          {
            moduleId: 9,
            icon: 'iconTransfer',
            backgroundColor: '#385E82',
            jumpUrl: '/collection',
            jumpBcd: 'DB',
            moduleText: '调拨集货'
          },
          {
            moduleId: 10,
            icon: 'iconTransfer',
            backgroundColor: '#EF3A5B',
            jumpUrl: '/delipick',
            jumpBcd: 'CDP',
            moduleText: '仓间调拨'
          },
          {
            moduleId: 11,
            icon: 'iconBox',
            backgroundColor: '#BEA881',
            jumpUrl: '/sowbox',
            jumpBcd: '',
            moduleText: '播物流箱'
          },
          {
            moduleId: 12,
            icon: 'iconPickingList',
            backgroundColor: '#83A8C3',
            jumpUrl: '/jhcheck',
            jumpBcd: 'CZP',
            moduleText: '集货复查'
          },
          {
            moduleId: 13,
            icon: 'iconPickingList',
            backgroundColor: '#385E82',
            jumpUrl: '/jhcheck',
            jumpBcd: 'XD',
            moduleText: '新店集货'
          },
          {
            moduleId: 14,
            icon: 'iconExit',
            backgroundColor: '#04ACAD',
            jumpUrl: '/login',
            jumpBcd: '',
            moduleText: '退出'
          }
        ]
      }
    },
    components: {
      MenuModule
    },
    created() {
      // getModuleList(1).then(
      //   data => {
      //     this.moduleList = data.moduleList
      //   })
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
