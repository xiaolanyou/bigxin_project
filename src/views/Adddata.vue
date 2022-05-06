<template>
  <div class="adddata-container">
    <!-- 面包屑导航 -->
    <el-row class="title" type="flex" align="middle">
      <el-col>
        <el-breadcrumb separator=" ">
          <el-breadcrumb-item>当前位置:</el-breadcrumb-item>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/comm/workbench' }">工作台 </el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/comm/productList' }">商品管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/comm/inventory' }">门店库存</el-breadcrumb-item>
            <el-breadcrumb-item>添加数据</el-breadcrumb-item>
          </el-breadcrumb>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!-- 内容区域 -->
    <el-row class="content">
      <el-col :span="14" :offset="1">
        <el-form :model="ruleForm" :rules="rules" ref="ruleFormRef" label-width="150px" class="demo-ruleForm">
          <el-form-item label="商品名称:" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="销售价格:" prop="price">
            <el-input v-model="ruleForm.price"></el-input>
          </el-form-item>
          <el-form-item label="商品原价:" prop="prePrice">
            <el-input v-model="ruleForm.prePrice"></el-input>
          </el-form-item>
          <el-form-item label="商品进货价:" prop="purchasePrice">
            <el-input v-model="ruleForm.purchasePrice"></el-input>
          </el-form-item>
          <el-form-item label="商品描述:" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
          </el-form-item>
          <el-form-item label="商品封面:" prop="img">
            <el-upload
              class="upload-demo"
              :action="upPhotoURL"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture"
              :limit="1"
            >
              <el-button size="small" type="primary">点击上传图片</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb,<span style="color: red">点击下方图片查看预览图是否上传成功</span>
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品销售状态:" prop="state">
            <el-select v-model="ruleForm.state" placeholder="请选择商品销售状态">
              <el-option label="在售" :value="1"></el-option>
              <el-option label="停售" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品规格:" prop="unit">
            <el-input v-model="ruleForm.unit"></el-input>
          </el-form-item>
          <el-form-item label="商品单件重量:" prop="weight">
            <el-input v-model="ruleForm.weight"></el-input>
          </el-form-item>
          <el-form-item label="商品总库存:" prop="inventory">
            <el-input v-model.number="ruleForm.inventory"></el-input>
          </el-form-item>
          <el-form-item label="商品已售数量:" prop="soldVirtual">
            <el-input v-model.number="ruleForm.soldVirtual"></el-input>
          </el-form-item>
          <el-form-item label="商品详细介绍:" prop="introduce">
            <el-input type="textarea" v-model="ruleForm.introduce"></el-input>
          </el-form-item>
          <el-form-item label="商品示例图:" prop="sampleImg">
            <el-upload
              class="upload-demo"
              :action="upPhotoURL"
              :on-preview="handlePreview2"
              :on-remove="handleRemove2"
              :file-list="fileList2"
              list-type="picture"
              :limit="1"
            >
              <el-button size="small" type="primary">点击上传图片</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb,<span style="color: red">点击下方图片查看预览图是否上传成功</span>
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="供应商编号:" prop="supplierId">
            <el-input v-model.number="ruleForm.supplierId" disabled></el-input>
          </el-form-item>
          <el-form-item label="是否开启推广:" prop="promotion">
            <el-select v-model="ruleForm.promotion" placeholder="请选择是否开启推广">
              <el-option label="开启" :value="true"></el-option>
              <el-option label="禁止" :value="false"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="推广语:" prop="promotionStatement">
            <el-input v-model="ruleForm.promotionStatement"></el-input>
          </el-form-item>
          <el-form-item label="门店编号:" prop="shopId">
            <el-input v-model.number="ruleForm.shopId" disabled></el-input>
          </el-form-item>
          <el-form-item label="门店销售状态:" prop="shopSalesState">
            <el-select v-model="ruleForm.shopSalesState" placeholder="请选择门店销售状态">
              <el-option label="在售" :value="1"></el-option>
              <el-option label="停售" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label=" 门店消耗:" prop="shopConsume">
            <el-input v-model.number="ruleForm.shopConsume"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleFormRef')">确认添加</el-button>
            <el-button @click="resetForm('ruleFormRef')">返回</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <!-- 图片预览 Dialog 对话框 -->
    <el-dialog title="图片预览" :visible.sync="centerDialogVisible" width="30%" center>
      <img :src="cutImgUrl" alt="" class="imgPreview" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Adddata',
  data() {
    // 自定义表单规则
    let priceValidator = (rule, value, callback) => {
      // let rul = /^\d{0,8}\.{0,1}(\d{1,2})?$/
      let rul = /^[-\+]?\d{0,8}\.{0,1}(\d{1,2})?$/
      if (rul.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的价格 例: 10.00'))
      }
    }
    return {
      // 查看图片预览
      cutImgUrl: '',
      // 存放商品封面图片的列表
      fileList: [],
      // 存放商品示例图的列表
      fileList2: [],
      // 图片预览 Dialog 对话框
      centerDialogVisible: false,
      // 上传图片的API地址
      upPhotoURL: 'http://www.lijianmin.top:8080/uploadToOss',
      // 表单
      ruleForm: {
        name: '', // 商品名称
        price: '', // 销售价格
        prePrice: '', // 原价
        purchasePrice: '', // 进货价
        desc: '', // 商品描述
        img: '', // 商品封面
        state: '', // 商品状态
        unit: '', // 规格
        weight: '', // 单件重量
        inventory: '', // 总库存
        soldVirtual: '', // 虚拟已售
        introduce: '', // 商品详细介绍
        sampleImg: '', // 商品示例图
        supplierId: 1, // 供应商编号
        promotion: '', // 是否开启推广
        promotionStatement: '', // 推广语
        shopId: 1, // 门店编号
        shopSalesState: '', // 门店销售状态
        shopConsume: '' // 门店消耗
      },
      // 表单规则
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入销售价格', trigger: 'blur' },
          { validator: priceValidator, trigger: 'blur' }
        ],
        prePrice: [
          { required: true, message: '请输入商品原价', trigger: 'blur' },
          { validator: priceValidator, trigger: 'blur' }
        ],
        purchasePrice: [
          { required: true, message: '请输入商品进价', trigger: 'blur' },
          { validator: priceValidator, trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入商品描述', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字', trigger: 'blur' }
        ],
        state: [{ required: true, message: '请选择商品状态', trigger: 'change' }],
        unit: [
          { required: true, message: '请输入商品规格 例: 包', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字', trigger: 'blur' }
        ],
        weight: [
          { required: true, message: '请输入商品单件重量', trigger: 'blur' },
          { validator: priceValidator, trigger: 'blur' }
        ],
        inventory: [
          { required: true, message: '请输入商品总库存', trigger: 'blur' },
          { type: 'number', message: '请输入数字', trigger: 'blur' }
        ],
        soldVirtual: [
          { required: true, message: '请输入商品已售数量', trigger: 'blur' },
          { type: 'number', message: '请输入数字', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '请输入商品详细介绍', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字', trigger: 'blur' }
        ],
        supplierId: [
          { required: true, message: '请输入供应商编号', trigger: 'blur' },
          { type: 'number', message: '请输入数字', trigger: 'blur' }
        ],
        promotion: [{ required: true, message: '请选择是否开启推广', trigger: 'change' }],
        promotionStatement: [
          { required: true, message: '请输入商品推广语', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字', trigger: 'blur' }
        ],
        shopId: [
          { required: true, message: '请输入供应商编号', trigger: 'blur' },
          { type: 'number', message: '请输入数字', trigger: 'blur' }
        ],
        shopSalesState: [{ required: true, message: '请选择是否开启推广', trigger: 'change' }],
        shopConsume: [
          { required: true, message: '请输入门店消耗', trigger: 'blur' },
          { type: 'number', message: '请输入数字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 确认添加按钮 并发起请求
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid && this.ruleForm.img !== '' && this.ruleForm.sampleImg !== '') {
          this.$axios({
            method: 'post',
            url: '/shopInventory/add',
            data: {
              name: this.ruleForm.name,
              price: this.ruleForm.price,
              prePrice: this.ruleForm.prePrice,
              purchasePrice: this.ruleForm.purchasePrice,
              desc: this.ruleForm.desc,
              img: this.ruleForm.img,
              state: this.ruleForm.state,
              unit: this.ruleForm.unit,
              weight: this.ruleForm.weight,
              inventory: this.ruleForm.inventory,
              soldVirtual: this.ruleForm.soldVirtual,
              introduce: this.ruleForm.introduce,
              sampleImg: this.ruleForm.sampleImg,
              supplierId: this.ruleForm.supplierId,
              promotion: this.ruleForm.promotion,
              promotionStatement: this.ruleForm.promotionStatement,
              shopId: this.ruleForm.shopId,
              shopSalesState: this.ruleForm.shopSalesState,
              shopConsume: this.ruleForm.shopConsume
            }
          }).then((res) => {
            console.log(res)
            if (res.code === '200') {
              this.$message({
                type: 'success',
                message: '添加成功!',
                duration: 1500
              })
              // 清空图片数组
              this.fileList = []
              this.fileList2 = []
              this.$router.push('/comm/inventory')
            } else {
              this.$message({
                type: 'error',
                message: '添加失败!',
                duration: 1500
              })
              // 清空图片数组
              this.fileList = []
              this.fileList2 = []
              return false
            }
          })
        } else {
          this.$message({
            type: 'warning',
            message: '请完成表格的填写!',
            duration: 1500
          })
          return false
        }
      })
    },
    // 返回按钮
    resetForm(formName) {
      // 清空图片数组
      this.fileList = []
      this.fileList2 = []
      this.$refs[formName].resetFields()
      this.$router.push('/comm/inventory')
    },
    // 开启商品封面图片预览框
    handlePreview(file) {
      console.log(file)
      // 将路径转存到图片预览中
      this.cutImgUrl = file.response.url
      // 将路径放到数组中
      // this.fileList.push(file.response.url)
      // 将图片路径转存到切换路径中
      this.ruleForm.img = file.response.url
      this.centerDialogVisible = true
    },
    // 移除已上传图片事件
    handleRemove(file, fileList) {
      console.log(file, fileList)
      // this.fileList.forEach((item, index) => {
      //   if (this.fileList(index) === file.response.url) {
      //     this.fileList.splice(item, 1)
      //   }
      // })
      // console.log(this.fileList)
    },
    // 开启商品示例图预览框
    handlePreview2(file) {
      console.log(file)
      // 将路径转存到图片预览中
      this.cutImgUrl = file.response.url
      // 将路径放到数组中
      // this.fileList2.push(file.response.url)
      // 将图片路径转存到切换路径中
      this.ruleForm.sampleImg = file.response.url
      this.centerDialogVisible = true
    },
    // 移除已上传图片事件
    handleRemove2(file, fileList) {
      console.log(file, fileList)
      // this.fileList2.forEach((item, index) => {
      //   if (this.fileList2(index) === file.response.url) {
      //     this.fileList2.splice(item, 1)
      //   }
      // })

      // console.log(this.fileList2)
    }
  }
}
</script>

<style lang="less" scoped>
// 最外层盒子
.adddata-container {
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
}
</style>
