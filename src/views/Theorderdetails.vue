<template>
  <div class="conter">
    <!-- 头部 -->
    <el-row class="title" type="flex" align="middle">
      <el-col>
        <el-breadcrumb separator=" ">
          <el-breadcrumb-item>当前位置:</el-breadcrumb-item>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/comm/workbench' }">工作台 </el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>订单详情</el-breadcrumb-item>
          </el-breadcrumb>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!--  表格部分 -->
    <el-row class="btable">
      <el-col :span="24">
        <h1>订单信息</h1>
        <table border="1" cellspacing="0" cellpadding="0">
          <tr>
            <th style="width: 350px">商品</th>
            <th>单价/数量</th>
            <th>供应商</th>
            <th>金额</th>
            <th>用户</th>
            <th>付款状态</th>
            <th>发货状态</th>
            <th>收货状态</th>
            <th style="border-right: none">操作</th>
          </tr>
          <tr class="second-ssx">
            <td colspan="9">
              <span>2018-08-02 17:43:39</span>
              <span>订单号:2018080298545157</span>
              <span>配送方式:驿站自提/顺丰快递</span>
              <span>运单号:1234546523223</span>
              <span>提货码:54******1</span>
            </td>
          </tr>
          <tr class="three-ssx">
            <td>
              <img src="../assets/logo.png" alt="" />
              <h1>龙泉山水蜜桃产</h1>
              <p>龙泉山水蜜桃产地直采,买三斤送一斤</p>
            </td>
            <td>￥100x2</td>
            <td>龙泉山张牟</td>
            <td>
              ￥200.00
              <p style="text-align: center; margin: 0; width: 150px">(含运费：￥0.00)</p>
            </td>
            <td>id:23456</td>
            <td>未付款</td>
            <td>未发货</td>
            <td>未收货</td>
            <td style="border-right: none"></td>
          </tr>
        </table>
      </el-col>
    </el-row>
    <el-row class="btable" style="margin-top: 0">
      <el-col :span="24">
        <h1>付款信息</h1>
        <el-table :data="tableData1" border style="width: 100%">
          <el-table-column align="center" prop="money" label="金额(元)" width="180"> </el-table-column>
          <el-table-column align="center" prop="name" label="付款方式" width="180"> </el-table-column>
          <el-table-column align="center" prop="address" label="支付流水号"> </el-table-column>
          <el-table-column align="center" prop="address1" label="付款状态"> </el-table-column>
          <el-table-column prop="address2" align="center" label="时间"> </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row class="btable" style="margin-top: 0">
      <el-col :span="24">
        <h1>配送信息</h1>
        <el-table :data="tableData2" border style="width: 100%">
          <el-table-column align="center" prop="Receivingway" label="收货方式" width="180"> </el-table-column>
          <el-table-column align="center" prop="distributionName" label="配送方" width="180"> </el-table-column>
          <el-table-column align="center" prop="address" label="提货码/运单号"> </el-table-column>
          <el-table-column align="center" prop="addressState" label="提货状态"> </el-table-column>
          <el-table-column prop="addressTime" align="center" label="时间"> </el-table-column>
          <el-table-column align="center" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="amend(scope.row)" type="primary" size="small">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row class="btable" style="margin-top: 0">
      <el-col :span="24">
        <h1>收货信息</h1>
        <el-table :data="tableData3" border style="width: 570px">
          <el-table-column align="center" prop="consignee" label="收货人" width="190"> </el-table-column>
          <el-table-column align="center" prop="Receivingphone" label="收货电话" width="190"> </el-table-column>
          <el-table-column align="center" prop="address" label="收货地址" width="190"> </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!--  弹出层 -->
    <el-dialog title="配送信息" center :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="formRef">
        <el-form-item label="*收货方式:" :label-width="formLabelWidth">
          <el-input autocomplete="off" placeholder="门店自提" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="*配送方:" :label-width="formLabelWidth" prop="person">
          <el-input v-model="form.person" autocomplete="off" placeholder="请输入配送方"></el-input>
        </el-form-item>
        <el-form-item label="*提货状态:" :label-width="formLabelWidth" prop="state">
          <el-select v-model="form.state" placeholder="配货中 /待提货 /以提货">
            <el-option label="配货中" value="配货中"></el-option>
            <el-option label="待提货" value="待提货"></el-option>
            <el-option label="以提货" value="以提货"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="*取货码校验:" :label-width="formLabelWidth" prop="verificationcode">
          <el-input v-model="form.verificationcode" autocomplete="off" placeholder="请输入用户告知的取件码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" center class="dialog-footer">
        <el-button type="primary" @click="affirm1('formRef')">确 认</el-button>
      </div>
    </el-dialog>
    <el-dialog title="配送信息" center :visible.sync="dialogFormVisible1">
      <el-form :model="form" :rules="rules" ref="formRef">
        <el-form-item label="*收货方式:" :label-width="formLabelWidth">
          <el-input v-model="form.way" autocomplete="off" placeholder="快递邮寄" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="*配送方:" :label-width="formLabelWidth" prop="personx">
          <el-select v-model="form.personx" placeholder="选择公司的名称">
            <el-option label="待分配" value="待分配"></el-option>
            <el-option label="顺丰快递" value="顺丰快递"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="*运单号:" :label-width="formLabelWidth" prop="verify">
          <el-input v-model="form.verify" autocomplete="off" placeholder="请填写快递运单号"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" center class="dialog-footer">
        <el-button type="primary" @click="affirm2('formRef')">确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Theorderdetails',
  data() {
    return {
      tableData4: [{}],
      tableData1: [
        {
          money: '100.00',
          address: '4200000135201808020290121628',
          name: '微信支付',
          address1: '已支付/未支付',
          address2: '2016-09-21 08:50:08'
        }
      ],
      tableData2: [
        {
          Receivingway: '门店自提',
          address: '5****123',
          distributionName: 'xxx南区店',
          addressState: '待提货/已提货',
          addressTime: '2016-09-21 08:50:08'
        },
        {
          Receivingway: '快递邮寄',
          address: '898978788888888 物流详情',
          distributionName: '待分配/顺丰快递',
          addressState: '配送中/已签收',
          addressTime: '2016-09-21 08:50:08'
        }
      ],
      tableData3: [
        {
          consignee: '张三',
          address: 'xxxxxxxxxxxxx号xxx',
          Receivingphone: '13471121121'
        }
      ],
      dialogFormVisible: false,
      dialogFormVisible1: false,

      form: {
        way: '',
        person: '',
        personx: '',
        state: '',
        verificationcode: '',
        verify: ''
      },
      formLabelWidth: '110px',
      rules: {
        person: [{ required: true, message: '请输入配送方', trigger: 'blur' }],
        state: [{ required: true, message: '请选择提货状态', trigger: 'change' }],
        verificationcode: [{ required: true, message: '请输入取货码校验', trigger: 'blur' }],
        personx: [{ required: true, message: '请选择配送方', trigger: 'blur' }],
        verify: [{ required: true, message: '请输入运单号', trigger: 'blur' }]
      }
    }
  },
  methods: {
    amend(row) {
      if (row.Receivingway === '门店自提') {
        this.dialogFormVisible = true
      } else {
        this.dialogFormVisible1 = true
      }
    },
    affirm1(formRef) {
      console.log(this.form.state)
      this.tableData2.forEach((item) => {
        if (item.Receivingway === '门店自提') {
          item.distributionName = this.form.person
          item.addressState = this.form.state
        }
      })
      this.$refs[formRef].validate((valid) => {
        if (valid) {
          alert('submit!')
          this.dialogFormVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    affirm2(formRef) {
      console.log(this.form.person)
      this.tableData2.forEach((item) => {
        if (item.Receivingway === '快递邮寄') {
          item.distributionName = this.form.personx
          item.address = this.form.verify
        }
      })
      this.$refs[formRef].validate((valid) => {
        if (valid) {
          alert('submit!')
          this.dialogFormVisible1 = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.conter {
  width: 100%;
  .title {
    height: 50px;
    padding: 10px;
    background-color: white;
    font-weight: bold !important;
  }
  .btable {
    margin-top: 20px;
    background: #fff;
    padding: 20px;
    th {
      width: 120px;
      height: 60px;
      border-top: none;
      border-left: none;
    }
    .second-ssx {
      height: 40px;
      border: none;
      td {
        border: none;
      }
      span {
        float: left;
        height: 40px;
        line-height: 40px;
        margin-left: 30px;
      }
    }
    .three-ssx {
      height: 170px;
      text-align: center;
      td {
        border-left: none;
        border-bottom: none;

        h1 {
            width: 130px;
            float: right;
            padding-right: 10px;
            font-size: 14px;
            text-align: left;
            margin: 0;
            margin-top: 10px;
          }
          p {
            width: 130px;
            float: right;
            padding-right: 10px;
            text-align: left;
            font-size: 14px;
            font-weight: 100;
          }
          img {
            float: left;
            margin-left: 10px;
            height: 120px;
          }
      }
    }
  }
  .el-dialog {
    font-weight: 800;
    width: 700px;
    padding: 40px;
  }
}
</style>
