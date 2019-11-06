<template>
  <div class="indexWrap">
    <!--头部栏 开始-->
    <header :class="showMenu===true?'topWrap':'fullTopWrap'">
      <!--顶部栏 上侧-->
      <div class="header_bottom">
        <div class="tab_top_box">
          <div>
            <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="closeTag" @tab-click="clickItem">
              <el-tab-pane
                v-for="item in tags"
                :key="item.url"
                :label="item.name"
                :name="item.url"
              >
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <div class="user">
          <span>欢迎您，{{nickName}}</span>
          <el-tooltip content="修改密码">
            <img src="../assets/images/update.png" alt="修改密码" @click="dialogUpdate=true" class="update-icon">
          </el-tooltip>
          <el-tooltip content="退出">
            <img src="../assets/images/esc.png" alt="退出" @click="dialogVisible=true" class="update-icon">
          </el-tooltip>
        </div>
      </div>
      <!--顶部栏 下侧-->
    </header>
    <!--头部栏 结束-->
    <!--主框架 开始-->
    <div class="middleWrap">
      <!--左侧 开始-->
      <el-menu :default-active="currentRoute" unique-opened router background-color="#449892" :collapse="showMenu" :collapse-transition="false" class="left_box">
        <div class="left_sroll_box">
          <div class="left_logo_box">
              <router-link to="/main" >
                <img v-show="!showMenu" src="@/assets/images/logo_nav.png" class="logo_nav" alt="">
                <p v-show="!showMenu" class="logo_txt">员工管理系统</p>
                <img v-show="showMenu" src="@/assets/images/logo_nav.png" alt="" class="logoMin">
              </router-link>
            </div>
            <div v-for="(info,index) in menuList" :key="index" class="menu_box">
              <el-submenu :index="index+'2'"  v-if="info.children&&info.children.length !== 0" :class="!showMenu?'arrow_none':''">
                <template slot="title">
                  <img :src="menuImg(info.name)" alt="">
                  <span slot="title" v-if="!showMenu">{{info.name}}</span>
                </template>
                <!-- 二级菜单 -->
                <el-menu-item v-for="(childMenu,key) in info.children" :index="childMenu.url" :key="key+'00'">
                  {{childMenu.name}}
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="info.url">
                <img :src="menuImg(info.name)" alt="">
                <span slot="title">{{info.name}}</span>
              </el-menu-item>
            </div>
            <div class="tab_menu" @click="showMenu=!showMenu" :class="showMenu?'none_border':''">
              <div :class="!showMenu?'fewer_box':'min_fewer_box'">
                <img v-if="!showMenu" src="@/assets/images/tab_left.png" alt="">
                <img v-if="showMenu" src="@/assets/images/tab_right.png" alt="">
                <span v-if="!showMenu">收起</span>
              </div>
            </div>
        </div>
      </el-menu>
      <!--左侧 结束-->

      <!--右侧 开始-->
      <div :class="showMenu===true?'right':'rightFull'">
        <router-view  class="routerView"></router-view>
      </div>
      <!--右侧 结束-->
    </div>
    <!--主框架 结束-->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>是否退出登录？</span>
      <span slot="footer" class="dialog-footer">
        <button @click="dialogVisible = false" class="cancel-btn">取 消</button>
        <button type="primary" class="success-btn" @click="exit">确 定</button>
      </span>
    </el-dialog>

    <el-dialog title="修改密码" class="wd30" :visible.sync="dialogUpdate" id="updatePsw">
      <el-form label-width="100px" :rules="rules" :model="form" ref="ruleForm">
        <el-row>
          <el-col :span="24">
            <el-form-item label="原密码" size="mini" prop="oldPassword">
              <el-input type="password" v-model.trim="form.oldPassword" placeholder="请输入原密码" min="6" maxlength="12"></el-input>
            </el-form-item>
            <el-form-item label="新密码" size="mini" prop="newPassword">
              <el-input type="password" v-model.trim="form.newPassword" placeholder="请输入新密码" min="6" maxlength="12"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" size="mini" prop="confirmPassword">
              <el-input type="password" v-model.trim="form.confirmPassword" placeholder="请再次输入新密码" min="6" maxlength="12"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <button @click="dialogUpdate = false" class="cancel-btn">取 消</button>
        <button type="primary" class="success-btn" :loading="loading" @click="handleSubmit">确 定</button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import md5 from 'js-md5'
import {resetPassWord} from 'api/api'
export default {
  data () {
    const validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (value.indexOf(' ') === -1) {
          callback()
        } else {
          callback(new Error('新密码不能包含空格'))
        }
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.form.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const orgPsw = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入原密码'))
      } else {
        callback()
      }
    }
    let vm = this
    return {
      // userName: vm.$session.get('username'),
      nickName: vm.$session.get('nickName'),
      loading: false,
      showMenu: false, // 是否显示左侧菜单
      dialogVisible: false, // 提示弹框
      dialogUpdate: false, // 修改密码弹窗
      form: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      menuListData: [],
      menuList: vm.$session.get('userAuthorities'),
      tags: [
        {name: '首页', url: '/main'}
      ],
      editableTabsValue: '/main',
      tabIndex: 1,
      rules: {
        oldPassword: [{ required: true, validator: orgPsw, trigger: 'blur' }],
        newPassword: [{ required: true, validator: validatePass1, trigger: 'blur' }],
        confirmPassword: [{ required: true, validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  computed: {
    currentRoute () {
      let menuListData = this.menuListData
      let menuLength = menuListData.length
      let path = this.$route.path
      // 遍历菜单列表，匹配二级路由，高亮父级菜单
      for (let i = 0; i < menuLength; i++) {
        // 判断菜单列表是否存在当前路由的父级路由，例如path：a/b  res.url:a, 即为true
        if (path.includes(menuListData[i].url)) {
          // this.editableTabsValue = menuListData[i].url  // 如果有，就同步到标签头上面
          this.getUrl(menuListData[i].url)
          return menuListData[i].url
        }
      }
    }
  },
  watch: {
    dialogUpdate () {
      this.form.oldPassword = ''
      this.form.newPassword = ''
      this.form.confirmPassword = ''
    },
    $route (to,from) {
      let menuListData = this.menuListData
      // 获取权限按钮数据
      this.menuListData.map(res => {
        if (to.path === res.url) {
          console.log(res.button, '权限按钮')
          this.$session.set('btnPermissions', res.button)
        }
      })
      let curTag
      for (let i = 0; i < menuListData.length; i++) {
        if (to.path.includes(menuListData[i].url)) {
          curTag = {
            name: menuListData[i].name,
            url: to.path
          }
        }
      }
      let tags = this.tags
      let hash = {}
      tags = [...tags, curTag]
      const newArr = tags.reduce((item, next) => {
        if (hash[next.name]) {
          hash[next.name] = ''
        } else {
          hash[next.name] = true && item.push(next)
        }
        // hash[next.name] ? '' : hash[next.name] = true && item.push(next)
        return item
      }, [])
      this.tags = newArr
      sessionStorage.setItem('tags',JSON.stringify(this.tags))
    }
  },
  methods: {
    // 同步标签头的状态
    getUrl (url) {
      this.editableTabsValue = url
    },
    // 整理菜单列表数据
    handleMenuData () {
      let menuListLength = this.menuList.length
      let menuListData = [{name: '首页', url: '/main'}]
      // console.log(this.menuList,'菜单数据')
      for (let i = 0; i < menuListLength; i++) {
        if (this.menuList[i].children && this.menuList[i].children.length !== 0) { // 有二级菜单
          let childrenLength = this.menuList[i].children.length
          for (let j = 0; j < childrenLength; j++) {
            menuListData.push(this.menuList[i].children[j])
          }
        } else { // 无二级菜单
          menuListData.push(this.menuList[i])
        }
      }
      this.menuListData = menuListData
      // console.log(menuListData, '>>')
    },
    // 关闭面包屑
    closeTag (path) {
      let tagName
      this.tags.map(item => {
        if (item.url === path) {
          tagName = item.name
        }
      })
      let tab = JSON.parse(sessionStorage.getItem('tags'))
      let tags = []
      for (let i = 0; i < tab.length; i++) {
        if (tagName === tab[i].name) { // 关闭当前页面的tag
          if (path === this.currentRoute) {
            if (i === tab.length - 1) {
              if (tab.length - 1 !== 0) {
                this.$router.push(tab[i - 1].url)
              }
            } else {
              this.$router.push(tab[i + 1].url)
            }
          }
        } else { // 关闭当前tag(不是当前页面的tag)
          tags.push(tab[i])
          this.tags = tags
          sessionStorage.setItem('tags',JSON.stringify(tags))
        }
      }
    },
    clickItem (data) {
      console.log(data, '?????', this.editableTabsValue)
      this.$router.push({path: data.name})
    },
    // 退出登录
    exit () {
      sessionStorage.clear()
      location.reload()
      this.$router.push('/login')
    },
    // 显示/隐藏 主菜单
    showHideMenu (bool) {
      this.showMenu = bool
    },
    handleSubmit () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.handleUpdatePsw()
        } else {
          return false
        }
      })
    },
    // 修改密码
    handleUpdatePsw () {
      this.loading = true
      resetPassWord({
        id: this.$session.get('userId'),
        oldPassword: this.form.oldPassword,
        newPassword: this.form.confirmPassword // 确定后的密码
      }).then(res => {
          this.$message.success('修改成功')
          this.form.oldPassword = ''
          this.form.newPassword = ''
          this.form.confirmPassword = ''
          this.dialogUpdate = false
          this.$router.push('/login')
          this.loading = false
      })
    },
    menuImg (name) {
      if (name === '首页') {
        return require('@/assets/images/menu_h.png')
      } else if (name === '员工管理') {
        return require('@/assets/images/menu_ck.png')
      } else if (name === '部门管理') {
        return require('@/assets/images/menu_da.png')
      } else if (name === '缴费管理') {
        return require('@/assets/images/menu_jf.png')
      } else if (name === '告警管理') {
        return require('@/assets/images/menu_gj.png')
      } else if (name === '系统设置') {
        return require('@/assets/images/menu_sz.png')
      } else if (name === '系统管理') {
        return require('@/assets/images/menu_gl.png')
      } else {
        return ''
      }
    },
    removeTab () {

    }
    // 页面跳转
    // to(url) {
    //   this.$router.push(url);
    // },
  },
  created () {
  },
  mounted () {
    // this.menuList = sessionStorage.getItem('authorityList')
    let tags = sessionStorage.getItem('tags')
    if (!tags) {
      this.tags = [{name: '首页', url: '/main'}]
    } else {
      this.tags = JSON.parse(tags)
		}
    this.handleMenuData()
  }

}
</script>
<!--私有样式-->
<style scoped>
  @import "../assets/css/index.css";
  @import "../assets/css/cover.css";
</style>
<style lang="less">
  @import "../assets/css/default.less";
</style>
<style>
  #updatePsw > div {
    width: 400px!important;
  }
  .menu_width{
    width:80px;
  }
  .menu_width-max{
    width:190px;
  }
</style>
