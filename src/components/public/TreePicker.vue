<template>
  <div class="treePicker">
    <el-input placeholder="关键字搜索" v-model="filterText"></el-input>
    <label v-if="!isPlaceholer()&&!filterText" class="keyword-label">关键字搜索</label>
    <div class="tree_list">
      <el-tree
        :data="treeData"
        node-key="id"
        default-expand-all
        :props="defaultProps"
        :filter-node-method="filterNode"
        @node-click="dataChang"
        ref="tree">
        <span class="custom-tree-node" slot-scope="{ node, data }" style="font-size:14px;">
          <img v-if="data.isMachine" src="@/assets/images/tree_machine.png" alt="" class="tree_img">
          <img v-else src="@/assets/images/tree_qy.png" alt="" class="tree_img">
          <span>{{node.label}}</span>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    disabled: '',
    pickerDate: {},
    treeData: {
      default: () => []
    }
  },
  data () {
    // let vm = this
    return {
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    isPlaceholer () {
      let input = document.createElement('input')
      return 'placeholder' in input
    },
    // 过滤节点
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 选中时触发
    dataChang (obj, node) {
      if (obj.children) {
        return false
      } else {
        this.$emit('getDataFun', obj.id)
      }
    },
    // 实现递归数据重组,标记层级
    getDefaultId (data,treeDex) {
      data.map((item, dex) => {
        if (item.children) {
          if (typeof treeDex === 'number') {
            treeDex += 1
            item.num = treeDex
          } else {
            treeDex = 0
          }
          this.getDefaultId(item.children,treeDex)
        } else {
          data.map(lis => {
            if (lis.children && lis.num === 2) {
                lis.children.map((itemdata) => {
                  itemdata.isMachine = true
                })
            }
          })
          console.log(data,'??')
        }
      })
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  created () {
    this.getDefaultId(this.treeData)
  }
}
</script>

<style>
 .treePicker .el-input .el-input__inner {
    border-radius: 8px;
    height: 30px;
    line-height: 30px;
  }
 .treePicker .el-input .el-input__suffix {
    right: 15px;
  }
</style>
<style scoped>
 .treePicker .el-input {
    width: 198px;
    margin: 12px 11px 24px 11px;
  }
  .treePicker .tree_img{
    position: relative;
    top:1px;
    margin-right: 2px;
  }
  .treePicker .keyword-label {
    position: relative;
    bottom: 48px;
    left: 25px;
    font-size: 14px;
  }
</style>
