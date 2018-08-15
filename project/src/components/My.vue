<style>
.MyPage .weui-cell {
  padding: 15px 20px !important;
}

.MyPage .weui-grids:before,
.MyPage .weui-grids:after {
  border: 0;
}

.MyPage .weui-grid:after {
  border: 0;
}

</style>
<style scoped>
.container {
  /*padding: 0.185185rem;*/
}

.myInfo {
  height: 1.203704rem;
  margin-top: 0.601852rem;
  padding: 0.324074rem;
}

.nameContainer,
.iconContainer {
  vertical-align: middle;
  font-size: 0.481481rem;
  margin-right: 0.185185rem;
}

.hVM {
  height: 1.203704rem;
  vertical-align: middle;
  display: inline-block;
}

.iconContainer {
  width: 1.240741rem;
  height: 1.240741rem;
  border-radius: 50%;
  vertical-align: middle;
  float: right;
}

.gridBtnDiv {
  margin: 0.324074rem;
  border: 0px solid #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 5px #f1f1f1;
}

.iconBigSize {
  color: #FF9933;
  font-size: 0.740741rem;
}

.operation {
  /*margin-top: 0.648148rem;*/
  font-size: 14px;
}

.footer {
  position: absolute;
  bottom: 0.462963rem;
  width: 100%;
}

.footer p {
  text-align: center;
  font-size: 0.333333rem;
  color: #999;
  font-size: 0.333333rem
}

.marginDiv {
  margin-top: 0.740741rem;
  height: 0.185185rem;
  background-color: rgba(245, 247, 251, 1);
}

.loginOut {
  width: 90%;
  margin: 0 auto;
  margin-top: 4.611111rem;
  background: #f3f3f3;
  padding-top: 0.388889rem;
  padding-bottom: 0.388889rem;
}

.loginOut p {
  text-align: center;
  font-size: 14px;
  color: #FF7E00;
  letter-spacing: 2px;
}

</style>
<template>
  <div id='container' class='MyPage'>
    <div class="myInfo">
      <span class="nameContainer">{{userInfo.Name}}</span>
      <img class="iconContainer" :src="userInfo.Icon">
      <span class="hVM"></span>
    </div>
    <div class="gridBtnDiv">
      <grid :show-lr-borders="false" :show-vertical-dividers="false">
        <grid-item :link="{name:'MyExamList'}" label="培训考试项目">
          <!-- <i slot="icon" class="fa fa-book iconBigSize"></i> -->
          <img slot="icon" src="../assets/img/profile/exam-icon.png">
        </grid-item>
        <grid-item label="保单查询" @on-item-click="comingSoon">
          <img slot="icon" src="../assets/img/profile/insurance-icon.png">
        </grid-item>
        <grid-item :link="{name:'MyTechList'}" label="测试项目">
          <img slot="icon" src="../assets/img/profile/test-icon.png">
          <!-- <span slot="label">测试项目</span> -->
        </grid-item>
      </grid>
    </div>
    <div class="marginDiv"></div>
    <div class="operation">
      <cell title="个人资料" is-link :link="{name:'Profile'}">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/img/profile/profile-icon.png">
      </cell>
      <cell title="订单查询" is-link :link="{name:'MyOrder'}">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/img/profile/order-icon.png">
      </cell>
      <cell title="浏览记录" is-link :link="{name:'ViewHistory'}">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/img/profile/history-icon.png">
      </cell>
    </div>
    <div class="loginOut">
      <p @click='loginOut'>退出登录</p>
    </div>
    <!--     <div class="footer">
      <p>-保翊中体-</p>
    </div> -->
  </div>
</template>
<script>
import { XButton, Grid, GridItem, Group, Cell } from 'vux'
export default {
  components: {
    XButton,
    Grid,
    GridItem,
    Group,
    Cell
  },
  name: 'My',
  data() {
    return {
      userInfo: {
        Name: '未设置姓名',
        Icon: 'http://staticapp.coollang.com/eSportsProtect/head-icon.png'
      }
    }
  },
  methods: {
    comingSoon() {
      this.$vux.toast.text('敬请期待');
    },
    loginOut() {
      this.$_global.LoginOut();
      this.$router.replace({ name: 'Login' });
    },
    getMyInfo: function() {
      let uri = 'MemberCon/getSimpleUserInfo';
      let url = this.$_global.makeSign(uri);
      let params = {};
      let that = this;
      this.$vux.loading.show();
      this.$http.post(url, params).then((response) => {
        console.log(response.data);
        let data = response.data;
        if (data.ret != 0) {
          this.$vux.loading.hide();
          this.$vux.toast.text(data.errDesc);
          return;
        }
        this.userInfo = data.errDesc;
        this.$vux.loading.hide();
      }).catch(err => {
        console.log('请求失败：' + err.status + ',' + err.statusText);
        this.$vux.toast.text('请求失败!', 'middle');
        this.$vux.loading.hide();
      });
    }
  },
  computed: {


  },
  mounted: function() {
    this.getMyInfo();
  },
}

</script>
