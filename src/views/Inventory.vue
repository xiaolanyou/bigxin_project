<template>
  <div class="inventory-container">
    <!-- 面包屑导航 -->
    <el-row class="title" type="flex" align="middle">
      <el-col>
        <el-breadcrumb separator=" ">
          <el-breadcrumb-item>当前位置:</el-breadcrumb-item>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/comm/workbench' }">工作台 </el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/comm/productList' }">商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>门店库存</el-breadcrumb-item>
          </el-breadcrumb>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!-- 内容区域 -->
    <el-row class="content">
      <!-- 头部区域 -->
      <el-col :span="19" :offset="1">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="门店名称:">
            <el-input v-model="formInline.doorname" placeholder="模糊查询" clearable></el-input>
          </el-form-item>
          <!-- <el-form-item label="所属门店:" class="interval">
            <el-input v-model="formInline.dinateDoor" placeholder="模糊查询" clearable></el-input>
          </el-form-item> -->
          <el-form-item label="销售状态:" class="interval">
            <el-select v-model="formInline.region" placeholder="请选择">
              <el-option label="请选择" value=""></el-option>
              <el-option label="在售" value="在售"></el-option>
              <el-option label="停售" value="停售"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="addDatas">添加数据</el-button>
        <!-- <el-button type="primary" @click="addRepertory"> 新增本地库存</el-button> -->
      </el-col>
      <!-- 表格区域 -->
      <el-col :span="23" :offset="1" style="padding-right: 50px">
        <el-table :data="tableComDate" style="width: 100%" max-height="360" border>
          <el-table-column fixed prop="id" label="序号" width="70" align="center" type="index"> </el-table-column>
          <el-table-column prop="name" label="商品名称" width="120" align="center"> </el-table-column>
          <el-table-column prop="promotionStatement" label="推荐语" width="120" align="center"> </el-table-column>
          <el-table-column prop="price" label="销售价格(元)" width="120" align="center"> </el-table-column>
          <el-table-column prop="shopName" label="所属门店" width="120" align="center"> </el-table-column>
          <el-table-column prop="inventory" label="门店库存总量" width="120" align="center"> </el-table-column>
          <el-table-column prop="salesVolume" label="门店销售量" width="120" align="center"> </el-table-column>
          <el-table-column prop="surplusInventory" label="门店剩余库存" width="120" align="center"> </el-table-column>
          <el-table-column prop="shopConsume" label="门店消耗" width="120" align="center"> </el-table-column>
          <el-table-column prop="goodsState" label="平台销售状态" width="120" align="center"></el-table-column>
          <el-table-column prop="shopSalesState" label="门店销售状态" width="120" align="center"> </el-table-column>
          <el-table-column prop="updateTime" label="修改时间" width="110" align="center"> </el-table-column>
          <el-table-column label="门店自耗申请" width="120" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="applyBtn(scope.row)">申请</el-button>
            </template>
          </el-table-column>
          <el-table-column label="门店二维码" width="120" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="QRcodeBtn(scope.row)">查看二维码</el-button>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120" align="center">
            <template slot-scope="scope">
              <el-button @click="addModifyClick(scope.row)" type="text">修改</el-button>
              <el-button type="text" @click="delModifyClick(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <!-- 分页 -->
      <el-col :span="23" :offset="1">
        <el-pagination
          background
          @size-change="mainHandleSizeChange"
          @current-change="mainHandleCurrentChange"
          :page-sizes="[2, 3, 4, 5]"
          :page-size="page2.pageSize2"
          layout="total, prev, pager, next, sizes, jumper"
          :total="page2.pageTotal2"
        >
        </el-pagination>
      </el-col>
    </el-row>

    <!-- Dialog 编辑添加/修改 对话框 -->
    <el-dialog
      title="编辑添加/修改"
      :visible.sync="addModify"
      width="50%"
      center
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        :model="addModifyForm"
        :rules="addModifyRules"
        ref="addModifyRef"
        class="form-item"
        :label-position="labelPosition"
        label-width="150px"
      >
        <el-form-item label="推荐商品:" prop="commodity">
          <el-select v-model="addModifyForm.commodity" placeholder="请选择商品">
            <el-option :label="item.name" :value="item.name" v-for="item in tableComDate" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推荐语:" prop="statement">
          <el-input v-model="addModifyForm.statement"></el-input>
        </el-form-item>
        <el-form-item label="销售价格(元):" prop="salePrice">
          <el-input v-model="addModifyForm.salePrice"></el-input>
        </el-form-item>
        <el-form-item label="所属门店:" prop="shopDoors">
          <el-input v-model="addModifyForm.shopDoors" disabled></el-input>
        </el-form-item>
        <el-form-item label="平台销售状态:" prop="saStatus">
          <el-input v-model="addModifyForm.saStatus" disabled></el-input>
        </el-form-item>
        <el-form-item label="增加门店库存:" prop="inventories">
          <el-input v-model.number="addModifyForm.inventories"></el-input>
        </el-form-item>
        <el-form-item label="门店销售状态:" prop="doorStates">
          <el-select v-model="addModifyForm.doorStates" placeholder="请选择商品">
            <el-option label="在售" value="在售"></el-option>
            <el-option label="停售" value="停售"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="abolish">取 消</el-button>
        <el-button type="primary" @click="confirm('addModifyRef')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- Dialog 申请 对话框 -->
    <el-dialog
      title="申请"
      :visible.sync="applyFor"
      width="50%"
      center
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        :model="applyForForm"
        :rules="applyForRules"
        ref="applyForRef"
        class="form-item"
        :label-position="labelPosition"
        label-width="150px"
      >
        <el-form-item label="推荐商品:" prop="commodity2">
          <el-input v-model="applyForForm.commodity2" disabled></el-input>
        </el-form-item>
        <el-form-item label="所属门店:" prop="shopDoors2">
          <el-input v-model="applyForForm.shopDoors2" disabled></el-input>
        </el-form-item>
        <el-form-item label="门店自耗申请:" prop="consume2">
          <el-input v-model.number="applyForForm.consume2"></el-input>
        </el-form-item>
        <el-form-item label="申请说明:" prop="explain">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model.trim="applyForForm.explain"
            minlength="20"
            maxlength="60"
            resize="none"
            show-word-limit
            class="textarea"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="abrogate">取 消</el-button>
        <el-button type="primary" @click="ensure('applyForRef')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- Dialog 申请成功 对话框 -->
    <el-dialog
      title="申请"
      :visible.sync="applyVisible"
      width="30%"
      center
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <span class="sub-text">提交成功</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="successcc" @click="succBtn">确 定</el-button>
      </span>
    </el-dialog>

    <!-- Dialog 二维码 对话框 -->
    <el-dialog title="二维码" :visible.sync="QRcode" width="30%" center class="diaa">
      <el-row :gutter="20">
        <el-col :span="12">
          <img :src="QRcodeRorm.QRimg" alt="" class="QRimg" />
        </el-col>
        <el-col :span="12">
          <span class="QRtitle">{{ QRcodeRorm.QRname }}</span>
          <p style="line-height: 30px">{{ QRcodeRorm.QRdetails }}</p>
          <span class="price1" style="font-size: 18px">￥{{ QRcodeRorm.nowPrice }}</span>
          <span class="price2" style="text-decoration: line-through">￥{{ QRcodeRorm.yuanPrice }}</span>
        </el-col>
        <el-col :span="23" :offset="1" style="margin-top: 25px; font-size: 17px">
          所属门店: <span style="margin-left: 15px">{{ QRcodeRorm.QRdoor }}</span>
        </el-col>
      </el-row>
    </el-dialog>

    <!-- Dialog 新增本地库存 对话框 -->
    <el-dialog title="新增本地库存" :visible.sync="tableVisible" center width="65%">
      <el-row>
        <el-col :span="17" :offset="1">
          <el-form :inline="true" :model="productName" class="demo-form-inline">
            <el-form-item label="所属门店:">
              <el-select v-model="productName.shopDoorSel" placeholder="请选择" @change="doorChange">
                <el-option :label="item" :value="item" v-for="(item, index) in doorNames" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品名称:" style="margin-left: 25px">
              <el-input v-model="productName.shopName" placeholder="模糊查询" clearable></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <el-button type="primary">查询</el-button>
          <el-button type="primary">确认</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="addTableDate" border style="width: 100%">
        <el-table-column prop="choice" label="选择" width="160" align="center">
          <el-checkbox v-model="checked">选项</el-checkbox>
        </el-table-column>
        <el-table-column prop="spId" label="商品id" width="160" align="center"> </el-table-column>
        <el-table-column prop="spName" label="商品名称" width="160" align="center"> </el-table-column>
        <el-table-column prop="spstate" label="商品状态" width="160" align="center"> </el-table-column>
        <el-table-column prop="addti" label="添加时间" align="center"> </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="addSizeChange"
        @current-change="addCurrentChange"
        :current-page="1"
        :page-sizes="[2, 3, 4, 5]"
        layout="prev, pager, next,sizes, jumper"
        :total="tableData1.length"
        background
      >
      </el-pagination>
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
  name: 'Inventory',
  data() {
    // 自定义表单规则
    let priceValidator = (rule, value, callback) => {
      let rul = /^\d{0,8}\.{0,1}(\d{1,2})?$/
      // let rul = /^[-\+]?\d{0,8}\.{0,1}(\d{1,2})?$/
      if (rul.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的价格,例如: 1.00'))
      }
    }
    return {
      // 判断修改门店库存的数据
      numVal: 0,
      // 删除数据确认 Dialog 对话框
      deleteDialogVisible: false,
      // 储存要被删除的 商品 Id
      deleteID: 0,
      // 新增门店，获取所有的门店名称
      doorNames: [],
      // 主表格的分页
      page2: {
        pageTotal2: 0, // 数据总数
        pageCount2: 1, // 当前页
        pageSize2: 2 // 每页多少条
      },
      // 新增库存的分页
      page: {
        pageTotal: 0, // 数据总数
        pageCount1: 1, // 当前页
        pageSize1: 2 // 每页多少条
      },
      // 新增本地库存单选框
      checked: true,
      // 申请成功对话框
      applyVisible: false,
      // Dialog 编辑添加/修改 对话框
      addModify: false,
      // 二维码对话框
      QRcode: false,
      // 二维码的数据表单
      QRcodeRorm: {
        QRname: '',
        QRdetails: '',
        QRdoor: '',
        QRimg: '',
        yuanPrice: 0,
        nowPrice: 0
      },
      // 申请对话框
      applyFor: false,
      // 新增本地库存对话框
      tableVisible: false,
      // 编辑添加/修改的from
      addModifyForm: {
        editId: 0,
        commodity: '',
        statement: '',
        salePrice: 0,
        // 所属门店
        shopDoors: '',
        saStatus: '',
        inventories: 0,
        doorStates: ''
      },
      // 申请的from
      applyForForm: {
        commodity2: '苹果',
        shopDoors2: 'xxxx门店',
        consume2: 0,
        explain: ''
      },
      // 商品名称的from
      productName: {
        shopDoorSel: '',
        shopName: ''
      },
      // 头部查询表单
      formInline: {
        doorname: '',
        region: ''
      },
      // 表格
      tableData: [],
      /* [
        {
          id: '1',
          name: '龙泉山水蜜桃产',
          recommend: '龙泉山水蜜桃产地直采，买三斤送一斤',
          salePrice: 12,
          storeDoor: 'xxxx门店',
          doorSum: 23,
          salesVolume: 12,
          repertory: 11,
          consume2: 1,
          state: '在售',
          doorState: '在售',
          amendTime: '2016-09-21 8:50:08'
        },
        {
          shopId: '1',
          shopName: '龙泉山水蜜桃产',
          recommend: '龙泉山水蜜桃产地直采，买三斤送一斤',
          salePrice: 12,
          storeDoor: 'xxxx门店',
          doorSum: 23,
          salesVolume: 12,
          repertory: 11,
          consume2: 1,
          state: '在售',
          doorState: '在售',
          amendTime: '2016-09-21 8:50:08'
        },
        {
          shopId: '1',
          shopName: '龙泉山水蜜桃产',
          recommend: '龙泉山水蜜桃产地直采，买三斤送一斤',
          salePrice: 12,
          storeDoor: 'xxxx门店',
          doorSum: 23,
          salesVolume: 12,
          repertory: 11,
          consume2: 1,
          state: '在售',
          doorState: '在售',
          amendTime: '2016-09-21 8:50:08'
        },
        {
          shopId: '1',
          shopName: '龙泉山水蜜桃产',
          recommend: '龙泉山水蜜桃产地直采，买三斤送一斤',
          salePrice: 12,
          storeDoor: 'xxxx门店',
          doorSum: 23,
          salesVolume: 12,
          repertory: 11,
          consume2: 1,
          state: '在售',
          doorState: '在售',
          amendTime: '2016-09-21 8:50:08'
        },
        {
          shopId: '1',
          shopName: '龙泉山水蜜桃产',
          recommend: '龙泉山水蜜桃产地直采，买三斤送一斤',
          salePrice: 12,
          storeDoor: 'xxxx门店',
          doorSum: 23,
          salesVolume: 12,
          repertory: 11,
          consume2: 1,
          state: '在售',
          doorState: '在售',
          amendTime: '2016-09-21 8:50:08'
        }
      ], */
      // 新增新增本地库存的表格
      tableData1: [],
      /* tableData1: [
        {
          choice: true,
          spId: 1,
          spName: '苹果',
          spstate: '在售',
          addti: '2015-12-12 11:22:55'
        },
        {
          choice: true,
          spId: 2,
          spName: '芒果',
          spstate: '在售',
          addti: '2016-01-01 09:30:01'
        },
        {
          choice: true,
          spId: 3,
          spName: '葡萄',
          spstate: '停售',
          addti: '2017-11-01 10:40:38'
        },
        {
          choice: true,
          spId: 4,
          spName: '荔枝',
          spstate: '在售',
          addti: '2018-09-25 11:55:18'
        },
        {
          choice: true,
          spId: 5,
          spName: '西瓜',
          spstate: '在售',
          addti: '2018-09-25 11:55:18'
        },
        {
          choice: true,
          spId: 6,
          spName: '栗子',
          spstate: '在售',
          addti: '2018-09-25 11:55:18'
        },
        {
          choice: true,
          spId: 7,
          spName: '栗子',
          spstate: '在售',
          addti: '2018-09-25 11:55:18'
        },
        {
          choice: true,
          spId: 8,
          spName: '栗子',
          spstate: '在售',
          addti: '2018-09-25 11:55:18'
        },
        {
          choice: true,
          spId: 9,
          spName: '栗子',
          spstate: '在售',
          addti: '2018-09-25 11:55:18'
        }
      ], */
      // 右对齐
      labelPosition: 'right',
      // 添加和修改的规则
      addModifyRules: {
        commodity: [{ required: true, message: '请选择推荐商品', trigger: 'change' }],
        statement: [{ required: true, message: '请输入推荐语', trigger: 'blur' }],
        salePrice: [
          { required: true, message: '请输入销售价格', trigger: 'blur' },
          { validator: priceValidator, trigger: 'blur' }
        ],
        shopDoors: [{ required: true, message: '请输入所属门店', trigger: 'blur' }],
        saStatus: [{ required: true, message: '请输入平台销售状态', trigger: 'blur' }],
        inventories: [{ required: true, message: '请输入门店库存', trigger: 'blur' }],
        doorStates: [{ required: true, message: '请选择门店状态', trigger: 'change' }]
      },
      // 申请的规则
      applyForRules: {
        commodity2: [{ required: true }],
        shopDoors2: [{ required: true }],
        consume2: [{ required: true, message: '请填写商品份数', trigger: 'blur' }],
        explain: [
          { required: true, message: '请填写申请说明', trigger: 'blur' },
          { min: 0, max: 150, trigger: 'blur' }
        ]
      }
    }
  },
  // 计算属性
  computed: {
    // 主表格数据
    tableComDate() {
      let shopData = []
      this.tableData.forEach((item) => {
        let shopObj = {
          goodsState: item.goodsState === 1 ? '在售' : '停售',
          id: item.id,
          inventory: item.inventory,
          name: item.name,
          price: item.price.toFixed(2),
          prePrice: item.prePrice,
          promotionStatement: item.promotionStatement,
          qrCode: item.qrCode,
          shopConsume: item.shopConsume || 0,
          shopId: item.shopId,
          shopName: item.shopName,
          shopSalesState: item.shopSalesState === true ? '在售' : '停售',
          salesVolume: item.sold,
          surplusInventory: item.surplusInventory,
          updateTime: this.timeFormat(item.updateTime || '2022-01-01T23:59:59.226+0000')
        }
        shopData.push(shopObj)
        // console.log(shopData)
      })
      // 按照 id 升序排序
      shopData.sort(function (obj1, obj2) {
        return obj1.id - obj2.id
      })
      // return shopData
      // console.log(this.formInline.region)
      // 根据搜索数据来渲染页面
      let doorNa = []
      shopData.forEach((item) => {
        if (item.shopName.indexOf(this.formInline.doorname) >= 0) {
          if (item.shopSalesState.indexOf(this.formInline.region) >= 0) {
            doorNa.push(item)
          }
        }
      })
      this.page2.pageTotal2 = doorNa.length
      // shopData
      // 主表格的分页
      let Pagination = this.showPages(this.page2.pageCount2, this.page2.pageSize2, doorNa)
      return Pagination
    },
    // 新增库存的分页
    addTableDate() {
      // 分页功能的实现
      // 当前页
      let page = this.page.pageCount1 || 1
      // 每页显示多少条
      let paging = this.page.pageSize1 || 2
      // 原组件数据数组
      let pageDate = this.tableData1
      // return 出去的数组
      let pageArr = []
      // 用循环处理 分页
      for (let i = page * paging - paging; i < paging * page; i++) {
        if (pageDate[i] === undefined) break
        pageArr.push(pageDate[i])
      }
      // console.log(pageArr)
      return pageArr
    }
  },
  // 监听器
  watch: {
    'addModifyForm.inventories': {
      handler(val) {
        if (val < this.numVal && val !== '') {
          this.$message({
            type: 'error',
            message: '新增门店需要大于原来的库存，原来的库存是' + this.numVal,
            duration: 1500
          })
        }
      }
      // immediate: true
    }
  },
  // 生命周期函数调用 axios
  created() {
    this.getList()
  },
  methods: {
    // 新增本地库存当前页
    addCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.page.pageCount1 = val
    },
    // 新增本地库存分页
    addSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.page.pageSize1 = val
    },
    // 编辑和修改取消按钮
    abolish() {
      this.addModify = false
      // 清空表单内容
      // this.$refs['addModifyRef'].resetFields()
      // 清空表单效验规则
      // this.$refs['formRef'].clearValidate(['doorname', 'doorearns'])
      this.$refs['addModifyRef'].clearValidate()
    },
    // 编辑和修改确定按钮
    confirm(addModifyRef) {
      this.$refs[addModifyRef].validate((valid) => {
        if (valid) {
          /* let obj = {
            id: this.addModifyForm.editId,
            name: this.addModifyForm.commodity,
            promotionStatement: this.addModifyForm.statement,
            price: this.addModifyForm.salePrice,
            inventory: this.addModifyForm.inventories,
            shopSalesState: this.addModifyForm.doorStates === '在售' ? true : false
          }
          console.log(obj) */
          // 请求数据
          if (this.addModifyForm.editId !== '') {
            this.$axios
              .post('/shopInventory/update', {
                id: this.addModifyForm.editId,
                name: this.addModifyForm.commodity,
                promotionStatement: this.addModifyForm.statement,
                price: this.addModifyForm.salePrice,
                inventory: this.addModifyForm.inventories,
                shopSalesState: this.addModifyForm.doorStates === '在售' ? true : false
              })
              .then((res) => {
                console.log(res)
                this.getList()
                if (res.code === '200') {
                  this.$message({
                    message: res.msg,
                    type: 'success',
                    duration: 1500
                  })
                  this.addModify = false
                } else {
                  this.$message({
                    message: res.msg,
                    type: 'warning',
                    duration: 1500
                  })
                  return false
                }
              })
          } else {
            this.$message({
              message: '传入id出错',
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
    // 申请按钮
    applyBtn(row) {
      this.applyFor = true
      console.log(row)
      this.applyForForm.commodity2 = row.name
      this.applyForForm.shopDoors2 = row.shopName
      this.applyForForm.consume2 = row.shopConsume
    },
    // 申请取消按钮
    abrogate() {
      this.applyFor = false
      // 清空表单内容
      this.$refs['applyForRef'].resetFields()
      // 清空表单效验规则
      this.$refs['applyForRef'].clearValidate()
    },
    // 申请确定按钮
    ensure(applyForRef) {
      this.$refs[applyForRef].validate((valid) => {
        if (valid) {
          this.applyFor = false
          this.applyVisible = true
          // 清空表单内容
          this.$refs['applyForRef'].resetFields()
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
    // 申请成功后的按钮
    succBtn() {
      this.applyVisible = false
    },
    // 获取表格的数据
    getList() {
      // console.log(this.$axios())
      this.$axios.post('/shopInventory/getShopGoodsList', {}).then((res) => {
        if (res.code == '200') {
          this.tableData = res.data
          this.page2.pageTotal2 = res.count
        }
        console.log(res)
      })
    },
    // 获取修改表格的行数 编辑和修改
    addModifyClick(row) {
      this.addModify = true
      // id
      this.addModifyForm.editId = row.id
      // 推荐商品
      this.addModifyForm.commodity = row.name
      // 推广语
      this.addModifyForm.statement = row.promotionStatement
      // 销售价格
      this.addModifyForm.salePrice = row.price
      // 所属门店
      this.addModifyForm.shopDoors = row.shopName
      // 平台销售状态
      this.addModifyForm.saStatus = row.goodsState
      // 门店库存
      this.addModifyForm.inventories = row.inventory
      // 门店销售状态
      this.addModifyForm.doorStates = row.shopSalesState
      // 判断增加门店库存数据
      this.numVal = row.inventory
      // console.log(row)
    },
    // 删除表格数据事件
    delModifyClick(row) {
      console.log(row.id)
      this.deleteID = row.id
      this.deleteDialogVisible = true
      /* row.id = row.id.toString()
      console.log(row.id) */
      // 请求数据
      /* if (row.id !== '') {
        this.$axios({
          method: 'post',
          url: '/shopInventory/delete',
          params: {
            id: row.id
          }
        }).then((res) => {
          console.log(res)
          if (res.code === '200') {
            this.getList()
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1500
            })
          } else {
            this.$message({
              message: res.msg,
              type: 'warning',
              duration: 1500
            })
          }
        })
      } else {
        this.$message({
          message: '传入id出错',
          type: 'warning',
          duration: 1500
        })
      } */

      // 自己删除数据  (有问题)
      /* this.tableComDate.some((item) => {
        if (item.id === row.id) {
          console.log(item.id)
          console.log(item)
          this.tableComDate.splice(item, 1)
        }
      }) */
    },
    // 二维码点击事件
    QRcodeBtn(row) {
      this.QRcode = true
      console.log(row)
      this.QRcodeRorm.QRname = row.name
      this.QRcodeRorm.QRdetails = row.promotionStatement
      this.QRcodeRorm.nowPrice = row.price
      this.QRcodeRorm.QRimg = row.qrCode
      this.QRcodeRorm.QRdoor = row.shopName
      this.QRcodeRorm.yuanPrice = row.prePrice
    },
    // 主表格每页多少条
    mainHandleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.page2.pageSize2 = val
    },
    // 主表格当前页
    mainHandleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.page2.pageCount2 = val
    },
    // 新增本地库存按钮
    addRepertory() {
      this.tableVisible = true
      this.$axios.post('/shop/getList').then((res) => {
        // console.log(res.data)
        if (res.code === '200') {
          let arr = []
          res.data.forEach((item) => {
            if (item.name) {
              arr.push(item.name)
            }
          })
          // console.log(arr)
          this.doorNames = arr
        }
      })
    },
    // 新增门店下拉列表改变
    doorChange(val) {
      console.log('触发了下拉列表', val)
    },
    // 删除数据 确认 按钮
    deleteDates() {
      console.log(this.deleteID)
      // 请求数据
      if (this.deleteID !== '') {
        this.$axios({
          method: 'post',
          url: '/shopInventory/delete',
          params: {
            id: this.deleteID
          }
        }).then((res) => {
          console.log(res)
          if (res.code === '200') {
            this.getList()
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1500
            })
            this.deleteDialogVisible = false
          } else {
            this.$message({
              message: res.msg,
              type: 'warning',
              duration: 1500
            })
          }
        })
      } else {
        this.$message({
          message: '传入id出错',
          type: 'warning',
          duration: 1500
        })
      }
    },
    // 添加数据按钮
    addDatas() {
      this.$router.push('/comm/adddata')
    }

    // addDatas() {
    //   this.$axios({
    //     method: 'post',
    //     url: '/shopInventory/add',
    //     data: {
    //       name: '好了',
    //       price: '50',
    //       prePrice: '99.99',
    //       purchasePrice: '20',
    //       desc: '商品描述',
    //       img: 'tupian.png',
    //       state: 1,
    //       unit: '包',
    //       weight: '30',
    //       inventory: 1000,
    //       soldVirtual: 300,
    //       introduce: '商品详细介绍',
    //       sampleImg: 'shilitu.png',
    //       supplierId: '1',
    //       promotion: true,
    //       promotionStatement: '推广语',
    //       shopId: 1,
    //       shopSalesState: 1,
    //       shopConsume: 0
    //     }
    //   }).then((res) => {
    //     console.log(res)
    //     if (res.code === '200') {
    //       this.getList()
    //     }
    //   })
    // }
  }
}
</script>

<style lang="less" scoped>
// 大盒子
.inventory-container {
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
  // 头部中间间隙
  .interval {
    margin: 0 4.5% 0 4%;
  }
  // 表格
  .el-table {
    margin-bottom: 30px;
  }
  // 分页
  .el-pagination {
    margin-bottom: 30px;
  }
  // Dialog 对话框里面的输入框
  .form-item {
    .el-input {
      width: 80%;
    }
    .el-select {
      width: 80%;
    }
  }
  // 多行文本输入框
  .textarea {
    width: 80%;
  }
  // 申请成功页面的文本居中
  .sub-text {
    display: inline-block;
    width: 100%;
    text-align: center;
  }
  // 申请成功页面的按钮
  .successcc {
    width: 35%;
  }
  // 二维码图片
  .QRimg {
    width: 100%;
    height: 100%;
    vertical-align: middle;
    border-radius: 8px;
  }
  // 二维码标题
  .QRtitle {
    font-size: 18px;
    font-weight: 600;
  }
  // 二维码下面商品价格
  .price1,
  .price2 {
    display: block;
    height: 25px;
    line-height: 25px;
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
