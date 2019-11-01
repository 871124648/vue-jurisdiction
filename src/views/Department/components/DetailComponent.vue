<template>
  <div id="roomComponetDetail">
    <el-dialog title="房间信息详情" class="wd1050" :visible.sync="dialogVisible">
      <el-form :inline="true" :model="form" ref="form">
         <!-- <el-form-item label="编号" prop="roomId">
          <el-input size="mini" v-model.trim="form.roomId" placeholder="编号"></el-input>
        </el-form-item> -->
        <el-form-item label="住户名称" prop="userName">
          <el-input size="mini" v-model.trim="form.userName" disabled></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input size="mini" v-model.trim="form.phone" disabled></el-input>
        </el-form-item>
        <el-form-item label="证件类型" prop="certificateType">
          <el-select size="mini" v-model.trim="form.certificateType" disabled>
            <el-option
              v-for="item in certificateTypeOption"
              :key="item.id"
              :label="item.certificateType"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码" prop="certificateNo">
          <el-input size="mini" v-model.trim="form.certificateNo" disabled></el-input>
        </el-form-item>
        <el-form-item label="通讯地址" prop="postalAddress">
          <el-input size="mini" v-model.trim="form.postalAddress" disabled></el-input>
        </el-form-item>
        <el-form-item label="楼层" prop="floor">
          <el-input size="mini" v-model.trim="form.floor" disabled></el-input>
        </el-form-item>
        <el-form-item label="门牌号" prop="houseNumber">
          <el-input size="mini" v-model.trim="form.houseNumber" disabled></el-input>
        </el-form-item>
        <el-form-item label="关阀延时" prop="closeValveDelay">
          <el-select size="mini" v-model.trim="form.closeValveDelay" placeholder="-- 请选择 --" disabled>
            <el-option
              v-for="item in closeValveDelayOption"
              :key="item.id"
              :label="item.closeValveDelay"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否入住" prop="beCheckIn">
          <el-select size="mini" v-model.trim="form.beCheckIn" placeholder="-- 请选择 --" disabled>
            <el-option
              v-for="item in beCheckInOptions"
              :key="item.id"
              :label="item.beCheckIn"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收费标准" prop="chargeSchemeName">
          <el-select size="mini" v-model.trim="form.chargeSchemeName" placeholder="-- 请选择 --" disabled>
            <el-option
              v-for="item in chargeSchemeNameOptions"
              :key="item.id"
              :label="item.chargeSchemeNameType"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['dialog','editData'],
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
      ]
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
  },
  mounted () {
    this.dialogVisible = this.dialog
    this.form = Object.assign({}, this.editData)
  }
}
</script>

<style>
#roomComponetDetail .el-input--suffix .el-input__inner {
  padding-right: 16px;
}
#roomComponetDetail .el-form-item__label{
  width: 100px !important;
}
#roomComponetDetail .el-dialog {
  width: 30%;
}
#roomComponetDetail .el-input--mini .el-input__inner {
  width: 200px;
}
#roomComponetDetail .el-textarea .el-textarea__inner {
  width: 530px;
}
#roomComponetDetail .el-input--prefix .el-input__inner {
  padding-left: 16px;
}
</style>
