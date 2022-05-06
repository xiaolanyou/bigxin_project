<template>
  <div class="storement-container">
    <!-- 面包屑导航 -->
    <el-row class="title" type="flex" align="middle">
      <el-col>
        <el-breadcrumb separator=" ">
          <el-breadcrumb-item>当前位置:</el-breadcrumb-item>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/comm/workbench' }">工作台 </el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/comm/productList' }">用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>供应商管理</el-breadcrumb-item>
          </el-breadcrumb>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!-- 内容 -->
    <el-row class="content">
      <el-col :span="18" :offset="1">
        <div class="demo-input-suffix">
          门店名称：
          <el-input placeholder="模糊查询" v-model.trim="secdoorname" style="width: 200px" clearable> </el-input>
        </div>
      </el-col>
      <el-col :span="5">
        <el-button type="primary" @click="addDoors">添加</el-button>
      </el-col>
      <!-- 表格 -->
      <el-col :span="23" :offset="1">
        <el-table :data="addTableDate" border style="width: 70%">
          <el-table-column prop="name" label="门店名称" width="220" align="center"> </el-table-column>
          <el-table-column prop="rate" label="门店毛利收益 (%)" width="220" align="center"> </el-table-column>
          <el-table-column prop="qrCode" label="门店二维码" width="220" align="center">
            <!-- 插入图片链接的代码 -->
            <template slot-scope="scope">
              <img :src="scope.row.qrCode" alt="" class="doorQR" />
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-tooltip content="编辑" placement="top" :enterable="false">
                <el-button type="primary" icon="el-icon-edit" @click="editDoors(scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip content="删除" placement="top" :enterable="false">
                <el-button type="danger" icon="el-icon-delete" @click="delDoors(scope.row)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <!-- 分页 -->
      <el-col :span="23" :offset="1">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="[2, 3, 4, 5, 8]"
          :page-size="page.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.pageTotal"
        >
        </el-pagination>
      </el-col>
    </el-row>

    <!-- Dialog 编辑对话框 -->
    <el-dialog
      title="编辑"
      :visible.sync="dialogFormVisible"
      width="40%"
      center
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form :model="form" :rules="rules" ref="formRef">
        <el-form-item label="门店名称:" :label-width="formLabelWidth" prop="doorname">
          <el-input v-model="form.doorname"></el-input>
        </el-form-item>
        <el-form-item label="门店收益(%):" :label-width="formLabelWidth" prop="doorearns">
          <el-input v-model.number="form.doorearns"></el-input>
        </el-form-item>
        <el-form-item label="门店二维码:" :label-width="formLabelWidth" prop="doorQRcode">
          <img :src="form.doorQRcode" alt="" class="doorQR" />
        </el-form-item>
        <!-- 上传图片 -->
        <el-form-item label="上传门店二维码:" :label-width="formLabelWidth" prop="updoorearns">
          <!-- action 表示图片要上传到的后台 API 地址 -->
          <el-upload
            class="upload-demo"
            :action="upPhotoURL"
            :on-preview="editHandlePreview"
            :on-remove="editHandleRemove"
            :file-list="fileList2"
            list-type="picture"
            :limit="1"
          >
            <el-button size="small" type="primary" class="upsc">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb,<span style="color: red">点击下方图片查看预览图是否上传成功</span>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="editSucc('formRef')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- Dialog 添加对话框 -->
    <el-dialog
      title="添加"
      :visible.sync="addDialogFormVisible"
      width="40%"
      center
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form :model="form2" :rules="rules2" ref="formRef2">
        <el-form-item label="门店名称:" :label-width="formLabelWidth" prop="doorname2">
          <el-input v-model="form2.doorname2"></el-input>
        </el-form-item>
        <el-form-item label="门店收益(%):" :label-width="formLabelWidth" prop="doorearns2">
          <el-input v-model.number="form2.doorearns2"></el-input>
        </el-form-item>
        <!-- 上传图片 -->
        <el-form-item label="上传门店二维码:" :label-width="formLabelWidth" prop="updoorearns2">
          <el-upload
            class="upload-demo"
            :action="upPhotoURL"
            :on-preview="addHandlePreview"
            :on-remove="addHandleRemove"
            :file-list="fileList"
            list-type="picture"
            :limit="1"
          >
            <el-button size="small" type="primary" class="upsc">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb,<span style="color: red">点击下方图片查看预览图是否上传成功</span>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel2">取 消</el-button>
        <el-button type="primary" @click="winBtn('formRef2')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 图片预览 Dialog 对话框 -->
    <el-dialog title="图片预览" :visible.sync="centerDialogVisible" width="30%" center>
      <img :src="cutImgUrl" alt="" class="imgPreview" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 删除数据确认 Dialog 对话框 -->
    <el-dialog title="警告" :visible.sync="deleteDialogVisible" width="30%" center>
      <span class="delText">您确定要删除该条数据吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteDates">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    // 自定义表单规则
    let rateValidator = (rule, value, callback) => {
      if (value >= 1 && value <= 100) {
        callback()
      } else {
        callback(new Error('门店收益(%) 1 ~ 100 之间'))
      }
    }
    return {
      // 上传图片 需要的 API 地址
      upPhotoURL: 'http://www.lijianmin.top:8080/uploadToOss',
      // 需要删除门店的 id
      deleteId: 0,
      // 确认删除数据 Dialog 对话框
      deleteDialogVisible: false,
      // 切换图片的路径
      cutImgUrl: '',
      // 图片预览 Dialog 对话框
      centerDialogVisible: false,
      // 分页
      page: {
        currentPage: 1, // 默认当前页为第一页
        pageSize: 2, //每页多少数据
        pageCount: 1, // 当前页
        pageTotal: 0 // 数据总数
      },
      // 添加图片的上传列表
      fileList: [],
      // 修改图片的上传列表
      fileList2: [],
      // 表格数据
      tableData: [],
      // 模糊查询
      secdoorname: '',
      // Dialog 编辑对话框
      dialogFormVisible: false,
      // Dialog 添加对话框
      addDialogFormVisible: false,
      // Dialog 编辑对话框表单
      form: {
        doorId: 0,
        doorname: '',
        doorearns: 0,
        // 原来的二维码
        doorQRcode: '',
        // 要修改的二维码
        updoorearns: ''
      },
      rules: {
        // Dialog 编辑对话框表单规则
        doorname: [{ required: true, message: '请输入门店名称', trigger: 'blur' }],
        doorearns: [
          { required: true, message: '请输入门店收益(%)', trigger: 'blur' },
          { type: Number, validator: rateValidator, trigger: 'blur' }
        ]
      },
      // Dialog 添加对话框表单
      form2: {
        doorname2: '',
        doorearns2: 0,
        // 添加门店二维码路径
        updoorearns2: ''
      },
      rules2: {
        // Dialog 添加对话框表单规则
        doorname2: [{ required: true, message: '请输入门店名称', trigger: 'blur' }],
        doorearns2: [
          { required: true, message: '请输入门店收益(%)', trigger: 'blur' },
          { type: Number, validator: rateValidator, trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px'
    }
  },
  computed: {
    //包装的数据
    /* tableupDate() {
      let arr = []
      this.tableData.forEach((item) => {
        if (item.name.indexOf(this.secdoorname) >= 0) {
          arr.push(item)
        }
      })
      return arr
    }, */
    // 分页
    addTableDate() {
      let arr = []
      this.tableData.forEach((item) => {
        if (item.name.indexOf(this.secdoorname) >= 0) {
          arr.push(item)
        }
      })
      // 通过搜索处理出来的数组，给总条数赋值
      this.page.pageTotal = arr.length
      // 分页功能的实现
      // 当前页
      let page = this.page.pageCount
      // 每页显示多少条
      let paging = this.page.pageSize
      // 原组件数据数组
      let pageDate = arr
      // return 出去的数组
      let pageArr = []
      // 用循环处理 分页
      for (let i = page * paging - paging; i < paging * page; i++) {
        if (pageDate[i] === undefined) break
        pageArr.push(pageDate[i])
      }
      return pageArr
    }
  },
  methods: {
    // 编辑 dig 对话框确认按钮
    editSucc(formRef) {
      this.$refs[formRef].validate((valid) => {
        if (valid) {
          // let dateObj = {
          //   id: this.form.doorId,
          //   name: this.form.doorname,
          //   rate: this.form.doorearns,
          //   qrCode: this.form.updoorearns === '' ? this.form.doorQRcode : this.form.updoorearns
          // }
          // console.log(dateObj)
          this.$axios({
            method: 'post',
            url: '/shop/update',
            data: {
              id: this.form.doorId,
              name: this.form.doorname,
              rate: this.form.doorearns,
              qrCode: this.form.updoorearns === '' ? this.form.doorQRcode : this.form.updoorearns
            }
          }).then((res) => {
            console.log(res)
            if (res.code === '200') {
              this.$message({
                message: '保存成功!',
                type: 'success',
                duration: 1500
              })
              // 清空上传图片的路径
              this.form.updoorearns = ''
              // 清空切换图片的路径
              this.cutImgUrl = ''
              this.getListData()
              // 清空上传的图片
              this.fileList2 = []
              this.dialogFormVisible = false
            } else {
              this.$message({
                message: '保存失败! 可能是门店名称重复',
                type: 'warning',
                duration: 1500
              })
              // 清空上传图片的路径
              this.form.updoorearns = ''
              // 清空切换图片的路径
              this.cutImgUrl = ''
              // 清空上传的图片
              this.fileList2 = []
              return false
            }
          })
        } else {
          this.$message({
            message: '请完成表格的填写!',
            type: 'warning',
            duration: 1500
          })
          return false
        }
      })
    },
    // Dialog 编辑取消按钮事件
    cancel() {
      this.dialogFormVisible = false
      // 清空表单内容
      this.$refs['formRef'].resetFields()
      // 清空表单效验规则
      // this.$refs['formRef'].clearValidate(['doorname', 'doorearns'])
      this.$refs['formRef'].clearValidate()
      // 清除上传的图片
      this.fileList2 = []
    },
    // Dialog 添加取消按钮事件
    cancel2() {
      this.addDialogFormVisible = false
      // 清空表单内容
      this.$refs['formRef2'].resetFields()
      // 清空表单效验规则
      // this.$refs['formRef'].clearValidate(['doorname', 'doorearns'])
      this.$refs['formRef2'].clearValidate()
      this.fileList = []
    },
    // 编辑 Dialog 对话框
    editDoors(row) {
      this.dialogFormVisible = true
      this.form.doorId = row.id
      this.form.doorname = row.name
      this.form.doorearns = row.rate
      this.form.doorQRcode = row.qrCode
      // console.log(row)
    },
    // 删除 Dialog 对话框 行
    delDoors(row) {
      // console.log(row)
      // console.log(row.id)
      this.deleteId = row.id
      this.deleteDialogVisible = true
      /* if (row.id !== '') {
        this.$axios({
          method: 'post',
          url: '/shop/delete',
          params: {
            id: row.id
          }
        }).then((res) => {
          // console.log(res)
          if (res.code === '200') {
            this.getListData()
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1500
            })
          } else {
            this.$message({
              message: '删除失败!',
              type: 'warning',
              duration: 1500
            })
          }
        })
      } */
    },
    // 添加 Dialog 对话框
    addDoors() {
      this.addDialogFormVisible = true
    },
    // 添加 Dialog 对话框 确定按钮
    winBtn(formRef2) {
      this.$refs[formRef2].validate((valid) => {
        if (valid) {
          /* let dateObj = {
            name: this.form2.doorname2,
            rate: this.form2.doorearns2,
            qrCode: this.updateFile
          }
          console.log(dateObj) */
          // 进行后台请求
          if (this.form2.updoorearns2 !== '') {
            this.$axios
              .post('/shop/add', {
                name: this.form2.doorname2,
                rate: this.form2.doorearns2,
                qrCode: this.form2.updoorearns2
              })
              .then((res) => {
                console.log(res)
                if (res.code === '200') {
                  this.$message({
                    message: res.msg,
                    type: 'success',
                    duration: 1500
                  })
                  this.form2.doorname2 = ''
                  this.form2.doorearns2 = 0
                  // 清空上传图片的路径
                  this.form2.updoorearns2 = ''
                  // 清空切换图片的路径
                  this.cutImgUrl = ''
                  // 清空上传的图片
                  this.fileList = []
                  this.addDialogFormVisible = false
                  this.getListData()
                } else {
                  this.$message({
                    message: '添加失败! 可能是门店名称重复',
                    type: 'error',
                    duration: 1500
                  })
                  this.form2.doorname2 = ''
                  this.form2.doorearns2 = 0
                  // 清空上传图片的路径
                  this.form2.updoorearns2 = ''
                  // 清空切换图片的路径
                  this.cutImgUrl = ''
                  // 清空上传图片列表
                  this.fileList = []
                  return false
                }
              })
          } else {
            this.$message({
              message: '请查看图片是否上传成功!',
              type: 'warning',
              duration: 1500
            })
            return false
          }
        } else {
          this.$message({
            message: '请完成表格的填写!',
            type: 'warning',
            duration: 1500
          })
          return false
        }
      })
    },
    // 上传图片的事件
    // 添加门店 文件列表中已上传的文件时的钩子
    addHandlePreview(file) {
      // console.log(file)
      // console.log(file.response.url)
      this.form2.updoorearns2 = file.response.url
      // 将图片路径转存到切换路径中
      this.cutImgUrl = this.form2.updoorearns2
      this.centerDialogVisible = true
    },
    // 添加门店 文件列表移除文件时的钩子
    addHandleRemove(file, fileList) {
      console.log(file, fileList)
      this.form2.updoorearns2 = ''
      this.cutImgUrl = ''
      this.fileList = []
    },
    // 修改门店 文件列表中已上传的文件时的钩子
    editHandlePreview(file) {
      // console.log(file)
      // console.log(file.response.url)
      this.form.updoorearns = file.response.url
      // 将图片路径转存到切换路径中
      this.cutImgUrl = this.form.updoorearns
      this.centerDialogVisible = true
    },
    // 修改门店 文件列表移除文件时的钩子
    editHandleRemove(file) {
      console.log(file)
      this.form.updoorearns = ''
      this.cutImgUrl = ''
      this.fileList2 = []
    },
    // 获取数据
    getListData() {
      // let tabelList = []
      this.$axios.post('/shop/getList').then((res) => {
        console.log(res)
        if (res.code === '200') {
          // tabelList = res.data
          // console.log(tabelList)
          this.tableData = res.data
          // 总页码
          this.page.pageTotal = res.count
          // console.log(this.tableData)
        }
      })
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.page.pageSize = val
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.page.pageCount = val
    },
    // 确认删除数据 按钮  并发起删除请求
    deleteDates() {
      // console.log(this.deleteId)
      if (this.deleteId !== '') {
        this.$axios({
          method: 'post',
          url: '/shop/delete',
          params: {
            id: this.deleteId
          }
        }).then((res) => {
          // console.log(res)
          if (res.code === '200') {
            this.getListData()
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1500
            })
            this.deleteDialogVisible = false
          } else {
            this.$message({
              message: '删除失败!',
              type: 'warning',
              duration: 1500
            })
          }
        })
      }
    }
  },
  created() {
    this.getListData()
  }
}
</script>

<style lang="less" scoped>
.storement-container {
  // 导航面包屑
  .title {
    height: 50px;
    padding: 10px;
    margin-bottom: 10px;
    background-color: white;
    font-weight: bold !important;
  }
  // 内容区域
  .content {
    padding-top: 25px;
    background-color: #fff;
  }
  // 表格
  .el-table {
    margin-top: 50px;
    margin-bottom: 30px;
  }
  // 分页
  .el-pagination {
    margin-bottom: 30px;
  }
  // 门店二维码
  .doorQR {
    width: 50%;
    height: 50%;
    vertical-align: middle;
  }
  // 图片预览
  .imgPreview {
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }
  // 删除字体
  .delText {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -100%);
    color: red;
    font-size: 18px;
  }
}
</style>
