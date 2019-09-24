/**
* Created by  on 2019/6/9.
*/
<template>
  <el-card
    v-if="rowData.length>0"
    class="box-card"
  >
    <div
      slot="header"
      class="clearfix"
    >
      <span>{{ slcd }}</span>
      <span v-if="this.nowMode === '2' && this.zcsl !== null && this.zcsl !== ''">暂存位:{{ zcsl }}</span>
    </div>
    <div>
      <el-table
        :data="rowData"
        style="width: 100%"
      >
        <el-table-column
          label="品 名"
          width="330"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.Gdsname }}({{ scope.row.Gdscd }})</span>
            <span
              v-if="scope.row.Ifoos==='1'"
              class="ifoos"
            >缺货</span>
          </template>
        </el-table-column>
        <el-table-column
          label="规 格"
          width="100"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.Pack }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="应补件数"
          width="130"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.Setnum }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="实补件数"
          width="160"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.Factsetnum"
              type="number"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="操 作"
          width="180"
        >
          <template slot-scope="scope">
            <el-button
              v-loading.fullscreen.lock="fullscreenLoading"
              class="btn-operate"
              @click="handleDoFinishTask(scope.row, scope.$index)"
            >
              {{ btntext }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<script type="text/ecmascript-6">
  import { doFinishReplenish } from 'api/replenishment'
  import pageCreate from 'utils/page-creat'
  // 组件名
  const COMPONENT_NAME = 'task-card'
  export default pageCreate({
    name: COMPONENT_NAME,
    props: {
      tableData: {
        type: Array
      },
      nowMode: {
        type: String
      }
    },
    data() {
      return {
        fullscreenLoading: false,
        rowData: this.tableData,
        slcd: '',
        zcsl: '',
        btntext: ''
      }
    },
    mounted: function () {
      let slfromcd = this.rowData[0].Slfromcd
      let sltocd = this.rowData[0].Sltocd
      this.slcd = this.nowMode === '1' ? '拣货位:' + slfromcd.substring(0, 3) + '-' + slfromcd.substring(3) : '补货位:' + sltocd.substring(0, 3) + '-' + sltocd.substring(3)
      this.zcsl = this.rowData[0].Zcsl
      this.btntext = this.nowMode === '1' ? '已拣' : '已补'
    },
    methods: {
      handleDoFinishTask(row, index) {
        // 单据号
        let billno = row.Billno
        // 序号
        let seq = row.Seq
        // 应补数
        let setnum = row.Setnum.split('+')[0]
        // 实补数
        let factsetnum = row.Factsetnum
        // 件含量
        let packnum = row.Packnum
        // 拣货位可放数
        let maxnum = row.Maxnum
        // 业务代码
        let bcd = billno.substring(11)

        let reg = /^[0-9]+$/
        if (!reg.test(factsetnum)) {
          row.Factsetnum = setnum
          this.$alert('请输入正整数！')
          return
        }

        if (parseFloat(setnum) < parseFloat(factsetnum)) {
          if (bcd === 'CRD' &&
            parseFloat(factsetnum) > 1) {
            row.Factsetnum = setnum
            this.$alert('实补件数大于应补件数！')
            return
          } else if ((bcd === 'ZRD' || bcd === 'SRD') &&
            parseFloat(maxnum) < parseFloat(factsetnum) * parseFloat(packnum)) {
            row.Factsetnum = setnum
            this.$alert('实补数大于拣货位可放数！')
            return
          }
        }

        // 打开全屏遮罩
        this.fullscreenLoading = true

        // 请求数据
        let postData = {
          'sType': this.nowMode,
          'sBillNo': billno,
          'sSeq': seq,
          'sFactBigNum': factsetnum,
          'sOpId': this.$store.state.Opid
        }

        doFinishReplenish(postData)
          .then((data) => {
            if (data.d.RtnStatus === 'ok') {
              this.rowData.splice(index, 1)
              if (data.d.RtnMsg === 'end') {
                this.$emit('listentobillfinish', 'end')
              }
            } else {
              this.$alert(data.d.RtnMsg, '错误', { confirmButtonText: '确定' })
            }
          })
          .catch((error) => {
            this.$alert(error.message, '错误', { confirmButtonText: '确定' })
          })
          .finally(() => {
            // 关闭全屏遮罩
            this.fullscreenLoading = false
          })
      }
    }
  })
</script>

<style scoped lang="stylus" type="text/stylus">
  @import "~stylus/variable.styl"
  @import '~css/task-card.css'
</style>
