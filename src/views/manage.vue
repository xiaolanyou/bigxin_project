<template>
  <div>
    <el-row class="title" type="flex" align="middle">
      <el-col>
        <el-breadcrumb separator=" ">
          <el-breadcrumb-item>当前位置:</el-breadcrumb-item>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/comm/workbench' }"
              >工作台
            </el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
          </el-breadcrumb>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <div class="content">
      <el-row class="bg1">
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline delmb"
        >
          <el-form-item label="商品名称:">
            <el-input
              v-model="formInline.user"
              placeholder="模糊搜索"
            ></el-input>
          </el-form-item>
          <el-form-item label="供应商:">
            <el-select v-model="formInline.vendor" placeholder="请选择">
              <el-option label="张三水果店" value="张三水果店"></el-option>
              <el-option label="李四商贸公司" value="李四商贸公司"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="销售状态:">
            <el-select v-model="formInline.sales" placeholder="请选择">
              <el-option label="在售" value="在售"></el-option>
              <el-option label="停售" value="停售"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <!-- 表格 -->
      <el-row>
        <el-col class="bg1">
          <el-table :data="tables" style="width: 100%">
            <el-table-column fixed label="商品ID" width="150" type="index">
            </el-table-column>
            <el-table-column prop="img" label="商品图片" width="120">
              <template slot-scope="scope">
                <img :src="scope.row.img" class="imgbox" />
              </template>
            </el-table-column>
            <el-table-column prop="name" label="商品名称" width="120">
            </el-table-column>
            <el-table-column prop="supplier" label="供应商" width="180">
            </el-table-column>
            <el-table-column prop="sales" label="实际销量" width="120">
            </el-table-column>
            <el-table-column prop="state" label="商品状态" width="120">
            </el-table-column>
            <el-table-column prop="goodstype" label="商品类型" width="120">
            </el-table-column>
            <el-table-column prop="salegold" label="销售金币" width="120">
            </el-table-column>
            <el-table-column prop="marketvalue" label="市场价格" width="120">
            </el-table-column>
            <el-table-column prop="purchaseprice" label="采购价格" width="120">
            </el-table-column>
            <el-table-column prop="inventorydata" label="库存数" width="120">
            </el-table-column>
            <el-table-column prop="changeamount" label="虚拟兑换量" width="120">
            </el-table-column>
            <el-table-column prop="goodsdetails" label="商品详情" width="120">
            </el-table-column>
            <el-table-column prop="chargeoff" label="是否核销" width="120">
            </el-table-column>
            <el-table-column prop="date" label="添加时间" width="160">
            </el-table-column>
            <el-table-column label="操作" width="150" fixed="right">
              <template slot-scope="scope">
                <el-button
                  type="info"
                  size="small"
                  @click="handleClick(scope.row)"
                  >编辑</el-button
                >

                <el-button
                  type="danger"
                  size="small"
                  @click="handleDelete(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <!-- 编辑界面 -->
          <el-dialog title="基本信息" :visible.sync="dialogFormVisible">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="商品名称:" prop="name">
                <el-input
                  v-model="ruleForm.name"
                  placeholder="请输入商品名称"
                ></el-input>
              </el-form-item>
            </el-form>
            <!-- 图片上传 -->
            <el-form
              :model="ruleForm"
              :rules="rules1"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="商品图片:" prop="img">
                <el-upload
                  ref="upload"
                  action="http://www.lijianmin.top:8080/uplod"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :on-change="UploadImage"
                  :limit="1"
                  :file-list="fileList"
                  :auto-upload="false"
                >
                  <i class="el-icon-plus"></i>
                  <template #tip>
                    <div style="font-size: 12px; color: #919191">
                      单次限制上传一张图片
                    </div>
                  </template>
                </el-upload>
                <el-dialog v-model="dialogVisible" style="line-height: 0">
                  <img
                    style="width: 100%; height: 100%"
                    :src="dialogImageUrl"
                    alt=""
                  />
                </el-dialog>
              </el-form-item>
              <!-- <el-form-item>
              <el-button type="primary" @click="submitForm('ruleF')"
                >确定</el-button
              >
            </el-form-item> -->
            </el-form>
            <!-- 基本信息 -->
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="110px"
              class="demo-ruleForm mtop"
            >
              <el-form-item label="商品类型:" prop="resource">
                <el-radio-group v-model="ruleForm.resource">
                  <el-radio
                    label="普通商品"
                    @change="
                      {
                        {
                          infostatus = false;
                        }
                      }
                    "
                  ></el-radio>
                  <el-radio
                    label="红包"
                    @change="
                      {
                        {
                          infostatus = true;
                        }
                      }
                    "
                  ></el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="单个金额(元):" prop="" v-show="infostatus">
                <el-input
                  v-model="ruleForm.price"
                  placeholder="精确到0.01元"
                ></el-input>
              </el-form-item>
              <el-form-item label="销售金币(个):" prop="">
                <el-input
                  v-model="ruleForm.gold"
                  placeholder="精确到0.01元"
                ></el-input>
              </el-form-item>
              <el-form-item label="市场价格(元):" prop="marketprice">
                <el-input
                  v-model="ruleForm.marketprice"
                  placeholder="精确到0.01元"
                ></el-input>
              </el-form-item>
              <el-form-item label="采购价格(元):" prop="purchaseprice">
                <el-input
                  v-model="ruleForm.purchaseprice"
                  placeholder="精确到0.01元"
                ></el-input>
              </el-form-item>
              <el-form-item label="库存数:" prop="inventory">
                <el-input
                  v-model="ruleForm.inventory"
                  placeholder="正整数数字"
                ></el-input>
              </el-form-item>
              <el-form-item label="虚拟兑换量:" prop="exchange">
                <el-input
                  v-model="ruleForm.exchange"
                  placeholder="正整数数字"
                ></el-input>
              </el-form-item>

              <el-form-item label="商品详情:" prop="details">
                <el-input
                  type="textarea"
                  :rows="8"
                  placeholder="请输入内容"
                  v-model="ruleForm.details"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="是否核销:" prop="chargeoff">
                <el-radio-group v-model="ruleForm.chargeoff">
                  <el-radio label="需要"></el-radio>
                  <el-radio label="不需要"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="销售状态:" prop="condition">
                <el-radio-group v-model="ruleForm.condition">
                  <el-radio label="在售"></el-radio>
                  <el-radio label="停售"></el-radio>
                  <el-radio label="草稿"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
              <!-- <el-button type="primary" @click="dialogFormVisible = false"
                >确 定</el-button
              > -->
              <el-button type="primary" @click="submitForm('ruleForm')"
                >保存</el-button
              >
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="danger" @click="resetForm('ruleForm')"
                >重置</el-button
              >
            </div>
          </el-dialog>
        </el-col>
      </el-row>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[1, 2]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="Number(count)"
        class="acenter1"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: "",
      page: {
        pagesize: 0,
        pageconte: 1,
      },
      // 弹框
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      dialogFormVisible: false,
      //hideUploadEdit: false, //是否隐藏上传按钮
      infostatus: false,
      resource: "",
      chargeoff: "",
      exchange: "",
      condition: "",
      inventory: "",
      purchaseprice: "",
      marketprice: "",
      gold: "",
      price: "",
      details: "",
      imageUrl: "",
      ruleForm: {
        resource: "",
        chargeoff: "",
        exchange: "",
        condition: "",
        inventory: "",
        purchaseprice: "",
        marketprice: "",
        gold: "",
        price: "",
        details: "",
      },
      // 验证
      rules: {
        name: [
          { required: true, message: "请输入运单号/取件码", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        resource: [
          { required: true, message: "请选择商品类型", trigger: "change" },
        ],
        condition: [
          { required: true, message: "请选择销售状态", trigger: "change" },
        ],
        chargeoff: [
          { required: true, message: "请选择是否核销", trigger: "change" },
        ],
        details: [
          { required: true, message: "请输入商品详情", trigger: "blur" },
        ],
        exchange: [
          { required: true, message: "请输入兑换数量", trigger: "blur" },
        ],
        inventory: [
          { required: true, message: "请输入库存数量", trigger: "blur" },
        ],
        purchaseprice: [
          { required: true, message: "请输入采购价格", trigger: "blur" },
        ],
        marketprice: [
          { required: true, message: "请输入市场价格", trigger: "blur" },
        ],
        gold: [{ required: true, message: "请输入金币数量", trigger: "blur" }],
        price: [{ required: true, message: "请输入单价", trigger: "blur" }],
      },
      rules1: {
        img: [{ required: true, message: "请输入名称", trigger: "blur" }],
      },

      // 主界面
      dialogFormVisible: false,
      ruleForm: {},
      msg: "", //记录每一条的信息，便于取id
      delVisible: false, //删除提示弹框的状态
      delarr: 0, //存放删除的数据
      currentIndex: "",
      currentPage: 1, //初始页
      pagesize: 2, //    每页的数据
      formInline: {
        user: "",
        region: "",
        vendor: "",
        sales: "",
      },
      tableData: [],
    };
  },
  methods: {
    // 弹框的按钮/方法
    // 提交按钮
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置按钮
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //上传图片的方法
    UploadImage(file, filelist) {
      console.log(file);
      let fd = new FormData();
      fd.append("file", file.raw); //传给后台接收的名字 file
      this.$axios.post("/uploadToOss", fd).then((res) => {
        //上传成功后返回的数据,
        if (res.code === "1") {
          console.log(res);
        } else {
          console.log(err);
        }
        // 将图片地址给到表单.
        this.ruleForm.image = res.data;
      });
    },
    //移除图片功能
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //预览图片功能
    handlePictureCardPreview(file) {
      console.log(file.url);
      this.dialogVisible = true;
      this.dialogImageUrl = file.url;
    },
    resetForm(formName) {
      this.$refs.upload.clearFiles();
      this.$refs[formName].resetFields();
    },
    // 查询
    onSubmit() {},
    // 显示编辑界面
    handleClick(row) {
      console.log(row);
      this.dialogFormVisible = true;
      this.ruleForm.name = row.name;
      this.ruleForm.resource = row.goodstype;
      this.ruleForm.gold = row.salegold;
      this.ruleForm.marketprice = row.marketvalue;
      this.ruleForm.purchaseprice = row.purchaseprice;
      this.ruleForm.inventory = row.inventorydata;
      this.ruleForm.details = row.goodsdetails;
      this.ruleForm.exchange = row.changeamount;
      if (row.isWriteOff) {
        this.ruleForm.chargeoff = "需要";
      } else {
        this.ruleForm.chargeoff = "不需要";
      }
      if (row.status) {
        this.ruleForm.condition = "在售";
      } else {
        this.ruleForm.condition = "停售";
      }
    },

    handleSizeChange(val) {
      this.page.pagesize = val;
      // console.log(this.pagesize) //每页下拉显示数据
    },
    handleCurrentChange(val) {
      this.page.pageconte = val;
      // console.log(this.currentPage) //点击第几页
    },
    //单行删除
    handleDelete(row) {
      console.log(row.numberID);
      console.log(row);
      this.delVisible = true;
      this.$axios({
        url: "/forGoods/deleteForGoods",
        method: "post",
        params: {
          id: row.numberID,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.code === 200) {
            this.$message.success("删除成功");
          } else {
            this.$message.error("删除失败");
          }
        })
        .catch((error) => {
          console.log(error);
          this.$message.error("删除失败");
        });
    },

    // 封装
    gitList() {
      this.$axios
        .post("/forGoods/getForGoodsList", {})
        .then((res) => {
          if (res.code === "200") {
            this.tableData = res.data;
            this.count = res.count;
            console.log(this.count);
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    tables() {
      let arr = [];
      this.tableData.forEach((iteam) => {
        console.log(iteam);
        let obj = {
          date: iteam.beforeTime,
          name: iteam.goodsName,
          supplier: iteam.supplierName,
          state: iteam.status == true ? "在售" : "停售",
          sales: iteam.forGoodTotal,
          numberID: iteam.id,
          img: iteam.goodsCover,
          purchaseprice: iteam.purchasePrice,
          goodstype: iteam.forGoodsType,
          goodsdetails: iteam.referral,
          salegold: iteam.price,
          marketvalue: iteam.sellingPrice,
          changeamount: iteam.fakeAmount,
          inventorydata: iteam.forGoodsInventory,
          chargeoff: iteam.isWriteOff == false ? "未核销" : "已核销",
        };
        arr.push(obj);
      });
      return this.showPages(this.page.pageconte, this.page.pagesize, arr);
    },
  },
  created() {
    // methods写的封装在created里
    this.gitList();
  },
};
</script>

<style>
.imgbox {
  height: 80px;
  width: 80px;
}
.title {
  height: 50px;
  padding: 10px;
  background-color: white;
  font-weight: bold !important;
}
.content {
  padding: 20px;
  margin-top: 10px;
  background-color: white;
}
.acenter1 {
  text-align: center;
  margin-top: 10px;
}
.bg1 {
  margin-top: 10px;
  border-radius: 5px;
  padding: 15px;
  background-color: white;
}
.delmb > .el-form-item {
  margin-bottom: 0;
}
</style>
