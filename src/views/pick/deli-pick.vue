/**
* Created by  on 2019/6/6.
*/
<template>
  <el-container direction="vertical">
    <el-header
      height="auto"
      style="width: 100%">
      <el-row class="header-title">
        <el-col :span="24">
          <div
            class="grid-content"
            v-if="pageStates.curBillBcd ==='DBP'">调拨上架</div>
          <div
            class="grid-content"
            v-if="pageStates.curBillBcd ==='CDP'">仓间调拨</div>
        </el-col>
      </el-row>
      <div >
        <el-row
          :gutter="20"
          class="header-font">
          <el-col :span="12">
            <div class="grid-content">单据号：{{billHead.Billno}}</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">拣货人：{{billHead.Pickopinfo}}</div>
          </el-col>
        </el-row>
        <el-row
          :gutter="20"
          class="header-font">
          <el-col :span="12">
            <div class="grid-content">上架仓库：
              <select
                class="selectHead"
                v-model="pageStates.curWhid"
                placeholder="上架仓库"
                :disabled="pageStates.bHasBill">
                <option
                  v-for="(item,index) in whid"
                  :key="index"
                  :label="item.CountName"
                  :value="item.CountId"></option>
              </select>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">上架类型：
              <select
                class="selectHead"
                v-model="pageStates.upgdsType"
                placeholder="上架类型"
                @change='handleUpGdsType'
                :disabled="pageStates.bHasBill">
                <option
                  v-for="(item,index) in upGdsType"
                  :key="index"
                  :label="item.label"
                  :value="item.value"></option>
              </select>
            </div>
          </el-col>

        </el-row>
        <el-row :gutter="20" class="header-font" v-if="pageStates.curBillBcd ==='DBP'">
          <el-col :span="10">
            <el-input class="input1"  placeholder="请输入箱号" v-model="pageStates.curBoxcd" :disabled="pageStates.bHasBill"
                      suffix-icon="el-icon-edit" @keyup.enter.native="handleBox" :autofocus="true">
              <template slot="prepend">物流箱：</template>
            </el-input>
          </el-col>
          <el-col :span="14">
            <label :data="pageStates.Boxcds">
              <span v-if="pageStates.Boxcds.length>0" >物流箱号：</span>
              <span v-for="box in pageStates.Boxcds" :key="box">{{box}}  </span>
            </label>
          </el-col>
        </el-row>
        <el-row></el-row>
        <el-row :gutter="20" class="header-font" >
          <el-col :span="6" :offset="0">
            <el-button class="btn-setting" type="primary" size="large" round @click="handleGetTask"
                       v-loading.fullscreen.lock="pageStates.fullscreenLoading">获取任务
            </el-button>
          </el-col>
          <el-col :span="6">
            <el-button class="btn-setting" type="info" size="large" round @click="handleShowFinished"
            >{{pageStates.showFinishedButtonText}}
            </el-button>
          </el-col>
          <el-col :span="6">
            <el-button class="btn-setting" type="danger" size="large" round @click="handleCheckBill"
                       v-loading.fullscreen.lock="pageStates.fullscreenLoading"
                       :disabled="this.$data.buttonStatus.bCheckDisable">完成
            </el-button>
          </el-col>
          <el-col :span="6">
            <el-button class="btn-setting" type="warning" size="large" round @click="handleReturnToMenu"
            >退出
            </el-button>
          </el-col>
        </el-row>
      </div>
    </el-header>
    <el-main>
      <el-card class="box-card" v-for="(item,index) in billBody" :key="index">
        <div slot="header" class="clearfix">
          <span>货位号：{{item.Slcd}}</span>
          <!--<span>品名：{{item.Gdsname}}({{item.Barcode}})</span>-->
        </div>
        <div>
          <el-table :data="[item]" style="width: 100%">
            <el-table-column label="品 名" width="230">
              <template slot-scope="scope">
                <span>{{ scope.row.Gdsname }}({{scope.row.Barcode}})</span>
              </template>
            </el-table-column>
            <el-table-column prop="Pack" label="规 格" width="100">
            </el-table-column>
            <el-table-column v-if="pageStates.curBillBcd ==='CDP'" prop="Factsetnum" label="件 数" width="150">
            </el-table-column>
            <el-table-column prop="Num" label="数量" width="125">
            </el-table-column>
            <el-table-column prop="Factnum" label="实际数量" width="160" >
              <template slot-scope="scope">
                <el-input type="number" v-model="scope.row.Factnum"
                          :disabled="pageStates.bShowFinishData">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column v-if="pageStates.curBillBcd ==='DBP'" prop="Iferr" label="差异" width="150">
              <template slot-scope="scope">
                <select class="selectBody" v-model="scope.row.Iferr" placeholder="差异"
                        :disabled="pageStates.bShowFinishData">
                  <option v-for="(itm,idx) in diffType" :key="idx" :label="itm.Optionvalue" :value="itm.Optionkey"></option>
                </select>
              </template>
            </el-table-column>
            <el-table-column label="操 作" width="180">
              <template slot-scope="scope">
                <el-button class="btn-operate" @click="handleDoFinishTask(index)"
                           v-loading.fullscreen.lock="pageStates.fullscreenLoading">
                  {{pageStates.showOperateText}}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'DeliPick',
      data() {
        return {
          // 单头数据
          billHead: {
            // 单据号
            Billno: '',
            // 拣货员信息
            Pickopinfo: ''
          },
          // 单体数据
          billBody: [],
          // 已完成单体数据
          billBodyFinished: [],
          // 备份数据数组
          backupData: [],
          // 上架类型
          upGdsType: [{
            value: 'ZJ',
            label: '整件'
          }, {
            value: 'CZ',
            label: '拆整'
          }, {
            value: 'CL',
            label: '拆零'
          }],
          // 仓库
          whid: [],
          // 差异类型
          diffType: [],
          // 页面状态
          pageStates: {
            // 全屏遮罩
            fullscreenLoading: false,
            // 当前业务代码
            curBillBcd: '',
            // 是否显示已完成数据
            bShowFinishData: false,
            // 完成按钮文字
            showFinishedButtonText: '显示完成',
            // 单行操作按钮显示文字
            showOperateText: '完成',
            // 上架类型
            upgdsType: 'ZJ',
            // 业务处理中
            bDealingBusiness: false,
            // 物流箱号
            curBoxcd: '',
            Boxcds: [],
            // 仓库id
            curWhid: '',
            // 获取条件可编辑状态
            bHasBill: false
          },
          // 按钮状态
          buttonStatus: {
            bCheckDisable:true
          }
        }
      },
      computed: {},
      methods: {},
      watch: {},
      components: {}
  }
</script>

<style scoped lang="stylus" type="text/stylus">
  /*@import './../../common/css/replenishment.css';*/
  @import '../../assets/css/replenishment.css'
  @import '../../assets/css/taskcard.css'

  .selectHead {
    padding: 0px;
    margin: 0px;
    height:45px;
    width:240px;
    font-size:25px;
  }
  .selectBody {
    padding: 0px;
    margin: 0px;
    height:65px;
    width:120px;
    font-size:25px;
  }
  label{
    height:45px;
    width:auto;
    font-size:25px;
  }
  .input1 {
    height:20px;
    width:auto;
    font-size:25px;
  }
  /*.el-select-dropdown__item{*/
  /*font-size: 30px !important;*/
  /*padding: 10px !important;*/
  /*height: auto !important;*/
  /*line-height:40px !important;*/
  /*}*/
</style>
