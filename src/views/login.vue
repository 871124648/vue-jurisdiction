<template>
  <div>
    <div class="login_wrap">
      <div class="user_login">
        <div class="user-content">
          <div class="input_container">
            <input type="text" v-model="username" v-on:keyup.enter="handleLogin" class="input_class" placeholder="用户名">
            <input type="password" v-model="password" v-on:keyup.enter="handleLogin" class="input_class margin38" placeholder="密码" >
            <el-input type="text" v-model="usercode" @keyup.enter.native="handleLogin" class="el_input_class" placeholder="验证码">
              <div slot="suffix" id="codeBox" class="number_code" @click="handleCode">{{numCode}}</div>
            </el-input>
            <div class="marginTop17">
              <el-checkbox v-model="checked">记住密码</el-checkbox>
            </div>
            <div class="login_button_container">
              <el-button type="primary" :loading="loading" @click="handleLogin">登 录</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { login } from 'api/api'
export default {
  data () {
    return {
      showPwd: false,
      loading: false,
      username: '',
      password: '',
      usercode: '',
      checked: false,
      numCode: ''
    }
	},
	methods: {
		handleLogin () {
      if (this.username.trim() === '') {
        this.$message.error('请填写用户名！')
        return false
      }
      if (this.password.trim() === '') {
        this.$message.error('请填写密码！')
        return false
      }
      if (this.usercode.trim() === '') {
        this.$message.error('请填写验证码！')
        return false
      } else {
        if (this.usercode.toLowerCase() !== this.numCode.toLowerCase()) {
          this.$message.error('请输入正确的验证码！')
          return false
        }
      }
      this.loading = true
      login({
        userPhone: this.username,
        userPassword: this.password
      }).then(res => {
        if (res) {
          if (this.checked) {
            localStorage.setItem('userNumber', this.username)
            localStorage.setItem('password', this.password)
          }
          sessionStorage.setItem('token', res.token)
          sessionStorage.setItem('deptCount', res.deptCount) // 部门数量
          sessionStorage.setItem('staffCount', res.staffCount) // 员工数量
          this.$session.set('customerId', res.customerId)
          this.$session.set('districtId', res.districtId)
          this.$session.set('username', res.userName)
          this.$session.set('nickName', res.userName)
          this.$session.set('userId', res.userId)
          this.$session.set('logo', res.logo)
          this.$session.set('userAuthorities',
          [
            {
              name: '首页',
              url: '/main'
            },
            {
              name: '员工管理',
              children: [
                {name: '员工数据', url: '/staff', button: [{name: '查询'},{name: '新增'}, {name: '编辑'}, {name: '删除'}, {name: '导入'}, {name: '导出'}]}
              ]
            },
            {
              name: '部门管理',
              children: [
                {name: '部门数据', url: '/department', button: [{name: '查询'},{name: '新增'}, {name: '编辑'}, {name: '删除'}, {name: '导入'}, {name: '导出'}]}
              ]
            }
          ]
          )
          this.$router.push('./main')
        }
        this.loading = false
      }).catch(error => {
        console.log(error)
        this.loading = false
      })
    },
    handleCode () {
      let code = '' // 存放验证码
      let codes = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
			let codeLg = 4
			for (let i = 0; i < codeLg; i++) {
				let newCode = Math.floor(Math.random() * codes.length)
				code = code + codes[newCode]
			}
			this.numCode = code
    }
  },
  created () {
    if (localStorage.getItem('userNumber')) {
      this.username = localStorage.getItem('userNumber')
      this.password = localStorage.getItem('password')
      this.checked = true
    }
  },
  mounted () {
    this.handleCode()
  }

}
</script>
<style lang="less">
  @import "../assets/css/login.less";
</style>
