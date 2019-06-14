<template>
  <div class="login-wrap">
    <div class="project-title">同驰WMS系统</div>
    <div class="login-wrapper">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="0px">
        <el-form-item prop="userName">
          <el-input
            v-model="ruleForm.userName"
            placeholder="工号"
            class="large-font"
            size="large"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="密码"
            v-model="ruleForm.password"
            class="large-font"
            size="large"
            @keyup.enter.native="submitForm('ruleForm')"/>
        </el-form-item>
        <div class="login-btn">
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            class="large-font">登录</el-button>
        </div>
        <p class="tips-text">{{ ruleForm.tips }}</p>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { userLogin } from '../../api/user'

  export default {
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
      showTips(message, type) {
        this.$message({
          message: message,
          duration: 2000,
          center: true,
          offset: 420,
          type: type
        })
      },
      submitForm: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this._login()
          } else {
            this.showTips('输入信息不正确，请重试！', 'info')
            return false
          }
        })
      },
      _login() {
        // let userInfo = { 'sOpCd': this.ruleForm.userName, 'sPwd': this.ruleForm.password }
        let userInfo = { 'userName': this.ruleForm.userName, 'password': this.ruleForm.password }
        if (!userInfo) {
          return false
        }
        userLogin(userInfo)
          .then(data => {
            if (data.Opid !== 'err') {
              this.initStoreLoginInfo(data, this)
              window.localStorage.clear()
              // 登录信息保存到localStorage
              window.localStorage.setItem('storeInfo', JSON.stringify(data))
              this.$router.push('/menu')
            } else {
              Message.warning(data.Opname)
              // tip 是否显示错误信息
              this.$data.ruleForm.tips = data.Opname
            }
          })
          .catch(
             (error) => {
               this.showTips(error.message, 'error')
            }
          )
      }
    }
  }
  document.title = '登录-同驰WMS系统'
</script>

<style scoped lang="stylus" type="text/stylus">
  @import "../../assets/stylus/variable.styl"
  @import '../../assets/css/main.css'
  @import '../../assets/css/color-dark.css'

  .login-wrap
    position relative
    width 100%
    height 100%

    .project-title
      position absolute
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
