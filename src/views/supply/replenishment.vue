/**
* Created by  on 2019/6/9.
*/
<template>
  <el-container direction="vertical">
    <el-header
      height="auto"
      style="width: 100%"
    >
      <el-row class="header-title">
        <el-col :span="24">
          <div
            v-if="pageStates.curBillBcd=='CRD'"
            class="grid-content"
          >
            拆零补货
          </div>
          <div
            v-else-if="pageStates.curBillBcd=='ZRD'"
            class="grid-content"
          >
            整件补货
          </div>
          <div
            v-else-if="pageStates.curBillBcd=='SRD'"
            class="grid-content"
          >
            拆零存储补货
          </div>
        </el-col>
      </el-row>
      <el-row
        :gutter="20"
        class="header-font"
      >
        <el-col :span="8">
          <div class="grid-content">
            当前模式：{{ pageStates.showMode }}
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            操作人：{{ pageStates.showOpName }}
          </div>
        </el-col>
        <el-col :span="4">
          <el-badge
            class="resetsup"
            :value="pageStates.showLTaskNum"
            :max="99"
          >
            <el-button
              type="primary"
              class="badge-style"
            >
              {{ pageStates.showLTask }}
            </el-button>
          </el-badge>
        </el-col>
        <el-col :span="4">
          <el-badge
            :value="pageStates.showRTaskNum"
            :max="99"
          >
            <el-button
              type="warning"
              class="badge-style"
            >
              {{ pageStates.showRTask }}
            </el-button>
          </el-badge>
        </el-col>
      </el-row>
      <el-row
        :gutter="20"
        class="header-font"
      >
        <el-col :span="13">
          <div class="grid-content">
            单据号：{{ billHead.Billno }}
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            总件数：{{ billHead.Gdscnt }}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="50">
        <el-col :span="6">
          <el-button
            v-if="pageStates.curMode==='1'"
            v-loading.fullscreen.lock="pageStates.fullscreenLoading"
            type="primary"
            class="btn-setting"
            @click="handleGetTask('1')"
          >
            获取任务
          </el-button>
        </el-col>
        <el-col :span="6">
          <el-button
            v-if="pageStates.curMode==='1'"
            v-loading.fullscreen.lock="pageStates.fullscreenLoading"
            type="success"
            class="btn-setting"
            @click="handleGetTask('2')"
          >
            补货
          </el-button>
        </el-col>
        <el-col
          :span="6"
          :offset="6"
        >
          <el-button
            v-if="pageStates.curMode==='2'"
            v-loading.fullscreen.lock="pageStates.fullscreenLoading"
            type="info"
            class="btn-setting"
            @click="handleCheckBill"
          >
            完成
          </el-button>
        </el-col>
        <el-col :span="6">
          <el-button
            type="warning"
            class="btn-setting"
            @click="handleQueryRecord"
          >
            查看记录
          </el-button>
        </el-col>
        <el-col :span="6">
          <el-button
            v-if="pageStates.curMode==='1'"
            type="danger"
            class="btn-setting"
            @click="handleReturnToMenu"
          >
            退出
          </el-button>
        </el-col>
        <el-col :span="6">
          <el-button
            v-if="pageStates.curMode==='2'"
            v-loading.fullscreen.lock="pageStates.fullscreenLoading"
            type="danger"
            class="btn-setting"
            @click="handleGetTask('1')"
          >
            返回
          </el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <task-card
        v-for="PickBody in billPickBody"
        :key="PickBody.Billno"
        :table-data="[PickBody]"
        :now-mode="pageStates.curMode"
        @listentobillfinish="handleCheckBill"
      />
    </el-main>
    <el-dialog
      title="查看记录"
      :visible.sync="pageStates.dialogTableVisible"
    >
      <el-table :data="billQueryBody">
        <el-table-column
          property="Gdsname"
          label="品名"
          width="330"
        />
        <el-table-column
          property="Setnum"
          label="应补件数"
          width="130"
        />
        <el-table-column
          property="Factsetnum"
          label="实补件数"
          width="130"
        />
        <el-table-column
          property="Status"
          label="状态"
          width="160"
        />
      </el-table>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="pageStates.dialogTableVisible = false"
        >
          关 闭
        </el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script type="text/ecmascript-6">
  import TaskCard from 'components/task-card'
  import { getReplenishmentData, doCheckReplenishBill, getReplenishTaskNum, getReplenishRecord } from 'api/replenishment'
  export default {
    components: {
      TaskCard
    },
    data () {
      return {
        // 单头数据
        billHead: {
          // 单据号
          Billno: '',
          // 总件数
          Gdscnt: ''
        },
        // 单体待拣货数据
        billPickBody: [],
        // 单体待补货数据
        billSupplyBody: [],
        // 单体查询数据
        billQueryBody: [],
        // 页面状态
        pageStates: {
          // 全屏遮罩
          fullscreenLoading: false,
          // 当前业务代码
          curBillBcd: '',
          // 当前模式
          curMode: '',
          // 显示模式
          showMode: '',
          // 操作人
          showOpName: '',
          // 业务处理中
          bDealingBusiness: false,
          // 显示任务1
          showLTask: '',
          // 显示任务2
          showRTask: '',
          // 显示任务数1
          showLTaskNum: '',
          // 显示任务数2
          showRTaskNum: '',
          // 弹窗是否显示
          dialogTableVisible: false
        }
      }
    },
    watch: {
      'pageStates.curMode': function (value) {
        if (value === '1') {
          this.pageStates.showMode = '拣货'
        } else {
          this.pageStates.showMode = '补货'
        }
      }
    },
    mounted: function () {
      // 判断登录状态是否存在
      if (this.$store.state.Whid === undefined || this.$store.state.Whid === '') {
        // 恢复登录信息
        let storeData = JSON.parse(window.localStorage.getItem('storeInfo'))
        this.initStoreLoginInfo(storeData, this)
      }

      // 取得并记录BCD
      this.pageStates.curBillBcd = this.$route.query.bcd
      this.pageStates.curMode = '1'
      this.pageStates.showOpName = this.$store.state.Opname

      if (this.pageStates.curBillBcd === 'CRD') {
        this.pageStates.showLTask = '任务'
        this.pageStates.showRTask = '特急'
      } else if (this.pageStates.curBillBcd === 'ZRD') {
        this.pageStates.showLTask = '立库'
        this.pageStates.showRTask = '暂存'
      }

      setInterval(this.handleGetTaskNum, 20000)

      // 禁用浏览器返回按钮
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL)
      })
    },
    methods: {
      // 非空判断
      isNotNull(value) {
        return (value !== '' &&
          value !== null &&
          value !== undefined)
      },
      // 判断是否有正在进行的任务
      hasMode(newMode) {
        if (this.pageStates.curMode === '1' &&
          newMode === '2' &&
          (
            this.isNotNull(this.billHead.Billno
            ))) {
          this.$alert('请先获取任务！', '提示', { confirmButtonText: '确定' })
          return true
        }
      },
      // 任务进行前预备操作
      beforeStartBusiness() {
        // 按钮处理中控制
        // 判断是否有任务进行中 有就退出
        // 没有就进行新任务 且打开全屏遮罩
        if (this.pageStates.bDealingBusiness) {
          return false
        }
        this.pageStates.bDealingBusiness = true
        // 打开全屏遮罩
        this.pageStates.fullscreenLoading = true
      },
      // 任务完成后结束操作
      afterFinishBusiness() {
        // 关闭处理中标志
        this.pageStates.bDealingBusiness = false
        // 关闭全屏遮罩
        this.pageStates.fullscreenLoading = false
      },
      handleGetTask(newMode) {
        // 判断是否有正在进行的任务
        if (this.hasMode(newMode)) {
          return
        }
        // 任务进行前预备操作
        if (!this.beforeStartBusiness) {
          return
        }

        // 请求数据
        let postData = {
          'sType': newMode,
          'sBillNo': this.billHead.Billno,
          'sBcd': this.pageStates.curBillBcd,
          'sOpId': this.$store.state.Opid
        }

        this.billPickBody = []

        getReplenishmentData(postData)
          .then((data) => {
          if (data.d.RtnStatus === 'ok') {
            if (data.d.UpHead.Billno === undefined ||
              data.d.UpHead.Billno === null ||
              data.d.UpHead.Billno === '') {
              this.$alert('当前没有补货任务！', '提示', { confirmButtonText: '确定' })
            } else {
              this.billHead.Billno = data.d.UpHead.Billno
              this.billHead.Gdscnt = data.d.UpHead.Tsetnum
              this.billPickBody = data.d.UpBody
              this.pageStates.curMode = newMode
            }
          } else {
            this.$alert(data.d.RtnMsg, '错误', { confirmButtonText: '确定' })
          }
          })
          .catch((error) => {
              this.$alert(error.message, '错误', { confirmButtonText: '确定' })
          })
          .finally(() => {
            // 任务完成后结束操作
            this.afterFinishBusiness()
          })
      },
      handleCheckBill() {
        // 按钮处理中控制
        if (this.pageStates.bDealingBusiness) {
          return
        }
        this.pageStates.bDealingBusiness = true

        this.$confirm('将生效补货单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        }).then(() => {
          // 打开全屏遮罩
          this.pageStates.fullscreenLoading = true

          // 请求数据
          let postData = {
            'sBillNo': this.billHead.Billno,
            'sOpId': this.$store.state.Opid
          }

          doCheckReplenishBill(postData)
            .then((data) => {
              if (data.d.RtnStatus === 'ok') {
                this.pageStates.curMode = '1'
                this.billHead.Billno = ''
                this.billHead.Gdscnt = ''
                this.billPickBody = []
              } else {
                this.$alert(data.d.RtnMsg, '错误', { confirmButtonText: '确定' })
              }
            })
            .catch((error) => {
              this.$alert(error.message, '错误', { confirmButtonText: '确定' })
            })
            .finally(() => {
              // 任务完成后结束操作
              this.afterFinishBusiness()
            })
        }).catch(() => {
          this.pageStates.bDealingBusiness = false
        })
      },
      handleGetTaskNum() {
        // 请求数据
        let postData = {
          'sBcd': this.pageStates.curBillBcd
        }

        getReplenishTaskNum(postData)
          .then((data) => {
            if (data.d.RtnStatus === 'ok') {
              this.pageStates.showLTaskNum = data.d.RtnLTaskNum
              this.pageStates.showRTaskNum = data.d.RtnRTaskNum
            }
          })
      },
      // 获取补货记录
      handleQueryRecord() {
        // 任务进行前预备操作
        if (!this.beforeStartBusiness) {
          return
        }

        this.billQueryBody = []

        let billno = this.billHead.Billno

        if (this.isNotNull(billno)) {
          // 请求数据
          let postData = {
            'sBillNo': billno
          }

          getReplenishRecord(postData)
            .then((data) => {
              if (data.d.RtnStatus === 'ok') {
                this.billQueryBody = data.d.UpBody
              }
            })
        }

        // 任务完成后结束操作
        this.afterFinishBusiness()
        // 弹窗显示
        this.pageStates.dialogTableVisible = true
      },
      handleReturnToMenu() {
        // 返回菜单
        this.$router.push('/menu')
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
  @import "~stylus/variable.styl"
  @import '~css/replenishment.css'
</style>
