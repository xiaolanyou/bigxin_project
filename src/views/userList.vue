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
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
          </el-breadcrumb>
        </el-breadcrumb>
      </el-col>
    </el-row>

    <div class="content">
      <!-- 查询部分的input和按钮 -->
      <el-row>
        <el-col :span="24">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <!-- 第二个input框 -->
            <el-form-item label="微信昵称：">
              <el-input
                v-model.trim="formInline.name"
                placeholder="模糊搜索"
                @change="searchData"
              ></el-input>
            </el-form-item>
            <!-- 第三个input框 -->
            <el-form-item label="注册时间：">
              <el-date-picker
                v-model="value2"
                align="right"
                type="date"
                placeholder="选择日期"
                @change="searchData"
              >
              </el-date-picker>
            </el-form-item>
            <!-- 查询按钮 -->
            <el-form-item class="anniu">
              <el-button type="primary" @click="onSubmit(formInline)"
                >查询</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <!-- 表格 -->
      <el-row class="content-list">
        <el-col :span="24">
          <el-table
            :data="tableDataa"
            border
            style="width: 98%"
            max-height="320"
          >
            <el-table-column fixed type="index" label="编号" width="120">
            </el-table-column>
            <el-table-column prop="name" label="微信昵称"> </el-table-column>
            <el-table-column prop="phone" label="手机号"> </el-table-column>
            <el-table-column fixed prop="regTime" label="注册时间">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
              <template slot-scope="scope">
                <el-button
                  @click="deleteRow(scope.row)"
                  type="text"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <!-- 分页 -->
      <el-row class="page">
        <el-col :span="6">
          共 <span>{{ count }}</span> 条记录 第
          <span>{{ page.pageconte }}</span> /
          <span>{{ Math.ceil(count / page.pagesize) }}</span> 页
        </el-col>
        <el-col :span="18" class="fengye">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="1"
            :page-sizes="[2, 5, 6]"
            layout="prev, pager, next,sizes, jumper"
            :total="Number(count)"
            background
          >
          </el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      formInline: {
        userId: "",
        user: "",
        region: "",
        name: "",
      },
      count: "",

      page: {
        pagesize: 2,
        pageconte: 1,
        pageTotal: 1,
      },

      value2: '',
      tableData: [],
    };
  },

  methods: {
    //删除用户
    deleteRow(row) {
      console.log(row.id);
      console.log(row);
      this.delVisible = true;
      this.$axios({
        url: "/user/delete",
        method: "post",
        params: {
          id: row.id,
        },
      })
        .then((res) => {
          if (res.code === 200) {
            this.$message.success("删除成功");
          } else {
            this.$message.console.error("删除失败");
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message.err("删除失败");
        });
    },
    // 查询微信昵称
    searchData() {
      // console.log(this.value2);
      if ((this.formInline.name.length === 0 && this.value2 === '') || (this.formInline.name.length === 0 && this.value2 === null)) {
        this.table();
      }
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page.pagesize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.pageconte = val;
    },
    // 查询
    onSubmit() {
      let arr = [];
      var date = new Date(this.value2);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let timess = y + "-" + m + "-" + d;
      timess = timess === "NaN-NaN-NaN" ? "" : timess;
      // console.log(timess);

      let obj = {};
      (obj.id = this.formInline.userId),
        (obj.name = this.formInline.name),
        (obj.regtime = timess),
        // console.log(obj);
      this.tableData.forEach((item) => {
        // console.log(item);
        // 只查询微信昵称
        if (
          item.name.indexOf(this.formInline.name) >= 0 &&
          this.value2 === ""
        ) {
          arr.push(item);
        }
        // 只查询日期
        if (item.lastTime.indexOf(timess) >= 0 && this.formInline.name === "") {
          arr.push(item);
        }
        // 同时查询
        if (
            item.name.indexOf(this.formInline.name) >= 0 &&
            this.formInline.name !== "" && this.value2 !== ""
          ) {
            if (item.lastTime.indexOf(timess) >= 0) {
              arr.push(item);
            }
          }
      });
      this.count = arr.length;
      this.tableData = arr;
    },

    // 封装
    table() {
      this.$axios
        .post("/user/getUserList", {})
        .then((res) => {
          if (res.code === "200") {
            // console.log(res);
            this.tableData = res.data;
            this.count = res.count;
            // console.log(this.count)
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  // 表格
  created() {
    this.table();
  },
  computed: {
    tableDataa() {
      let arr = [];
      // this.tableData.forEach(item => {
      //   console.log(item);
      //   if (item.name.indexOf(this.formInline.name) >= 0) {
      //     arr.push(item);
      //   }
      // })
      // this.tableData.forEach((item) => {
      //   console.log(item.id);
      //   if (item.id.indexOf(this.formInline.userId) >= 0) {
      //     arr.push(item);
      //   }
      // });
      // console.log(arr);
      // console.log(this.tableData);
      // 通过搜索处理出来的数组，给总条数赋值
      // this.page.pageTotal = arr.length;
      this.tableData.forEach((iteam) => {
        //  console.log(iteam);
        let obj = {
          id: iteam.id,
          name: iteam.name,
          phone: iteam.phone,
          regTime: iteam.regTime,
        };
        arr.push(obj);
      });

      return this.showPages(this.page.pageconte, this.page.pagesize, arr);
    },
  },
};
</script>

<style>
.table {
  height: 500px;
}
.anniu {
  margin-left: 30px;
}
.title {
  padding-left: 30px;
  height: 50px;
  line-height: 50px;
  background-color: white;
  font-weight: bold !important;
}
.content {
  padding: 30px;
  padding-top: 30px;
  margin-top: 10px;
  background-color: white;
  height: 500px;
}
.back {
  background: white;
  height: 50px;
  line-height: 50px;
  padding-left: 30px;
  padding-top: 20px;
}
.content-list {
  margin-top: 30px;
}
.page {
  margin-top: 30px;
  padding-bottom: 20px;
}
.input-tame {
  width: 100px;
}
</style>
