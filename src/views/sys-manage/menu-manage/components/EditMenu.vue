<template>
  <div id="EditMenu">
    <el-dialog title="编辑菜单" class="wd30" :visible.sync="dialogVisible">
      <el-form :inline="true" :rules="rules" :model="form" ref="form">
        <el-form-item label="菜单类型" prop="menuType" size="mini">
          <el-select v-model="form.menuType" clearable placeholder="请选择" @change="selectChange">
            <el-option
              v-for="item in options"
              :key="item.val"
              :label="item.name"
              :value="item.val">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="form.menuType !== 1?'菜单名称':'按钮名称'" prop="menuName">
          <el-input size="mini" v-model.trim="form.menuName" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" size="mini">
          <el-select v-model="form.menuParentId" clearable placeholder="请选择">
            <el-option
              v-for="item in menuList"
              :key="item.id"
              :label="item.menuName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="url" prop="url" v-if="form.menuType !== 1">
          <el-input size="mini" v-model.trim="form.url" placeholder="请输入url"></el-input>
        </el-form-item>
        <!-- <el-form-item label="操作权限" prop="buttonType" v-if="form.menuType === 1">
          <el-radio-group v-model="form.buttonType">
            <el-radio label="select">查询</el-radio>
            <el-radio label="add">新增</el-radio>
            <el-radio label="update">编辑</el-radio>
            <el-radio label="delete">删除</el-radio>
          </el-radio-group>
        </el-form-item><br> -->
        <!-- <el-form-item label="菜单logo" style="text-align:center;" v-if="form.menuType !== 1">
          <el-upload
            class="avatar-uploader"
            action=""
            :http-request="uploadFile"
            :show-file-list="false"
            :on-change="handleChange">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <button @click="dialogVisible = false" class="cancel-btn">取 消</button>
        <button type="warning" class="success-btn" @click="submitForm('form')">确 定</button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import host from '@/utils/config'
import { childMenu, menuEdit } from '@/api/api'
export default {
  inject: ['reload'],
  props: ['dialog', 'editData'],
  components: {
  },
  data () {
    // let checkBtn = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error('上级菜单不能为空'))
    //   }
    // }
    let menuType = (rule, value, callback) => {
      if (!value) {
        if (value === 0) {
          callback()
        } else {
          return callback(new Error('菜单类型不能为空'))
        }
      } else {
        callback()
      }
    }
    return {
      // fileList: [],
      dialogVisible: true,
      form: {
        menuName: '',
        menuType: '',
        buttonType: null,
        url: '',
        menuParentId: '',
        menuLogo: null
      },
      file: null,
      imageUrl: '',
      // formData: new FormData(),
      menuList: [],
      options: [
        {name: '菜单', val: 0}, {name: '按钮', val: 1}
      ],
      defaultProps: {
          children: 'children',
          label: 'label'
      },
      rules: {
        menuName: [{required: true, message: '名称不能为空', trigger: 'blur'}],
        menuType: [{validator: menuType, trigger: 'change'}],
        url: [{required: true, message: 'url不能为空', trigger: 'blur'}]
      }
    }
  },
  computed: {
  },
  watch: {
    dialogVisible () {
      this.$emit('update:dialog', this.dialogVisible)
    }
    // 'form.menuType' () {
    //   console.log('菜单类型---', this.form.menuType)
    // }
  },
  methods: {
    parenMenu () {
      childMenu({menuType: this.form.menuType}).then(res => {
        this.menuList = res
      }).catch(err => {
        console.log(err)
      })
    },
    selectChange () {
      this.parenMenu()
    },
    submitForm (form) {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (!this.form.menuParentId) {
            this.form.menuParentId = 0
          }
          menuEdit(this.form).then(res => {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            // 重新刷新菜单列表
            let menuData = [{
              name: '首页',
              url: '/main'
            }]
            menuData = menuData.concat(res)
            this.$session.set('userAuthorities', menuData)
            this.reload()
            this.$emit('getTableData', this.form)
          })
        } else {
          return false
        }
      })
    },
    getCreateTime (datetime) {
      this.form.createTime = datetime
    },
    addForm () {
    },
    fileBtn () {
      document.getElementById('file').click()
    },
    upload (e) {
      let temp = e.currentTarget.files[0]
      if (temp) {
        this.file = temp
        let imgs = document.getElementById('imgs')
        imgs.src = window.URL.createObjectURL(temp)
      }
    },
    // 上传文件，获取文件流
    handleChange (file) {
      this.file = file.raw
    },
    // 自定义上传
    uploadFile () {
      let that = this
      // 创建表单对象
      let form = new FormData()
      // 后端接受参数 ，可以接受多个参数
      form.append('file', this.file)
      // 创建核心对象
      let xmlhttp = new XMLHttpRequest()
      // 编写回调函数
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
          that.form.menuLogo = xmlhttp.responseText
          that.imageUrl = xmlhttp.responseText
        }
      }
      xmlhttp.open('post', host.host + '/compose/public/upload')
      // open设置请求方式和请求路径
      xmlhttp.setRequestHeader('Authorization', sessionStorage.getItem('token'))
      xmlhttp.setRequestHeader('customerId', sessionStorage.getItem('customerId'))
      xmlhttp.setRequestHeader('districtId', sessionStorage.getItem('districtId'))
      // send 发送
      xmlhttp.send(form)
    }
  },
  created () {
    this.form.menuName = this.editData.menuName
    this.form.menuType = this.editData.menuType
    this.form.buttonType = this.editData.buttonType
    this.form.url = this.editData.url
    this.form.menuParentId = this.editData.menuParentId
    // this.form.menuLogo = this.editData.menuLogo
    // this.imageUrl = this.editData.menuLogo
    this.form.id = this.editData.id
    // this.fileList.push({
    //   url: this.editData.menuLogo
    // })
  },
  mounted () {
    this.dialogVisible = this.dialog
  }
}
</script>

<style lang="less">
#EditMenu{
  .el-input__inner{
    width: 220px;
  }
  .tree_box{
    width: 220px;
    height: 290px;
    border: 1px solid #CFD5D9;
    padding:10px;
    padding-right: 50px;
    border-radius: 8px;
  }
  .el-form-item__label{
    width: 85px;
  }
  .uploadImg{
    height: 28px;
    padding: 5px 10px;
    background: #446998;
    border-radius: 4px;
  }
}
</style>
