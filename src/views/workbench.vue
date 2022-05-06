<template>
  <div>
    <div>
      <el-row>
        <el-col class="title"> 营业数据 </el-col>
      </el-row>
      <el-row class="content">
        <el-col :span="8" class="list"
          ><el-row>
            <div class="title-list">当前商品总量</div>
            <div class="title-count">{{businessData.goodsTotal}}</div>
          </el-row></el-col
        >
        <el-col :span="8" class="list"
          ><el-row>
            <div class="title-list">用户总量（注册用户）</div>
            <div class="title-count">{{ businessData.userTotal }}</div>
          </el-row></el-col
        >
        <el-col :span="8" class="list"
          ><el-row>
            <div class="title-list">订单总量（已付款）</div>
            <div class="title-count">{{ businessData.orderTotal }}</div>
          </el-row></el-col
        >
        <el-col :span="8" class="list"
          ><el-row>
            <div class="title-list">当前兑换商品总量</div>
            <div class="title-count">{{ businessData.exchangeGoodsTotal }}</div>
          </el-row></el-col
        >
        <el-col :span="8" class="list"
          ><el-row>
            <div class="title-list">兑换订单总量</div>
            <div class="title-count">{{ businessData.exchangeOrderTotal }}</div>
          </el-row></el-col
        >
      </el-row>
    </div>
    <div class="content-one">
      <el-row>
        <el-col class="title"> 销售情况 </el-col>
      </el-row>
      <el-row class="content">
        <el-col :span="8" class="list"
          ><el-row>
            <div class="title-list">总销售额（元）</div>
            <div class="title-count">{{ marketData.saleroom }}</div>
          </el-row></el-col
        >
        <el-col :span="8" class="list"
          ><el-row>
            <div class="title-list">昨日销售额（元）</div>
            <div class="title-count">{{ marketData.saleroomByYesterday }}</div>
          </el-row></el-col
        >
        <el-col :span="8" class="list"
          ><el-row>
            <div class="title-list">今日新增用户数</div>
            <div class="title-count">{{ marketData.userTotalByToday }}</div>
          </el-row></el-col
        >
        <el-col :span="8" class="list"
          ><el-row>
            <div class="title-list">昨日新增用户数</div>
            <div class="title-count">{{ marketData.userTotalByYesterday }}</div>
          </el-row></el-col
        >
        <el-col :span="8" class="list">
          <el-row>
            <div class="title-list">今日下单用户数</div>
            <div class="title-count">{{ marketData.userTotalByTodayOrder }}</div>
          </el-row></el-col
        >
        <el-col :span="8" class="list"
          ><el-row>
            <div class="title-list">昨日下单用户数</div>
            <div class="title-count">{{ marketData.userTotalByYesterdayOrder }}</div>
          </el-row></el-col
        >
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      businessData:{},
      marketData:{},
    };
  },
  created() {
    this.$axios({
      url:'/workBench/getData',
      method:'get'
    })
    .then(data=>{
      console.log(data);
      if(data.code == 200){
        this.businessData = data.businessData;
        this.marketData = data.marketData;
      }
    })
    .catch(err=>{
      console.log(err);
    })
  },
};
</script>

<style lang="less" scoped>
.content-one {
  margin-top: 10px;
}
.title {
  padding: 10px;
  background-color: white;
  font-weight: bold !important;
}
.content {
  margin-top: 2px;
  background-color: white;
  .list {
    text-align: center;
    height: 150px;
    border-right: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
  }
  .title-list {
    line-height: 80px;
    color: rgb(180, 180, 180);
  }
  .title-count {
    font-weight: bolder;
    font-size: 30px;
  }
}
</style>