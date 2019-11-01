<template>
  <div id="addRoomComponet">
    <el-dialog title="新增房间信息" class="wd1050" :visible.sync="dialogVisible">
      <el-form :inline="true" :rules="rules" :model="form" ref="form">
        <!-- <el-form-item label="编号" prop="roomId">
          <el-input size="mini" v-model.trim="form.roomId" placeholder="编号"></el-input>
        </el-form-item> -->
        <el-form-item label="住户名称" prop="userName">
          <el-input size="mini" v-model.trim="form.userName" placeholder="住户名称"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input size="mini" v-model.trim="form.phone" placeholder="手机号码"></el-input>
        </el-form-item>
        <el-form-item label="证件类型" prop="certificateType">
          <el-select size="mini" v-model.trim="form.certificateType" clearable placeholder="-- 请选择 --">
            <el-option
              v-for="item in certificateTypeOption"
              :key="item.id"
              :label="item.certificateType"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码" prop="certificateNo">
          <el-input size="mini" v-model.trim="form.certificateNo" placeholder="证件号码"></el-input>
        </el-form-item>
        <el-form-item label="通讯地址" prop="postalAddress">
          <el-input size="mini" v-model.trim="form.postalAddress" placeholder="通讯地址"></el-input>
        </el-form-item>
        <el-form-item label="楼层" prop="floor">
          <el-input size="mini" v-model.trim="form.floor" placeholder="楼层"></el-input>
        </el-form-item>
        <el-form-item label="门牌号" prop="houseNumber">
          <el-input size="mini" v-model.trim="form.houseNumber" placeholder="门牌号"></el-input>
        </el-form-item>
        <el-form-item label="关阀延时" prop="closeValveDelay">
          <el-select size="mini" v-model.trim="form.closeValveDelay" clearable placeholder="-- 请选择 --">
            <el-option
              v-for="item in closeValveDelayOption"
              :key="item.id"
              :label="item.closeValveDelay"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否入住" prop="beCheckIn">
          <el-select size="mini" v-model.trim="form.beCheckIn" clearable placeholder="-- 请选择 --">
            <el-option
              v-for="item in beCheckInOptions"
              :key="item.id"
              :label="item.beCheckIn"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收费标准" prop="chargeSchemeName">
          <el-select size="mini" v-model.trim="form.chargeSchemeName" clearable placeholder="-- 请选择 --">
            <el-option
              v-for="item in chargeSchemeNameOptions"
              :key="item.id"
              :label="item.chargeSchemeNameType"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <button @click="dialogVisible = false" class="cancel-btn">取 消</button>
        <button type="warning" class="success-btn" @click="submitForm('form')">确 定</button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {roomAdd} from 'api/api'
export default {
  props: ['dialog'],
  components: {
  },
  data () {
    return {
      dialogVisible: true,
      form: {
        postalAddress: '',
        certificateNo: '',
        certificateType: '',
        chargeSchemeName: '',
        closeValveDelay: '',
        floor: '',
        houseNumber: '',
        phone: '',
        beCheckIn: '',
        userName: ''
      },
      certificateTypeOption: [
        {
          id: '身份证',
          certificateType: '身份证'
        },
        {
          id: '军官证',
          certificateType: '军官证'
        },
        {
          id: '其他',
          certificateType: '其他'
        }
      ],
      closeValveDelayOption: [
        {
          id: '1小时',
          closeValveDelayOption: '1小时'
        },
        {
          id: '3小时',
          closeValveDelayOption: '3小时'
        },
        {
          id: '5小时',
          closeValveDelayOption: '5小时'
        },
        {
          id: '12小时',
          closeValveDelayOption: '12小时'
        },
        {
          id: '24小时',
          closeValveDelayOption: '24小时'
        },
        {
          id: '48小时',
          closeValveDelayOption: '48小时'
        }
      ],
      chargeSchemeNameOptions: [
        {
          id: '1度1元',
          chargeSchemeName: '1度1元'
        },
        {
          id: '1度1.2元',
          chargeSchemeName: '1度1.2元'
        }
      ],
      beCheckInOptions: [
        {
          id: '是',
          beCheckIn: '是'
        },
        {
          id: '否',
          beCheckIn: '否'
        }
      ],
      respectiveRegionOptions: [
        {
          id: '选项1',
          respectiveRegion: '厦门'
        },
        {
          id: '选项2',
          respectiveRegion: '泉州'
        }
      ],
      rules: {
        userName: [{required: true, validator: this.$validate.UserName, trigger: 'blur'}],
        phone: [{required: true, validator: this.$validate.UserPhone, trigger: 'blur'}],
        houseNumber: [{required: true, validator: this.$validate.HouseNumber, trigger: 'blur'}],
        certificateNo: [{required: true, validator: this.$validate.CertificateNo, trigger: 'blur'}],
        certificateType: [{required: true, message: '请选择证件类型', trigger: 'change'}],
        chargeSchemeName: [{required: true, message: '请选择收费标准', trigger: 'change'}],
        closeValveDelay: [{required: true, message: '请选择关阀延时', trigger: 'change'}],
        floor: [{required: true, validator: this.$validate.Floor, trigger: 'blur'}],
        postalAddress: [{required: true, validator: this.$validate.PostalAddress, trigger: 'blur'}],
        beCheckIn: [{required: true, message: '请选择是否入住', trigger: 'change'}]
      }
    }
  },
  computed: {
  },
  watch: {
    dialogVisible () {
      this.$emit('update:dialog', this.dialogVisible)
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addForm()
        } else {
          return false
        }
      })
    },
    addForm () {
      let certificateNo = this.form.certificateNo
      let iSum = 0
      let aCity = { 11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外' }
      let sBirthday = certificateNo.substr(6, 4) + '-' + Number(certificateNo.substr(10, 2)) + '-' + Number(certificateNo.substr(12, 2))
      let d = new Date(sBirthday.replace(/-/g, '/'))
      let arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
      let arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
      if (this.form.certificateType === '身份证') {
        for (let i = 0; i < 17; i++) iSum += certificateNo.substr(i, 1) * arrInt[i]
          let residue = arrCh[iSum % 11]
        if (!/^\d{17}(\d|x)$/i.test(certificateNo)) {
          this.$message.error('身份证长度或格式错误!')
          return
        } if (aCity[parseInt(certificateNo.substr(0, 2))] === null) {
          this.$message.error('身份证地区非法!')
          return
        } if (sBirthday !== (d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate())) {
          this.$message.error('身份证上的出生日期非法!')
          return
        } if (residue !== certificateNo.substr(17, 1)) {
          this.$message.error('身份证号非法!')
          return
        }
      }
      roomAdd({
        ...this.form
      }).then(res => {
        this.$message.success('新增房间信息成功!')
        this.dialogVisible = false // 让弹窗消失掉
        this.$emit('getTableData')
      })
    }
  },
  mounted () {
    this.dialogVisible = this.dialog
  }
}
</script>

<style>
#addRoomComponet .el-input--suffix .el-input__inner {
  padding-right: 16px;
}
#addRoomComponet .el-form-item__label{
  width: 100px !important;
}
#addRoomComponet .el-dialog {
  width: 30%;
}
#addRoomComponet .el-input--mini .el-input__inner {
  width: 200px;
}
#addRoomComponet .el-textarea .el-textarea__inner {
  width: 530px;
}
#addRoomComponet .el-input--prefix .el-input__inner {
  padding-left: 16px;
}
</style>
