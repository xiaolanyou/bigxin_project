<template>
  <div class="redact-container">
    <!-- 布局容器 -->
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="8" class="text-w">地区划分</el-col>
          <el-col :span="16" class="text-w">价格编辑</el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="32%" class="hei-100">
          <!-- Tree 树形控件 -->
          <el-tree
            :data="treedata"
            show-checkbox
            node-key="cityId"
            ref="tree"
            :props="defaultProps"
            @check="checkHandler"
          >
          </el-tree>
        </el-aside>
        <el-main>
          <!-- from 表单 -->
          <el-form
            :label-position="labelPosition"
            label-width="80px"
            :model="rendererData"
            :rules="rules"
            ref="ruleFormRef"
          >
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="首重 (kg)" prop="fweight">
                  <el-input v-model.number="rendererData.fweight"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="首重价格 (元)" prop="fwprice">
                  <el-input v-model.number="rendererData.fwprice"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="续重 (kg)" prop="cweight">
                  <el-input v-model.number="rendererData.cweight"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="续重价格 (元)" prop="cwprice">
                  <el-input v-model.number="rendererData.cwprice"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <!-- <el-form-item label="门店名:">
                  <el-select v-model="value" clearable placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item> -->
              </el-col>
              <el-col :span="12">
                <el-form-item label="分组名称" prop="groupname">
                  <el-input v-model="rendererData.groupname"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30" class="mar-t">
              <el-col :span="6" :offset="8">
                <el-button @click="callOff">取消</el-button>
              </el-col>
              <el-col :span="6">
                <el-button type="primary" @click="datamit('ruleFormRef')">提交</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 导入 vuex
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Redact',
  data() {
    return {
      // 需要修改的数据
      amendData: [],
      // 修改的城市 id
      Idcitys: '',
      // 通过接口获取的需要默认展示的tree的数组 [1,3,15,18,…]
      stockpileId: [],
      // 地区数据
      treedata: [
        /*{
          cityId: 1,
          cityName: '四川省',
          children: [
            {
              cityId: 4,
              cityName: '成都市'
            },
            {
              cityId: 9,
              cityName: '绵阳市'
            },
            {
              cityId: 10,
              cityName: '自贡市'
            },
            {
              cityId: 11,
              cityName: '攀枝花市'
            },
            {
              cityId: 12,
              cityName: '泸州市'
            },
            {
              icityIdd: 13,
              cityName: '德阳市'
            },
            {
              cityId: 14,
              cityName: '广元市'
            },
            {
              icityIdd: 15,
              cityName: '遂宁市'
            }
          ]
        }
        {
          cityId: 2,
          cityName: '广东省',
          children: [
            {
              id: 4,
              label: '成都市'
            },
            {
              id: 9,
              label: '绵阳市'
            },
            {
              id: 10,
              label: '自贡市'
            },
            {
              id: 11,
              label: '攀枝花市'
            },
            {
              id: 12,
              label: '泸州市'
            },
            {
              id: 13,
              label: '德阳市'
            },
            {
              id: 14,
              label: '广元市'
            },
            {
              id: 15,
              label: '遂宁市'
            }
          ]
        } */
      ],
      // 修改地区数据的默认名字
      defaultProps: {
        id: 'cityId',
        children: 'children',
        label: 'cityName'
      },
      // 右侧输入框
      labelPosition: 'top',
      // 表单数据
      /* formLabelAlign: {
        fweight: 0,
        fwprice: 0,
        cweight: 0,
        cwprice: 0,
        groupname: ''
      }, */
      // select 选择器
      value: '',
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        }
      ],
      // 修改表单的规则
      rules: {
        fweight: [{ required: true, message: '请输入首重', trigger: 'blur' }],
        fwprice: [{ required: true, message: '请输入首重价格', trigger: 'blur' }],
        cweight: [{ required: true, message: '请输入续重', trigger: 'blur' }],
        cwprice: [{ required: true, message: '请输入续重价格', trigger: 'blur' }],
        groupname: [
          { required: true, message: '请输入分组名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState(['tableData', 'rendererData'])
  },
  methods: {
    ...mapMutations(['formDatax', 'clickEdit']),
    // 提交数据
    datamit(ruleFormRef) {
      this.$refs[ruleFormRef].validate((valid) => {
        if (valid) {
          let objDate = {
            ruleId: this.rendererData.ruleId,
            cityId: this.rendererData.cityId,
            bourn: this.rendererData.bourn,
            fweight: this.rendererData.fweight,
            fwprice: this.rendererData.fwprice,
            cweight: this.rendererData.cweight,
            cwprice: this.rendererData.cwprice,
            groupname: this.rendererData.groupname
          }
          this.clickEdit(objDate)
          this.formDatax(this.tableData)
          // console.log(this.rendererData)
          this.amendData = this.rendererData
          // console.log(this.amendData)
          // let obj = {
          //   cityId: this.Idcitys !== '' ? this.Idcitys : this.amendData.cityId,
          //   defaultNumber: this.amendData.fweight,
          //   defaultPrice: this.amendData.fwprice,
          //   createNumber: this.amendData.cweight,
          //   creatPrice: this.amendData.cwprice,
          //   groupName: this.amendData.groupname,
          //   ruleId: this.amendData.ruleId,
          //   created: this.Time(),
          //   updated: this.Time()
          // }
          // console.log(obj)

          this.$axios({
            method: 'post',
            url: '/freight/update',
            data: {
              cityId: this.Idcitys !== '' ? this.Idcitys : this.amendData.cityId,
              defaultNumber: this.amendData.fweight,
              defaultPrice: this.amendData.fwprice,
              createNumber: this.amendData.cweight,
              creatPrice: this.amendData.cwprice,
              groupName: this.amendData.groupname,
              ruleId: this.amendData.ruleId,
              created: this.Time(),
              updated: this.Time()
            }
          }).then((res) => {
            // console.log(res)
            if (res.code === '200') {
              this.$message({
                type: 'success',
                message: '修改成功!',
                duration: 1500
              })
              this.$router.replace('/comm/freight')
            } else {
              this.$message({
                type: 'error',
                message: '修改失败!',
                duration: 1500
              })
              return false
            }
          })

          // this.$router.replace('/lr/freight')
          // console.log(this.rendererData.tabId)
          // console.log(this.tableData)
          // this.tableData.some((item) => {
          // if (item.tabId === this.rendererData.tabId) {
          // this.tableData.splice(item, 1)
          // this.tableData.push(objDate)
          // console.log(this.tableData)
          // console.log(item)
          // 数组对象排序
          // this.tableData.sort(function (obj1, obj2) {
          //   return obj1.tabId - obj2.tabId
          // })
          // console.log(this.tableData)
          // this.formDatax(this.tableData)
          // this.$router.replace('/lr/freight')
          // return true
          // }
          // console.log(item.tabId)
          // })
        } else {
          this.$message({
            type: 'warning',
            message: '请正确完成表格的填写!',
            duration: 1500
          })
          return false
        }
      })
    },
    // 取消按钮
    callOff() {
      this.$router.push('/comm/freight')
    },
    // 获取地区划分的数据
    getareaList() {
      this.$axios.get('/freight/getCity').then((res) => {
        // console.log(res.data)
        if (res.code === '200') {
          res.data.forEach((item) => {
            let obj = {
              cityId: item.cityId,
              cityName: item.cityName,
              cityType: item.cityType,
              defaultPrice: item.defaultPrice,
              pid: item.pid,
              children: []
            }
            this.treedata.push(obj)
          })
          // console.log(this.treedata)
          // console.log(this.rendererData.cityId)
          this.stockpileId.push(this.rendererData.cityId)
          // 再请求后台获取它上一级的省份
          this.$axios
            .get('/freight/getCityById', {
              params: {
                id: this.rendererData.cityId
              }
            })
            .then((res) => {
              if (res.code === '200') {
                // console.log(res.data.pid)
                this.$axios
                  .get('/freight/getCityById', {
                    params: {
                      id: res.data.pid
                    }
                  })
                  .then((res) => {
                    // console.log(res.data)
                    if (res.code === '200') {
                      this.checkHandler(res.data)
                    }
                  })
              }
            })
          // this.checkHandler(this.rendererData)
        }
      })
    },
    // 城市复选框
    checkHandler(val) {
      // console.log('触发了', val)
      // console.log(val.cityId)
      this.Idcitys = val.cityId
      let that = this
      // let bbq = []
      // bbq.push(val.cityId)
      // console.log(bbq)
      // // this.$refs.tree.setCheckedKeys(bbq)
      // that.$refs.tree.setCheckedNodes(bbq);
      this.$axios
        .get('/freight/getCity', {
          params: {
            id: val.cityId
          }
        })
        .then((res) => {
          // console.log(res)
          if (res.code === '200') {
            // console.log(res.data)
            this.treedata.some((item, index) => {
              if (item.cityId === val.cityId) {
                // this.treedata[index].children.push(res.data[index])
                res.data.forEach((item2) => {
                  this.treedata[index].children.push(item2)
                })
                // console.log(this.treedata)

                // 选中 tree 复选框
                that.$nextTick(() => {
                  if (that.$refs.tree) {
                    that.$refs.tree.setCheckedKeys(that.stockpileId)
                  }
                })

                // 退出循环
                return true
              }
            })
          }
        })
    }
  },
  created() {
    this.getareaList()
  }
}
</script>

<style lang="less" scoped>
// 大盒子
.redact-container {
  width: 100%;
  height: 93%;
  background-color: #fff;
  // 容器大盒子
  .el-container {
    width: 100%;
    height: 100%;
    // 容器头部
    .el-header {
      line-height: 60px;
      border-bottom: 1px solid #e9e9e9;
    }
    // 容器头部标题
    .text-w {
      font-weight: 600;
    }
    // 侧边栏
    .el-aside {
      height: 90%;
      border-right: 2px solid #e9e9e9;
    }
    // Tree 树形
    .el-tree {
      padding: 2% 0 2% 15%;
      height: 96%;
      overflow-x: hidden;
    }
    // Select 选择器
    .el-select {
      width: 100%;
    }
    // 取消和提交按钮
    .mar-t {
      margin-top: 50px;
    }
  }
}
</style>
