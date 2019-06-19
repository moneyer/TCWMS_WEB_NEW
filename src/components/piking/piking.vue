/**
* Created by  on 2019/6/6.
*/
<template>
  <div class="container">
    <el-container>
      <el-header>
        <span v-if="pageStates.curBillBcd=='CLP'">零工位摘果单</span>
        <span v-if="pageStates.curBillBcd=='CZP'">拆零整件摘果单</span>
        <span v-if="pageStates.curBillBcd=='ZJP'">整件摘果单</span>
        <span v-if="pageStates.curBillBcd=='ECP'">电商摘果单</span>
      </el-header>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="4">
            <div class="grid-content bg-purple">
              单据号：
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light">
              {{ billHead.Billno }}
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              拣货人
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light">
              {{ billHead.Pickopinfo }}
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="4">
            <div class="grid-content bg-purple">
              线路：
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light">
              {{ billHead.Lineinfo }}
            </div>
          </el-col>
          <el-col
            v-if="pageStates.curBillBcd !== 'CLP'"
            :span="4"
          >
            <div class="grid-content bg-purple">
              总件数：
            </div>
          </el-col>
          <el-col
            v-if="pageStates.curBillBcd !== 'CLP'"
            :span="4"
          >
            <div class="grid-content bg-purple-light">
              {{ billHead.Tsetnum }}
            </div>
          </el-col>
          <el-col
            v-if="pageStates.curBillBcd === 'CLP'"
            :span="4"
          >
            <div class="grid-content bg-purple">
              箱号：
            </div>
          </el-col>
          <el-col
            v-if="pageStates.curBillBcd === 'CLP'"
            :span="4"
          >
            <div class="grid-content bg-purple-light">
              {{ billHead.CurBoxcd }}
            </div>
          </el-col>
          <el-col :span="4">
            <el-button
              size="large"
              class="text"
              @click="_showFinished"
            >
              {{ pageStates.showFinishedButtonText }}
            </el-button>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="4">
            <div class="grid-content bg-purple">
              总行数：
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-light" />
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              剩余数：
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-light" />
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple">
              当前模式：
            </div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-yellow">
              <span v-if="!pageStates.bSowing">拣货</span>
              <span v-else>分播</span>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col
            v-if="pageStates.curBillBcd === 'CLP'"
            :span="20"
          >
            <el-input
              v-model="billHead.Pickboxcd"
              class="mid-text"
              placeholder="请输入箱号"
              suffix-icon="el-icon-edit"
              @keyup.enter.native="handleGetBillInfo"
            >
              <template slot="prepend">
                拣货箱号:
              </template>
            </el-input>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="5">
            <el-button
              class="mid-text"
              type="primary"
              size="large"
              :disabled="!buttonStatus.bGetBillEnb"
              @click="handleGetBillInfo"
            >
              获取单据
            </el-button>
          </el-col>
          <el-col :span="5">
            <el-button
              v-loading.fullscreen.lock="pageStates.fullscreenLoading"
              class="mid-text"
              type="success"
              size="large"
              :disabled="!buttonStatus.bEndPickEnb"
              element-loading-text="处理中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.1)"
              @click="handleFinishPick"
            >
              <span v-if="pageStates.curBillBcd=='CLP'">拣货完成</span>
              <span v-else>开始分播</span>
            </el-button>
          </el-col>
          <el-col
            v-if="pageStates.curBillBcd !== 'CLP'"
            :span="5"
          >
            <el-button
              v-loading.fullscreen.lock="pageStates.fullscreenLoading"
              class="mid-text"
              type="warning"
              size="large"
              :disabled="!buttonStatus.bEndSowEnb"
              element-loading-text="处理中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.1)"
              @click="handleFinishSow"
            >
              <span>分播完成</span>
            </el-button>
          </el-col>
          <el-col :span="5">
            <el-button
              class="mid-text"
              type="danger"
              size="large"
              :disabled="!buttonStatus.bCloseEnb"
              @click="handleCheckCloseStatus"
            >
              关闭
            </el-button>
          </el-col>
        </el-row>

        <el-dialog
          title="提示"
          :visible.sync="pageStates.dialogVisible"
          width="30%"
        >
          <span>{{ pageStates.dialogText }}</span>
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="pageStates.dialogVisible = false">取 消</el-button>
            <el-button
              v-if="buttonStatus.bDialogComfirm"
              type="primary"
              @click="handleReturnToMenu"
            >确 定</el-button>
          </span>
        </el-dialog>
      </el-main>
      <el-footer>
        <div class="billbody">
          <el-card
            v-for="(dr,idx) in billBody"
            :key="idx"
            class="box-card"
          >
            <div
              slot="header"
              class="clearfix large-text-l color-red"
            >
              <el-row :gutter="20">
                <el-col :span="6">
                  <span>{{ dr.Slcd }}</span>
                </el-col>
                <el-col :span="6">
                  <span v-if="pageStates.curBillBcd=='CLP'">应拣数：{{ dr.Num }}</span>
                  <span v-else-if="!pageStates.bSowing">件数：{{ dr.Setnum }}</span>
                  <span v-else>件数：{{ dr.Factsetnum }}</span>
                </el-col>
                <el-col :span="8">
                  <span v-if="pageStates.bSowing">集货位：{{ dr.Lineseq }}</span>
                </el-col>
                <el-col :span="4">
                  <el-button
                    v-if="!pageStates.bSowing"
                    type="success"
                    class="float-right mid-text"
                    :disabled="pageStates.bShowFinishData"
                    @click="handleCommitRowPick(idx)"
                  >
                    完成
                  </el-button>
                </el-col>
                <el-col :span="4">
                  <!-- <el-button v-if="!pageStates.bSowing && pageStates.curBillBcd=='ZJP'"
                             type="warning"
                             class="float-right mid-text"
                             v-bind:disabled="pageStates.bShowFinishData"
                             @click="handleReplenishment(dr.Gdsid)">补货
                  </el-button> -->
                </el-col>
              </el-row>
            </div>
            <div class="mid-text item">
              <el-row :gutter="20">
                <el-col :span="pageStates.bSowing? 22:16">
                  <span :class="pageStates.bSowing? 'large-text-l':''">{{ dr.Gdsname }}</span>
                </el-col>
                <el-col
                  v-if="!pageStates.bSowing"
                  :span="8"
                >
                  <el-input
                    v-if="pageStates.curBillBcd=='CLP'"
                    v-model="dr.Factnum"
                    placeholder="实拣数"
                    suffix-icon="el-icon-edit"
                    class="large-text"
                    type="number"
                  >
                    <template slot="prepend">
                      实拣数:
                    </template>
                  </el-input>
                  <el-input
                    v-else-if="!pageStates.bSowing"
                    v-model="dr.Factsetnum"
                    placeholder="实拣件数"
                    suffix-icon="el-icon-edit"
                    class="large-text"
                    type="number"
                    @input="reCalculateNum(idx)"
                  >
                    <template slot="prepend">
                      实拣件数:
                    </template>
                  </el-input>
                </el-col>
                <el-col :span="2">
                  <el-button
                    v-if="pageStates.bSowing"
                    type="success"
                    class="float-right mid-text"
                    @click="handleCommitRowPick(idx)"
                  >
                    完成
                  </el-button>
                </el-col>
              </el-row>
              <el-row
                :gutter="20"
                class="color-red"
              >
                <el-col :span="4">
                  规格：{{ dr.Pack }}
                </el-col>
                <el-col :span="3">
                  单位：{{ dr.Packunit }}
                </el-col>
                <el-col
                  v-if="dr.Barcode!=undefined && dr.Barcode!=''"
                  :span="5"
                >
                  条码：{{ dr.Barcode.substring(7,13) }}
                </el-col>
                <el-col
                  v-if="pageStates.bSowing"
                  :span="12"
                >
                  门店：{{ dr.Sitetext }}
                </el-col>
              </el-row>
            </div>
          </el-card>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getBillInfo, setUnitePickRowDone } from 'api/picking'
  import pageCreate from 'utils/page-creat'
  // 组件名
  const COMPONENT_NAME = 'piking'
  // 对外使用的常量
  // TCConstant = {}
  export default pageCreate({
    name: COMPONENT_NAME,
    props: {},
    data() {
      return {
        // 单头数据
        billHead: {
          // 单据号
          Billno: '',
          // 线路信息
          Lineinfo: '',
          // 拣货员信息
          Pickopinfo: '',
          // 单品数
          Gdscnt: '',
          // 拣货箱号
          Pickboxcd: '',
          CurBoxcd: ''
        },
        // 单体数据
        billBody: [],
        // 已完成单体数据
        billBodyFinished: [],
        // 待分播单体数据
        billBodyToSow: [],
        // 已分播单体数据
        billBodyToSowFinished: [],
        // 备份数据数组
        backupData: [],
        // 校验规则
        rules: {
          // 拣货箱号
          Pickboxcd: [
            { required: true, message: '请输入拣货箱号', trigger: 'blur' }
          ]
        },
        // 页面状态
        pageStates: {
          // 全屏遮罩
          fullscreenLoading: false,
          // 对话框显示
          dialogVisible: false,
          // 对话框内容
          dialogText: '',
          // 当前业务代码
          curBillBcd: '',
          // 完成按钮文字
          showFinishedButtonText: '',
          // 是否显示已完成数据
          bShowFinishData: false,
          // 是否分播
          bSowing: false,
          // 业务处理中
          bDealingBusiness: false,
          // 业务处理中
          bDealingSwitch: false
        },
        // 按钮状态
        buttonStatus: {
          // 消息提示框确认按钮控制
          bDialogComfirm: true,
          // 获取单据按钮控制
          bGetBillEnb: false,
          // 拣货完成/开始分播按钮控制
          bEndPickEnb: false,
          // 结束分播按钮控制
          bEndSowEnb: false,
          // 关闭按钮控制
          bCloseEnb: false
        }
      }
    },
    mounted() {
      // 判断登录状态是否存在
      if (this.$store.state.Whid === undefined || this.$store.state.Whid === '') {
        // 恢复登录信息
        var storeData = JSON.parse(window.localStorage.getItem('storeInfo'))
        this.initStoreLoginInfo(storeData, this)
      }

      // 取得并记录BCD
      this.pageStates.curBillBcd = this.$route.query.bcd
      this.pageStates.showFinishedButtonText = '显示完成'
      this.buttonStatus.bGetBillEnb = true
      this.buttonStatus.bCloseEnb = true

      // 禁用浏览器返回按钮
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL)
      })
    },
    methods: {
      // 判断拣货箱号是否正确
      getPickBoxCd() {
        if (this.pageStates.curBillBcd === 'CLP' &&
          (this.billHead.Pickboxcd === undefined ||
            this.billHead.Pickboxcd === '' ||
            this.billHead.Pickboxcd < '68881' ||
            this.billHead.Pickboxcd >= '70000' ||
            this.billHead.Pickboxcd.length !== 5)) {
          this.pageStates.dialogText = '请输入正确的拣货箱号！'
          this.buttonStatus.bDialogComfirm = false
          this.pageStates.dialogVisible = true
          this.pageStates.bDealingBusiness = false
          // return
          return false
        }
      },
      // 获取单据信息
      handleGetBillInfo() {
        let _this = this

        // 按钮处理中控制
        if (this.pageStates.bDealingBusiness) {
          return
        }
        this.pageStates.bDealingBusiness = true

        // 判断拣货箱号是否正确
        if (!this.getPickBoxCd()) {
          return
        }

        if (this.$store.state.Opcd === undefined ||
          this.$store.state.Opcd.trim() === '') {
          this.$data.pageStates.dialogText = '登录信息有误，请重新登录系统！'
          this.$data.buttonStatus.bDialogComfirm = false
          this.$data.pageStates.dialogVisible = true
          this.$data.pageStates.bDealingBusiness = false
          return
        }

        // 打开全屏遮罩
        this.pageStates.fullscreenLoading = true

        // 请求数据
        let postData = {
          'sWhId': this.$store.state.Whid,
          'sBcd': this.$data.pageStates.curBillBcd,
          'sOpCd': this.$store.state.Opcd,
          'sPickBoxCd': this.$data.billHead.Pickboxcd
        }
        // 回到拣货状态
        this.$data.pageStates.bSowing = false
        // 清空数据
        this.clearFormData()
        // 摘果单加载
        getBillInfo(postData)
          .then(data => {
          if (data.d.RtnStatus === 'ok') {
            // 单头赋值
            // this.$data.billHead = data.d.UpHead
            _this.billHead = data.d.UpHead
            // this.$data.billHead.Billno = data.d.UpHead.Billno
            // this.$data.billHead.Lineinfo = data.d.UpHead.Lineinfo
            // this.$data.billHead.Pickopinfo = data.d.UpHead.Pickopinfo
            // this.$data.billHead.Pickboxcd = data.d.UpHead.Pickboxcd
            // this.$data.billHead.Gdscnt = data.d.UpHead.Gdscnt
            // this.$data.billHead.Rows = data.d.UpHead.Rows
            // this.$data.billHead.Tsetnum = data.d.UpHead.Tsetnum
            // this.$data.billHead.CurBoxcd = data.d.UpHead.Pickboxcd
            // 单体赋值
            data.d.UpBody.forEach(function (item) {
              if (item.Rowstatus === '1' || item.Rowstatus === '2') {
                _this.$data.billBodyFinished.push(item)
              } else {
                _this.$data.billBody.push(item)
              }
            })
            data.d.UpBodyToSow.forEach(function (item) {
              if (item.Factnum !== 0) {
                if (item.Rowstatus === '2') {
                  _this.$data.billBodyToSowFinished.push(item)
                } else {
                  _this.$data.billBodyToSow.push(item)
                }
              }
            })

            if (_this.$data.billBody.length === 0 && _this.$data.billBodyToSow.length === 0) {
              _this.showSowFinishAlert()
            } else if (_this.$data.billBody.length === 0) {
              _this.showPickFinishAlert()
            } else {
              // 获取单据按钮不可用控制
              _this.$data.buttonStatus.bGetBillEnb = false
              // 关闭处理中标志
              _this.$data.pageStates.bDealingBusiness = false
              // 关闭全屏遮罩
              _this.$data.pageStates.fullscreenLoading = false
            }
          } else {
            _this.$notify.error({
              title: '错误',
              message: data.d.RtnMsg
            })
            // _this.$message({
            //   message: data.d.RtnMsg,
            //   duration: 1500,
            //   center: true,
            //   offset: 420
            // })
            // 关闭处理中标志
            _this.$data.pageStates.bDealingBusiness = false
            // 关闭全屏遮罩
            _this.$data.pageStates.fullscreenLoading = false
          }
        }).catch(function (error) {
          _this.$notify.error({
            title: '错误',
            message: error
          })
          // _this.$message({
          //   message: error,
          //   duration: 1500,
          //   center: true,
          //   offset: 420
          // })
          console.log(error)
          // 关闭处理中标志
          _this.$data.pageStates.bDealingBusiness = false
          // 关闭全屏遮罩
          _this.$data.pageStates.fullscreenLoading = false
        })
      },
      // 显示已完成/待拣切换
      handleShowFinished() {
        // 打开全屏遮罩
        this.pageStates.fullscreenLoading = true
        if (!this.pageStates.bShowFinishData) {
          // 显示完成
          // 隐藏单行完成按钮
          this.pageStates.bShowFinishData = true
          // 清空备份数据
          this.backupData = []
          // 当前数据保存
          this.billBody.forEach(function (item) {
            this.backupData.push(item)
          })
          // 显示数据赋值
         this.billBody = []
          if (!this.pageStates.bSowing) {
            // 拣货界面
            this.billBodyFinished.forEach(function (item) {
              this.billBody.push(item)
            })
          } else {
            // 分播界面
            this.billBodyToSowFinished.forEach(function (item) {
              this.billBody.push(item)
            })
          }
          this.pageStates.showFinishedButtonText = '显示待拣'
        } else {
          // 显示待拣
          // 显示单行完成按钮
          this.pageStates.bShowFinishData = false
          // 清空显示数据
          this.billBody = []
          // 从备份数据恢复数据显示
          this.backupData.forEach(function (item) {
            this.billBody.push(item)
          })
          this.pageStates.showFinishedButtonText = '显示完成'
        }
        // 关闭全屏遮罩
        this.pageStates.fullscreenLoading = false
      },
      // 返回菜单
      handleReturnToMenu() {
        // 返回菜单
        this.$router.push('/menu')
      },
      // 检查单据可关闭状态
      handleCheckCloseStatus() {
        // 提示
        if (this.billBody !== undefined && this.billBody.length > 0) {
          this.pageStates.dialogText = '当前单据拣货未完成，确定关闭吗？'
          this.pageStates.dialogCanSubmit = true
          this.pageStates.dialogVisible = true
        } else {
          // 返回菜单
          this.handleReturnToMenu()
        }
      },
      // 单行完成处理 idx:行索引
      handleCommitRowPick(idx) {
        if (!this.pageStates.bSowing) {
          this.commitRowPick(idx)
        } else {
          this.commitRowSow(idx)
        }
      },
      // 重新计算数量 idx:行索引
      reCalculateNum(idx) {
        // var curBodyData = this.billBody[idx]
        if (this.billBody[idx].Factsetnum !== '') {
          this.billBody[idx].Factnum = parseInt(this.billBody[idx].Factsetnum) * this.billBody[idx].Packnum
        }
      },
      // 显示拣货完成提示框
      showPickFinishAlert() {
        let _this = this
        // 关闭全屏遮罩
        this.pageStates.fullscreenLoading = false
        // 若全部行已完成，提示是否确定拣货完成
        if (this.billBody.length === 0) {
          let confirmText = '已完成所有拣货任务, 是否结束本单?'
          if (this.pageStates.curBillBcd !== 'CLP') {
            confirmText = '已完成所有拣货任务, 是否开始分播?'
          }
          this.$confirm(confirmText, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // 关闭全屏遮罩
            _this.pageStates.fullscreenLoading = true
            _this.handleFinishPick()
          }).catch(() => {
            // 开始分播按钮可用
            _this.buttonStatus.bEndPickEnb = true
            _this.$message({
              type: 'info',
              message: '已取消'
            })

            // 关闭处理中标志
            _this.pageStates.bDealingBusiness = false
            // 关闭全屏遮罩
            _this.pageStates.fullscreenLoading = false
          })
        } else {
          // 关闭处理中标志
          this.pageStates.bDealingBusiness = false
          // 关闭全屏遮罩
          this.pageStates.fullscreenLoading = false
        }
      },
      // 单行拣货完成处理 idx:行索引
      commitRowPick(idx) {
        let _this = this
        // 开启全屏遮罩
        this.pageStates.fullscreenLoading = true
        // 按钮处理中控制
        if (this.pageStates.bDealingBusiness) {
          return
        }
        this.pageStates.bDealingBusiness = true

        let curBodyData = this.billBody[idx]

        // 请求数据
        let postData = {
          'sBillNo': curBodyData.Billno,
          'sGdsId': curBodyData.Gdsid,
          'sSlId': curBodyData.Slid,
          'sNum': curBodyData.Num,
          'sFactNum': curBodyData.Factnum
        }
        // 调用WCF进行实拣数更新  接口
        setUnitePickRowDone(postData)
          .then(data => {
            if (data.d.RtnStatus === 'ok') {
              _this.billBodyFinished.push(curBodyData)
              _this.$data.billBody.splice(idx, 1)
              // 成功提示
              _this.$message({
                message: data.d.RtnMsg,
                duration: 1500,
                center: true,
                offset: 420
              })
              // _this.$notify({
              //   title: '提示',
              //   message: data.d.RtnMsg
              // })

              _this.showPickFinishAlert()
            } else {
              _this.$message({
                message: data.d.RtnMsg,
                duration: 1500,
                center: true,
                offset: 420
              })
              // self.$notify.error({
              //   title: '错误',
              //   message: data.d.RtnMsg
              // })
              // 关闭处理中标志
              _this.pageStates.bDealingBusiness = false
              // 关闭全屏遮罩
              _this.pageStates.fullscreenLoading = false
            }
          })
          .catch(function (error) {
            _this.$message({
              message: error,
              duration: 1500,
              center: true,
              offset: 420
            })
            // _this.$notify.error({
            //   title: '错误',
            //   message: error
            // })
            console.log(error)
            // 关闭处理中标志
            _this.pageStates.bDealingBusiness = false
            // 关闭全屏遮罩
            _this.pageStates.fullscreenLoading = false
          })
      },
      // 拣货结束处理
      handleFinishPick() {
        let self = this
        // 空单据，直接返回
        if (this.$data.billHead.Billno === undefined || this.$data.billHead.Billno === '') {
          return
        }
        if (this.$data.billBody !== undefined &&
          this.$data.billBody.length > 0) {
          this.$data.pageStates.dialogText = '当前单据拣货未完成！'
          this.$data.pageStates.dialogCanSubmit = false
          this.$data.pageStates.dialogVisible = true
        } else {
          // 开启全屏遮罩
          self.$data.pageStates.fullscreenLoading = true
          // 按钮处理中控制
          if (self.$data.pageStates.bDealingSwitch) {
            return
          }
          self.$data.pageStates.bDealingSwitch = true

          // 完成处理
          var postData = {
            'sBillNo': self.$data.billHead.Billno,
            'sPickOpId': self.$store.state.Opid
          }
          // 调用WCF进行单据状态更新
          self.axios.post(self.getServerPath(self.$store, self.$store.state.wms_serv_pick, 'UpdatePickFinishStat'), postData, {
            'headers': { 'Content-Type': 'application/json;charset=UTF-8' }
          }).then((response) => {
            if (response.data.d.RtnStatus === 'ok') {
              // 成功提示
              self.$notify({
                title: '提示',
                message: response.data.d.RtnMsg
              })

              if (self.$data.pageStates.curBillBcd === 'CLP') {
                // 零工位摘果单清空数据
                self.clearFormData()

                // 关闭处理中标志
                self.$data.pageStates.bDealingBusiness = false
                // 关闭完成中处理标志
                self.$data.pageStates.bDealingSwitch = false
                // 关闭遮罩层
                self.$data.pageStates.fullscreenLoading = false
                return
              }
              // 请求数据
              var postData = {
                'sWhId': self.$store.state.Whid,
                'sBcd': self.$data.pageStates.curBillBcd,
                'sOpCd': self.$store.state.Opcd,
                'sPickBoxCd': self.$data.billHead.Pickboxcd
              }
              // 摘果单加载
              self.axios.post(self.getServerPath(self.$store, self.$store.state.wms_serv_pick, 'GetBillData'), postData, {
                'headers': { 'Content-Type': 'application/json;charset=UTF-8' }
              }).then((response) => {
                // 清空原有分播数据
                self.$data.billBodyToSow = []
                // 清空原有分播数据
                self.$data.billBodyToSowFinished = []
                response.data.d.UpBodyToSow.forEach(function (item) {
                  if (item.Factnum !== 0) {
                    if (item.Rowstatus === '2') {
                      self.$data.billBodyToSowFinished.push(item)
                    } else {
                      self.$data.billBodyToSow.push(item)
                    }
                  }
                })

                // 其他单据进入分播界面
                self.$data.pageStates.bSowing = true
                // 开始分播按钮不可用
                self.$data.buttonStatus.bEndPickEnb = false
                // 分播按钮可用
                self.$data.buttonStatus.bEndSowEnb = true
                // 分播数据填充到界面
                self.$data.billBody = []
                self.$data.billBodyToSow.forEach(function (item) {
                  self.$data.billBody.push(item)
                })

                // 关闭处理中标志
                self.$data.pageStates.bDealingBusiness = false
                // 关闭完成中处理标志
                self.$data.pageStates.bDealingSwitch = false
                // 关闭遮罩层
                self.$data.pageStates.fullscreenLoading = false
              }).catch(function (error) {
                self.$notify.error({
                  title: '错误',
                  message: error
                })
                console.log(error)
                // 关闭处理中标志
                self.$data.pageStates.bDealingBusiness = false
                // 关闭完成中处理标志
                self.$data.pageStates.bDealingSwitch = false
                // 关闭遮罩层
                self.$data.pageStates.fullscreenLoading = false
              })
            } else {
              self.$notify.error({
                title: '错误',
                message: response.data.d.RtnMsg
              })
              // 关闭处理中标志
              self.$data.pageStates.bDealingBusiness = false
              // 关闭完成中处理标志
              self.$data.pageStates.bDealingSwitch = false
              // 关闭遮罩层
              self.$data.pageStates.fullscreenLoading = false
            }
          }).catch(function (error) {
            self.$notify.error({
              title: '错误',
              message: error
            })
            console.log(error)
            // 关闭处理中标志
            self.$data.pageStates.bDealingBusiness = false
            // 关闭完成中处理标志
            self.$data.pageStates.bDealingSwitch = false
            // 关闭遮罩层
            self.$data.pageStates.fullscreenLoading = false
          })
        }
      },
      // 显示分播完成提示
      showSowFinishAlert() {
        let self = this
        // 关闭全屏遮罩
        self.$data.pageStates.fullscreenLoading = false
        // 若全部行已完成，提示是否确定拣货完成
        if (self.$data.billBody.length === 0) {
          var confirmText = '已完成所有任务, 是否结束本单?'
          self.$confirm(confirmText, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // 关闭全屏遮罩
            self.$data.pageStates.fullscreenLoading = true
            self.handleFinishSow()
          }).catch(() => {
            self.$message({
              type: 'info',
              message: '已取消'
            })
            // 关闭处理中标志
            self.$data.pageStates.bDealingBusiness = false
            // 关闭全屏遮罩
            self.$data.pageStates.fullscreenLoading = false
          })
        } else {
          // 关闭处理中标志
          self.$data.pageStates.bDealingBusiness = false
          // 关闭全屏遮罩
          self.$data.pageStates.fullscreenLoading = false
        }
      },
      // 单行分播完成处理 idx:行索引
      commitRowSow(idx) {
        let self = this
        // 开启全屏遮罩
        self.$data.pageStates.fullscreenLoading = true
        // 按钮处理中控制
        if (self.$data.pageStates.bDealingBusiness) {
          return
        }
        self.$data.pageStates.bDealingBusiness = true

        var curBodyData = self.$data.billBody[idx]

        // 请求数据
        var postData = {
          'sBillNo': curBodyData.Billno,
          'iSeq': curBodyData.Seq
        }
        // 调用WCF进行实拣数更新
        self.axios.post(self.getServerPath(self.$store, self.$store.state.wms_serv_pick, 'SetUniteSowRowDone'), postData, {
          'headers': { 'Content-Type': 'application/json;charset=UTF-8' }
        }).then((response) => {
          if (response.data.d.RtnStatus === 'ok') {
            self.$data.billBodyToSowFinished.push(curBodyData)
            self.$data.billBody.splice(idx, 1)
            // 成功提示
            self.$notify({
              title: '提示',
              message: response.data.d.RtnMsg
            })

            self.showSowFinishAlert()
          } else {
            self.$notify.error({
              title: '错误',
              message: response.data.d.RtnMsg
            })

            // 关闭处理中标志
            self.$data.pageStates.bDealingBusiness = false
            // 关闭全屏遮罩
            self.$data.pageStates.fullscreenLoading = false
          }
        }).catch(function (error) {
          self.$notify.error({
            title: '错误',
            message: error
          })
          console.log(error)

          // 关闭处理中标志
          self.$data.pageStates.bDealingBusiness = false
          // 关闭全屏遮罩
          self.$data.pageStates.fullscreenLoading = false
        })
      },
      // 分播结束处理
      handleFinishSow() {
        let self = this
        // 空单据，直接返回
        if (this.$data.billHead.Billno === undefined || this.$data.billHead.Billno === '') {
          return
        }
        // 按钮处理中控制
        if (self.$data.pageStates.bDealingSwitch) {
          return
        }
        self.$data.pageStates.bDealingSwitch = true

        // 完成处理
        let postData = {
          'sBillNo': self.$data.billHead.Billno,
          'sOpId': self.$store.state.Opid
        }
        // 调用WCF进行单据状态更新
        self.axios.post(self.getServerPath(self.$store, self.$store.state.wms_serv_pick, 'UpdateSowFinishStat'), postData, {
          'headers': { 'Content-Type': 'application/json;charset=UTF-8' }
        }).then((response) => {
          if (response.data.d.RtnStatus === 'ok') {
            // 成功提示
            self.$notify({
              title: '提示',
              message: response.data.d.RtnMsg
            })

            // 分播完成按钮不可用
            self.$data.buttonStatus.bEndSowEnb = false
            // 获取单据按钮可用
            self.$data.buttonStatus.bGetBillEnb = true
            // 回到拣货状态
            self.$data.pageStates.bSowing = false
            // 清空数据
            self.clearFormData()
          } else {
            self.$notify.error({
              title: '错误',
              message: response.data.d.RtnMsg
            })
          }
          // 关闭处理中标志
          self.$data.pageStates.bDealingBusiness = false
          // 关闭完成中处理标志
          self.$data.pageStates.bDealingSwitch = false
          // 关闭遮罩层
          self.$data.pageStates.fullscreenLoading = false
        }).catch(function (error) {
          self.$notify.error({
            title: '错误',
            message: error
          })
          console.log(error)
          // 关闭处理中标志
          self.$data.pageStates.bDealingBusiness = false
          // 关闭完成中处理标志
          self.$data.pageStates.bDealingSwitch = false
          // 关闭遮罩层
          self.$data.pageStates.fullscreenLoading = false
        })
      },
      // 清空界面显示
      clearFormData() {
        // 清空单头数据
        this.billHead = {}
        // 清空单体数据
        this.billBody = []
        // 清空单体待播数据
        this.billBodyToSow = []
        // 清空单体数据(完成)
        this.billBodyFinished = []
        // 清空单体数据
        this.billBodyToSowFinished = []
        // 清空备用数据
        this.backupData = []
      },
      // 显示完成数 或者 剩余数
      _showFinished() {
        // 打开全屏遮罩
        this.pageStates.fullscreenLoading = true
        if (!this.pageStates.bShowFinishData) {
          // 显示完成
          // 隐藏单行完成按钮
          this.pageStates.bShowFinishData = true
          // 清空备份数据
          this.backupData = []
          // 当前数据保存
          this.billBody.forEach(function (item) {
            this.backupData.push(item)
          })
          // 显示数据赋值
          this.billBody = []
          if (this.pageStates.bSowing) {
            // 拣货界面
            this.billBodyFinished.forEach(function (item) {
              this.billBody.push(item)
            })
          } else {
            // 分播界面
            this.billBodyToSowFinished.forEach(function (item) {
              this.billBody.push(item)
            })
          }
          this.pageStates.showFinishedButtonText = '显示待拣'
        } else {
          // 显示待拣
          // 显示单行完成按钮
          this.pageStates.bShowFinishData = false
          // 清空显示数据
          this.billBody = []
          // 从备份数据恢复数据显示
          this.backupData.forEach(function (item) {
            this.billBody.push(item)
          })
          this.pageStates.showFinishedButtonText = '显示完成'
        }
        // 关闭全屏遮罩
        this.pageStates.fullscreenLoading = false
      }
    }
  })
</script>

<style scoped lang="stylus" type="text/stylus">
  @import "~stylus/variable.styl"
  .container
    width 100%

  .el-header
    font-size 50px
    line-height 70px
    text-align center
    font-weight 900

  .el-main
    font-size 25px
    font-weight 25px
    font-weight bold

  .el-row
    margin-bottom 20px

    &:last-child
      margin-bottom 0

  .el-col
    border-radius 4px

  .bg-purple-dark
    background: #99a9bf

  .bg-purple
    background #d3dce6

  .bg-purple-light
    background #e5e9f2

  .bg-yellow
    background #e6e20c

  .grid-content
    border-radius 4px
    min-height 36px

  .row-bg
    padding 10px 0
    background-color #f9fafc

  .bg-light
    background #e9e7df

  .bg-purple
    background #ddd4ce

  .large-text-l
    font-size 40px

  .large-text
    font-size 30px

  .mid-text
    font-size 25px

  .text
    font-size 20px
</style>
