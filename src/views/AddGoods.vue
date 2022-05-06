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
            <el-breadcrumb-item :to="{ path: '/comm/productList' }"
              >商品管理</el-breadcrumb-item
            >
            <el-breadcrumb-item>添加商品</el-breadcrumb-item>
          </el-breadcrumb>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <div class="content">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <h1>基本信息</h1>
        <el-form-item label="商品名称:" prop="goodsName">
          <el-col :span="10"
            ><el-input
              v-model="ruleForm.goodsName"
              placeholder="请输入商品名称"
            ></el-input
          ></el-col>
        </el-form-item>
        <el-form-item label="推荐语:" prop="recommend">
          <el-col :span="10"
            ><el-input
              v-model="ruleForm.recommend"
              placeholder="16字以内推荐语"
            ></el-input
          ></el-col>
        </el-form-item>
        <el-form-item label="商品描述:" prop="desc">
          <el-col :span="10"
            ><el-input
              v-model="ruleForm.desc"
              placeholder="16字以内描述"
            ></el-input
          ></el-col>
        </el-form-item>
        <el-form-item label="商品封面:" prop="goodsPhotoCover">
          <el-col :span="10">
            <el-upload
              class="upload-demo"
              action="http://172.16.106.130:8080/uploadToOss"
              :on-preview="handlePreviewCover"
              :on-remove="handleRemoveCover"
              :file-list="fileListCover"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip" style="color: red">
                上传图片必须点击选中图片确定上传!
              </div>
            </el-upload>
          </el-col>
        </el-form-item>
        <el-form-item label="商品示意图:" prop="goodsPhoto">
          <el-col :span="10">
            <el-upload
              class="upload-demo"
              action="http://172.16.106.130:8080/uploadToOss"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip" style="color: red">
                上传图片必须点击选中图片确定上传!
              </div>
            </el-upload>
          </el-col>
        </el-form-item>
        <el-form-item label="多张图:" prop="images">
          <el-col :span="10">
            <el-upload
              class="upload-demo"
              action="http://172.16.106.130:8080/uploadToOss"
              :on-preview="handlePreviewImages"
              :on-remove="handleRemoveImages"
              :file-list="fileListImages"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip" style="color: red">
                上传图片必须点击选中图片确定上传!
              </div>
            </el-upload>
          </el-col>
        </el-form-item>
        <h1>商品详情</h1>
        <el-form-item label="供应商" prop="supplier">
          <el-select v-model="ruleForm.supplier" placeholder="请选择供应商">
            <el-option
              v-for="item in states"
              :key="item.id"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="包装规格:" prop="packingSize">
          <el-col :span="10"
            ><el-input
              v-model="ruleForm.packingSize"
              placeholder="例如单位：每份、每斤、x个，前台价格位置显示为￥100/每单位"
            ></el-input
          ></el-col>
        </el-form-item>
        <el-form-item label="采购价格(元):" prop="purchasePrice">
          <el-col :span="10"
            ><el-input
              v-model="ruleForm.purchasePrice"
              placeholder="精确到0.01元"
            ></el-input
          ></el-col>
        </el-form-item>
        <el-form-item label="销售价格(元):" prop="salePrice">
          <el-col :span="10"
            ><el-input
              v-model="ruleForm.salePrice"
              placeholder="精确到0.01元"
            ></el-input
          ></el-col>
        </el-form-item>
        <el-form-item label="市场价格(元):" prop="marketPrice">
          <el-col :span="10"
            ><el-input
              v-model="ruleForm.marketPrice"
              placeholder="精确到0.01元"
            ></el-input
          ></el-col>
        </el-form-item>
        <el-form-item label="库存数:" prop="inventoryData">
          <el-col :span="10"
            ><el-input
              v-model="ruleForm.inventoryData"
              placeholder="正整数数字"
            ></el-input
          ></el-col>
        </el-form-item>
        <el-form-item label="虚拟已售量:" prop="virtualNum">
          <el-col :span="10"
            ><el-input
              v-model="ruleForm.virtualNum"
              placeholder="正整数数字"
            ></el-input
          ></el-col>
        </el-form-item>
        <el-form-item label="商品详情:">
          <el-col :span="10">
            <div id="editorElem"></div>
          </el-col>
        </el-form-item>
        <h1>快递配置</h1>
        <el-form-item label="单件重量(克):" prop="singleWeight">
          <el-col :span="10"
            ><el-input
              v-model="ruleForm.singleWeight"
              placeholder="精确到0.01g"
            ></el-input>
            <div class="textinfo">计算运费将按照单件商品重量计算</div>
          </el-col>
        </el-form-item>
        <h1>推广状态</h1>
        <el-form-item label="推广状态" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择推广状态">
            <el-option label="开启" value="开启"></el-option>
            <el-option label="关闭" value="关闭"></el-option>
          </el-select>
        </el-form-item>
        <h1>销售状态</h1>
        <el-form-item label="销售状态:" prop="salesStatus">
          <!-- <el-radio-group v-model="ruleForm.salesStatus"> -->
          <el-radio v-model="radio" label="0">草稿</el-radio>
          <el-radio v-model="radio" label="1">在售</el-radio>
          <el-radio v-model="radio" label="2">停售</el-radio>
          <!-- </el-radio-group> -->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">添加</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button @click="draftForm('ruleForm')">保存草稿</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import E from "wangeditor";
export default {
  data() {
    return {
      supplierId: 0,
      img: "",
      sampleImg: "",
      images: [],
      editorContent: "",
      radio: "1",
      ruleForm: {
        goodsName: "",
        recommend: "",
        desc: "",
        supplier: "",
        packingSize: "",
        purchasePrice: "",
        salePrice: "",
        marketPrice: "",
        inventoryData: 0,
        virtualNum: 0,
        singleWeight: "",
        region: "",
      },
      states: [],
      rules: {},
      fileListCover: [],
      fileList: [],
      fileListImages: [],
      editor: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    handleRemoveCover(file, fileList) {
      console.log(file, fileList);
    },
    handlePreviewCover(file) {
      console.log(file);
      console.log(1);
      this.img = file.response.url;
      console.log(this.img);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
      console.log(2);
      this.sampleImg = file.response.url;
      console.log(this.sampleImg);
    },
    handleRemoveImages(file, fileList) {
      console.log(file, fileList);
    },
    handlePreviewImages(file) {
      console.log(file);
      this.images.push(file.response.url);
      console.log(this.images);
    },
    //
    submitForm() {
      let formData = {};
      formData.name = this.ruleForm.goodsName;
      formData.price = this.ruleForm.salePrice;
      formData.prePrice = this.ruleForm.marketPrice;
      formData.purchasePrice = this.ruleForm.purchasePrice;
      formData.promotionStatement = this.ruleForm.recommend;
      formData.img = this.img;
      if (this.radio == 0) {
        formData.state = 0;
      } else if (this.radio == 1) {
        formData.state = 1;
      } else {
        formData.state = 2;
      }
      formData.unit = this.ruleForm.packingSize;
      formData.weight = this.ruleForm.singleWeight;
      formData.inventory = this.ruleForm.inventoryData;
      formData.soldVirtual = this.ruleForm.virtualNum;
      formData.introduce = this.editor.change.node.innerText;
      formData.sampleImg = this.sampleImg;
      formData.images = this.images;
      formData.desc = this.ruleForm.desc;
      this.states.forEach((item) => {
        if (item.name === this.ruleForm.supplier) {
          this.supplierId = item.id;
        }
      });
      formData.supplierId = this.supplierId;
      formData.promotion = this.ruleForm.region === "开启" ? true : false;
      this.$axios({
        url: "/goods/add",
        method: "post",
        data: formData,
      })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    draftForm() {
      let formData = {};
      formData.name = this.ruleForm.goodsName;
      formData.price = this.ruleForm.salePrice;
      formData.prePrice = this.ruleForm.marketPrice;
      formData.purchasePrice = this.ruleForm.purchasePrice;
      formData.promotionStatement = this.ruleForm.recommend;
      formData.img = this.img;
      if (this.radio == 0) {
        formData.state = 0;
      } else if (this.radio == 1) {
        formData.state = 1;
      } else {
        formData.state = 2;
      }
      formData.unit = this.ruleForm.packingSize;
      formData.weight = this.ruleForm.singleWeight;
      formData.inventory = this.ruleForm.inventoryData;
      formData.soldVirtual = this.ruleForm.virtualNum;
      formData.introduce = this.editor.change.node.innerText;
      formData.sampleImg = this.sampleImg;
      formData.images = this.images;
      formData.desc = this.ruleForm.desc;
      this.states.forEach((item) => {
        if (item.name === this.ruleForm.supplier) {
          this.supplierId = item.id;
        }
      });
      formData.supplierId = this.supplierId;
      formData.promotion = this.ruleForm.region === "开启" ? true : false;
      this.$axios({
        url: "/goods/add",
        method: "post",
        data: formData,
      })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    init() {
      this.editor = new E("#editorElem");
      this.editor.create();
    },
  },
  created() {
    this.$axios({
      url: "/supplier/getList",
      method: "post",
      data: {},
    })
      .then((data) => {
        if (data.code == 200) {
          let listData = data.data;
          listData.forEach((item) => {
            let supplierNum = {};
            supplierNum.name = item.name;
            supplierNum.id = item.id;
            this.states.push(supplierNum);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
<style lang="less" scoped>
.title {
  height: 50px;
  padding: 10px;
  background-color: white;
  font-weight: bold !important;
}
.content {
  padding: 5px 20px;
  margin-top: 10px;
  background-color: white;
  .select {
    width: 275px !important;
  }
  .textinfo {
    font-size: 12px;
    color: #909399;
  }
}
</style>