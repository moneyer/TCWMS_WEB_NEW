<template>
  <div class="login-wrap">
    <span class="project-title">同驰WMS系统</span>
    <div class="login-wrapper">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="0px"
      >
        <el-form-item prop="userName">
          <el-input
            v-model="ruleForm.userName"
            placeholder="工号"
            class="large-font"
            size="large"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            placeholder="密码"
            class="large-font"
            size="large"
            @keyup.enter.native="submitForm('ruleForm')"
          />
        </el-form-item>
        <div class="login-btn">
          <el-button
            type="primary"
            class="large-font"
            @click="submitForm('ruleForm')"
          >
            登录
          </el-button>
        </div>
        <p class="tips-text">
          {{ ruleForm.tips }}
        </p>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { userLogin } from 'api/user'
  import pageCreate from 'utils/page-creat'

  export default pageCreate({
    data() {
      return {
        ruleForm: {
          userName: '9999',
          password: '',
          tips: 'Tips : 用户名和密码与MIS系统相同。'
        },
        rules: {
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm () {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this._login()
          } else {
            this.$_showWarningTips('输入信息不正确，请重试！')
            return false
          }
        })
      },
      _login() {
        // let userInfo = { 'sOpCd': this.ruleForm.userName, 'sPwd': this.ruleForm.password }
        let userInfo = { userName: this.ruleForm.userName, password: this.ruleForm.password }
        userLogin(userInfo)
          .then(data => {
              this.initStoreLoginInfo(data, this)
              window.localStorage.clear()
              // 登录信息保存到localStorage
              window.localStorage.setItem('storeInfo', JSON.stringify(data))
              this.$_routerPush('/menu')
          })
      }
    }
  })
</script>

<style scoped lang="stylus" type="text/stylus">
  @import '~stylus/variable.styl'
  @import '~css/main.css'

  .login-wrap
    position relative
    width 100%
    height 100%
    background #324157

    .project-title
      position absolute
      display block
      top 50%
      width 100%
      margin-top -230px
      text-align center
      font-size $font-size-large-xx
      color $color-white

  .login-wrapper
    position absolute
    left 50%
    top 50%
    width 320px
    transform translate(-50%, -50%)
    padding $spacing-module
    border-radius $border-radius-small-ss
    background $color-background
    font-size $font-size-small

  .login-btn
    text-align center

  .login-btn button
    width 100%
    height 50px

  .el-form
    width 100%
    height 100%

  .large-font
    font-size $font-size-small

  .tips-text
    font-size $font-size-smaller-s
    line-height 30px
    color $color-text-secondary
    padding $spacing-text 0
</style>
