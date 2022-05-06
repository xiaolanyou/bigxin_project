<template>
  <div>
    <!-- 导航 -->
    <el-row class="title" type="flex" align="middle">
      <el-col :span="24">
        <el-breadcrumb separator=" ">
          <el-breadcrumb-item>当前位置:</el-breadcrumb-item>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/comm/workbench' }"
              >工作台
            </el-breadcrumb-item>
            <el-breadcrumb-item><a href="">用户管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>提现记录</el-breadcrumb-item>
          </el-breadcrumb>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <div class="content">
      <!-- 查询input框 -->
      <el-row>
        <el-form :inline="true" :model="formInline">
          <el-col :span="24" class="pading">
            <!-- input第一行 -->
            <div>
              <!-- 第一个input框 -->
              <el-form-item label="用户编号">
                <el-input
                  v-model.trim="formInline.user"
                  placeholder="userid"
                  id="input-width"
                  class="right"
                  @change="changeUser"
                ></el-input>
              </el-form-item>
              <!-- 第二个input框 -->
              <el-form-item label="状态：">
                <el-select
                  v-model="formInline.region"
                  placeholder="全部"
                  id="input-width"
                  class="right"
                >
                  <el-option label="全部" value=""></el-option>
                  <el-option label="正在审核" value="正在审核"></el-option>
                  <el-option label="审核未通过" value="审核未通过"></el-option>
                  <el-option label="审核通过" value="审核通过"></el-option>
                </el-select>
              </el-form-item>
              <!-- 右边查询按钮 -->
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </div>
          </el-col>
          <!-- 右边查询按钮 -->
        </el-form>
      </el-row>
      <!-- 内容 -->
      <el-row>
        <el-col :span="24">
          <el-table
            :data="tableDataa"
            border
            style="width: 98%"
            max-height="280"
          >
            <el-table-column prop="log_id" label="序列号"> </el-table-column>
            <el-table-column prop="log_order" label="用户编号">
            </el-table-column>
            <el-table-column prop="log_money" label="提现金额">
            </el-table-column>
            <el-table-column prop="log_status" label="提现状态">
            </el-table-column>
            <el-table-column prop="log_apply_time" label="申请时间" width="220">
            </el-table-column>
            <el-table-column prop="log_check_time" label="审核时间" width="220">
            </el-table-column>
            <el-table-column prop="log_remark" label="备注"> </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text"
                  >审核</el-button
                >
              </template>
            </el-table-column>
          </el-table>

          <el-dialog title="审核" :visible.sync="dialogFormVisible" class="box">
            <el-form :model="form" ref="form">
              <el-form-item label="审核状态" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择">
                  <el-option label="审核未通过" value="审核未通过"></el-option>
                  <el-option label="审核通过" value="审核通过"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="备注" class="left">
                <el-input
                  type="text"
                  v-model="form.desc"
                  class="input-sr"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancel('form')">取 消</el-button>
              <el-button type="primary" @click="ascertain">确 定</el-button>
            </div>
          </el-dialog>
        </el-col>
      </el-row>
      <!-- 分页 -->
      <el-row>
        <div>
          共 <span>{{ count }}</span> 条记录 第
          <span>{{ page.pagecount }}</span> 页 /
          <span>{{ Math.ceil(count / page.pagesize) }}</span> 页
        </div>
        <div class="fengye-1" id="size">
          <!-- 金额汇总：<span>{{ log_money + log_money }}</span> -->
        </div>
        <div class="fengye-2">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="1"
            :page-sizes="[2, 8, 16]"
            layout="prev, pager, next,sizes, jumper"
            :total="Number(count)"
            background
          >
          </el-pagination>
        </div>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      page: {
        pagecount: 1,
        pagesize: 2,
      },
      formInline: {
        user: "",
        region: "",
      },
      //总条数
      count: "",
      //  数据
      tableData: [],
      //副数据
      tableDatas: [],
      value1: "",
      value2: "",
      //表格
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
      dialogTableVisible: false,
      dialogFormVisible: false,
    };
  },

  methods: {
    changeUser() {
      if (this.formInline.user.length === 0 && this.formInline.region === "") {
        this.table();
      }
    },
    onSubmit() {
      let arr2 = [];
      this.tableDatas.forEach((item) => {
        // 只查询用户编号
        if (
          item.log_order.indexOf(this.formInline.user) >= 0 &&
          this.formInline.region === ""
        ) {
          arr2.push(item);
        }
        // 只查询状态
        if (
          item.log_status.indexOf(this.formInline.region) >= 0 &&
          this.formInline.user === ""
        ) {
          arr2.push(item);
        }
        // 同时查询
        if (
          item.log_order.indexOf(this.formInline.user) >= 0 &&
          this.formInline.user !== "" &&
          this.formInline.region !== ""
        ) {
          if (item.log_status.indexOf(this.formInline.region) >= 0) {
            arr2.push(item);
          }
        }
      });
      this.tableData = arr2;
      this.count = arr2.length;
    },
    // 分页

    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.page.pagesize = val;
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page.pagecount = val;
    },

    // 封装
    table() {
      this.$axios
        .post("/user/getWithdraw", {})
        .then((res) => {
          if (res.code === "200") {
            this.tableData = res.data;
            this.tableDatas = res.data;
            this.tableDatas.forEach((item) => {
              if (item.log_status === 0) {
                item.log_status = "正在审核";
              } else if (item.log_status === 1) {
                item.log_status = "审核通过";
              } else if (item.log_status === 2) {
                item.log_status = "审核未通过";
              }
            });
            this.count = res.count;
            // console.log(this.count);
          }
          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //审核
    handleClick(row) {
      console.log(row);
      this.dialogFormVisible = true;
      this.form.region = row.log_status;
      this.form.desc = row.log_remark;
      sessionStorage.setItem("audit", JSON.stringify(row));
    },
    //取消
    cancel(form) {
      this.dialogFormVisible = false;
      this.$refs[form].clearValidate("");
      this.$refs[form].resetFields();
    },
    //确定
    ascertain() {
      let audit = JSON.parse(sessionStorage.getItem("audit"));
      console.log(audit);
      let formData = {};
      formData.id = audit.log_id;
      formData.remark = this.form.desc;

      if (this.form.region === "正在审核") {
        formData.status = 0;
      } else if (this.form.region === "审核通过") {
        formData.status = 1;
      } else if (this.form.region === "审核不通过") {
        formData.status = 2;
      }
      console.log(formData);
      this.$axios({
        url: "/user/check",
        method: "post",
        params: formData,
      })
        .then((res) => {
          console.log(res);
          if (res.code === "200") {
            console.log(123);
            this.table();
          }
        })
        .catch((err) => {
          console.log(err);
        });
      this.dialogFormVisible = false;
    },
  },

  //列表数据
  created() {
    this.table();
  },
  computed: {
    tableDataa() {
      let arr = [];
      this.tableData.forEach((iteam) => {
        //  console.log(iteam);
        if (iteam.log_status === 0) {
          iteam.log_status = "正在审核";
        } else if (iteam.log_status === 1) {
          iteam.log_status = "审核通过";
        } else if (iteam.log_status === 2) {
          iteam.log_status = "审核未通过";
        }

        let obj = {
          log_apply_time: iteam.log_apply_time,
          log_check_time: iteam.log_check_time,
          log_id: iteam.log_id,
          log_money: iteam.log_money,
          log_operation: iteam.log_operation,
          log_operation_status: iteam.log_operation_status,
          log_order: iteam.log_order,
          log_remark: iteam.log_remark,
          log_status: iteam.log_status,
          user_id: iteam.user_id,
        };
        arr.push(obj);
      });
      //  console.log(this.page.pagecount,this.page.pagesize);
      return this.showPages(this.page.pagecount, this.page.pagesize, arr);
    },
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
  padding-top: 30px;
  margin-top: 10px;
  background-color: white;
  height: 500px;
  #input-width {
    width: 220px;
    height: 35px;
  }
  .left {
    margin-left: 80px;
  }
  .box {
    width: 60%;
    margin: auto;
  }
  .input-sr {
    width: 70%;
  }
  .pading {
    padding-left: 40px;
    .right {
      margin-right: 40px;
    }
  }
  .fengye-1 {
    background: white;
    padding-left: 35px;
    padding-top: 15px;
  }
  .fengye-2 {
    background: white;
    text-align: center;
    padding-top: 20px;
  }
}
</style>