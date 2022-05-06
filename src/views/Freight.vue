<template>
  <div class="freight-container">
    <!-- 面包屑导航 -->
    <el-row class="title" type="flex" align="middle">
      <el-col>
        <el-breadcrumb separator=" ">
          <el-breadcrumb-item>当前位置:</el-breadcrumb-item>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/comm/workbench' }">工作台 </el-breadcrumb-item>
            <el-breadcrumb-item>营销配置</el-breadcrumb-item>
            <el-breadcrumb-item>运费管理</el-breadcrumb-item>
          </el-breadcrumb>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!-- 编辑按钮 -->
    <div class="bgcf">
      <el-row>
        <el-col :span="24">
          <el-button type="primary" @click="addBtn" class="addt">添加数据</el-button>
          <el-button
            type="primary"
            @click="TabBtn"
            class="addt"
            v-text="city.flag === true ? '切换为目的地城市' : '切换为目的地编号'"
          ></el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="tables" border style="width: 75%">
        <el-table-column prop="tabId" label="序号" width="80" align="center" type="index"></el-table-column>
        <el-table-column :prop="city.pross" :label="city.tableName" width="120" align="center"> </el-table-column>
        <el-table-column prop="fweight" label="首重(kg)" width="120" align="center"></el-table-column>
        <el-table-column prop="fwprice" label="首重价格(元)" width="120" align="center"></el-table-column>
        <el-table-column prop="cweight" label="续重(kg)" width="120" align="center"></el-table-column>
        <el-table-column prop="cwprice" label="续重价格(元)" width="120" align="center"></el-table-column>
        <el-table-column prop="groupname" label="分组名称" width="120" align="center"></el-table-column>
        <el-table-column prop="" label="操作" align="center">
          <template slot-scope="scope">
            <el-tooltip content="编辑" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" @click="editBtn(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页功能 -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[2, 3, 5, 8]"
        :page-size="2"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.pageTotal"
      >
      </el-pagination>
    </div>

    <!-- 添加 Dialog 对话框 -->
    <el-dialog
      title="添加数据"
      :visible.sync="centerDialogVisible"
      width="80%"
      center
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <el-container>
        <el-header style="border-bottom: 0.125rem solid #ccc">
          <el-row>
            <el-col :span="8" class="text-w">地区划分</el-col>
            <el-col :span="16" class="text-w" style="padding-left: 20px">价格编辑</el-col>
          </el-row>
        </el-header>
        <el-container>
          <el-aside width="32%" class="hei-100" style="border-right: 2px solid #ccc">
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
            <el-form label-width="7.5rem" :model="addDialogForm" :rules="rules" ref="ruleFormRef">
              <el-row :gutter="30">
                <el-col :span="12">
                  <el-form-item label="首重 (kg)" prop="defaultNumber">
                    <el-input v-model="addDialogForm.defaultNumber"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="首重价格 (元)" prop="defaultPrice">
                    <el-input v-model="addDialogForm.defaultPrice"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="30">
                <el-col :span="12">
                  <el-form-item label="续重 (kg)" prop="createNumber">
                    <el-input v-model="addDialogForm.createNumber"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="续重价格 (元)" prop="createPrice">
                    <el-input v-model="addDialogForm.createPrice"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="30">
                <el-col :span="12">
                  <el-form-item label="分组名称" prop="groupName">
                    <el-input v-model="addDialogForm.groupName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-main>
        </el-container>
      </el-container>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addingData('ruleFormRef')">确 定</el-button>
        <el-button @click="cancelBtn('ruleFormRef')" style="margin-left: 1.875rem">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 导入 vuex
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'freight',
  data() {
    // 自定义表单规则
    let priceValidator = (rule, value, callback) => {
      // let rul = /^\d{0,8}\.{0,1}(\d{1,2})?$/
      let rul = /^[-\+]?\d{0,8}\.{0,1}(\d{1,2})?$/
      if (rul.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的重量或价格 例: 10.00'))
      }
    }
    return {
      // 存放 Tree 树形控件
      treedata: [],
      // 修改存放 Tree 树形控件的默认名字
      defaultProps: {
        id: 'cityId',
        children: 'children',
        label: 'cityName'
      },
      // 存放城市名
      cityNames: [],
      // 存放要切换城市的对象
      city: {
        flag: true,
        tableName: '目的地编号',
        pross: 'cityId'
      },
      // 添加 Dialog 对话框
      centerDialogVisible: false,
      // 添加数据表单
      addDialogForm: {
        cityId: '',
        defaultNumber: '',
        defaultPrice: '',
        createNumber: '',
        createPrice: '',
        groupName: ''
      },
      // 表单规则
      rules: {
        defaultNumber: [
          { required: true, message: '请输入首重 (kg)', trigger: 'blur' },
          { type: 'number', validator: priceValidator, trigger: 'blur' }
        ],
        defaultPrice: [
          { required: true, message: '请输入首重价格 (元)', trigger: 'blur' },
          { type: 'number', validator: priceValidator, trigger: 'blur' }
        ],
        createNumber: [
          { required: true, message: '请输入续重 (kg)', trigger: 'blur' },
          { type: 'number', validator: priceValidator, trigger: 'blur' }
        ],
        createPrice: [
          { required: true, message: '请输入续重价格 (元)', trigger: 'blur' },
          { type: 'number', validator: priceValidator, trigger: 'blur' }
        ],
        groupName: [
          { required: true, message: '请输入分组名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字', trigger: 'blur' }
        ]
      },
      // 分页
      page: {
        pageCount: 1,
        pageSize: 2,
        pageTotal: 0
      }
    }
  },
  computed: {
    ...mapState(['tableData', 'rendererData']),
    // 表格数据
    tables() {
      let pageArr = this.showPages(this.page.pageCount, this.page.pageSize, this.tableData)
      // console.log(pageArr)
      return pageArr
    }
  },
  methods: {
    // 添加数据按钮
    addBtn() {
      // 发起请求获取所有省份的数据
      this.$axios.get('/freight/getCity').then((res) => {
        console.log(res)
        if (res.code === '200') {
          // 通过循环向 Tree 树形控件里添加数据
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
        }
      })
      // 显示 Dialog 对话框
      this.centerDialogVisible = true
    },
    // 添加数据 Dialog 对话框 城市复选框
    checkHandler(val) {
      // console.log('触发了', val)
      // console.log(val.cityId)
      this.addDialogForm.cityId = val.cityId
      console.log(this.addDialogForm.cityId)
      // 通过点击获取该省份的 id，再通过省份id发起请求去查找省份下的所有城市
      this.$axios
        .get('/freight/getCity', {
          params: {
            id: val.cityId
          }
        })
        .then((res) => {
          console.log(res)
          if (res.code === '200') {
            // 点击获取到的省级id,通过循环遍历找出 Tree 数据中所对应的省级id
            this.treedata.some((item, index) => {
              if (item.cityId === val.cityId) {
                res.data.forEach((item2) => {
                  this.treedata[index].children.push(item2)
                })
                // 退出循环
                return true
              }
            })
            // 添加到其children节点下
            //
          }
        })
    },
    // 添加数据确认按钮 Dialog 对话框
    addingData(ruleFormRef) {
      this.$refs[ruleFormRef].validate((valid) => {
        if (valid && this.addDialogForm.cityId !== '') {
          this.$axios({
            method: 'post',
            url: '/freight/insert',
            data: {
              cityId: this.addDialogForm.cityId,
              createPrice: this.addDialogForm.createPrice,
              createNumber: this.addDialogForm.createNumber,
              created: this.Time(),
              defaultNumber: this.addDialogForm.defaultNumber,
              defaultPrice: this.addDialogForm.defaultPrice,
              groupName: this.addDialogForm.groupName,
              updated: this.Time()
            }
          }).then((res) => {
            console.log(res)
            if (res.code === '200') {
              this.$message({
                type: 'success',
                message: '添加数据成功!',
                duration: 1500
              })
              // 清空表单
              this.addDialogForm = {
                cityId: '',
                defaultNumber: '',
                defaultPrice: '',
                createNumber: '',
                createPrice: '',
                groupName: ''
              }
              // 清空表单规则
              this.$refs[ruleFormRef].resetFields()
              // 重新请求数据
              this.getList2()
              // 隐藏 Dialog 对话框
              this.centerDialogVisible = false
            } else {
              this.$message({
                type: 'error',
                message: '添加数据失败!',
                duration: 1500
              })
              // 清空表单
            }
          })
        } else {
          this.$message({
            type: 'warning',
            message: '请查看是否选择了一个城市或是正确完成表单了的填写!',
            duration: 2000
          })
          return false
        }
      })
    },
    // 添加数据取消按钮
    cancelBtn(ruleFormRef) {
      // 清空表单
      this.addDialogForm = {
        cityId: '',
        defaultNumber: '',
        defaultPrice: '',
        createNumber: '',
        createPrice: '',
        groupName: ''
      }
      // 清空表单规则
      this.$refs[ruleFormRef].resetFields()
      // 隐藏 Dialog 对话框
      this.centerDialogVisible = false
    },
    // 编辑按钮
    editBtn(row) {
      // console.log(row)
      this.clickEdit(row)
      this.$router.push('/comm/redact')
    },
    ...mapMutations(['formDatax', 'clickEdit', 'addTables']),
    // 获取表格的数据
    getList2() {
      // 获取表格的数据
      this.$axios.get('/freight/getList').then((res) => {
        // console.log('获取表格的数据', res)
        if (res.code === '200') {
          let arr = []
          res.data.forEach((item) => {
            // console.log(item)
            let obj = {
              ruleId: item.ruleId,
              cityId: item.cityId,
              bourn: '',
              fweight: item.defaultNumber,
              fwprice: item.defaultPrice,
              cweight: item.createNumber,
              cwprice: item.creatPrice,
              groupname: item.groupName
            }
            arr.push(obj)
            // 请求城市获取城市名
            this.$axios({
              url: '/freight/getCityById',
              method: 'get',
              params: {
                id: item.cityId
              }
            }).then((res2) => {
              // console.log(res2)
              if (res2.code === '200') {
                this.cityNames.push(res2.data)
              }
            })
          })
          // 将总数添加到分页中
          this.page.pageTotal = arr.length

          this.formDatax(arr)
          // console.log('存放', this.cityNames)
        }
      })
    },
    // 把城市编号切换为城市名
    TabBtn() {
      // console.log(this.tableData)
      this.city.flag = !this.city.flag
      if (!this.city.flag) {
        this.city.tableName = '目的地城市'
        let cityArr = []
        // 循环添加城市
        this.tableData.forEach((item) => {
          this.cityNames.some((item2) => {
            if (item.cityId === String(item2.cityId)) {
              cityArr.push(item2.cityName)
              return true
            }
          })
        })
        this.addTables(cityArr)
        // 切换列表城市名
        this.city.pross = 'bourn'
      } else {
        this.city.tableName = '目的地编号'
        this.city.pross = 'cityId'
      }
    },
    // 分页功能 当前页码
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.page.pageCount = val
    },
    // 分页功能 每页多少条
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.page.pageSize = val
    }
  },
  // 生命周期函数调用 axios
  created() {
    this.getList2()
  }
}
</script>

<style lang="less" scoped>
// 大盒子
.freight-container {
  // 导航面包屑
  .title {
    height: 3.125rem;
    padding: 0.625rem;
    background-color: white;
    font-weight: bold !important;
  }
  // 添加按钮
  .addt {
    margin: 0.9375rem;
  }
  // 表格
  .el-table {
    margin-left: 1.25rem;
    text-align: center !important;
  }
  // 背景色
  .bgcf {
    margin-top: 1.25rem;
    padding-bottom: 1.125rem;
    background-color: #fff;
  }
  // 添加数据 Dialog 对话框
  // 文字加粗
  .text-w {
    font-weight: 600;
    height: 60px;
    line-height: 60px;
  }
  // 添加数据 侧边栏
  .el-aside {
    height: 300px;
    overflow-x: visible;
  }
  // 分页
  .el-pagination {
    margin: 20px 0 0 20px;
  }
}
</style>
