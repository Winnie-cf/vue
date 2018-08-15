<style scoped>
.vux-cell-box>div {
  padding: 0;
}

</style>
<style scoped>
.container {
  background-color: #fff;
  height: 100%;
  width: 100%;
}

.cellClass {
  /*height: 4.62963rem;*/
  /*width: 100%;*/
  height: calc(100% - 1.2rem);
  overflow-y: auto;
  padding: 0.185185rem;
  margin: 0;
}

.banner {
  height: 3.703704rem;
  width: 100%;
}

.operation {
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: right;
  background-color: #fff;
}

.registerBtn {
  display: inline-block;
  width: 30%;
  height: 0.925926rem;
  border-radius: 0;
}

.priceInfo {
  float: left;
  height: 100%;
  display: inline-block;
  height: 0.925926rem;
  line-height: 0.925926rem;
  font-size: 14px;
  margin-left: 0.185185rem;
}

.price {
  font-size: 16px;
  color: red;
  font-weight: bold;
}

.uploadPic {
  height: 44px;
  width: 44px;
  vertical-align: middle;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

</style>
<template>
  <div class="container">
    <div class="cellClass">
      <group>
        <!--  <selector title="阶段" v-model="formInfo.level" :options="[{ key: '1', value: '一期' },{ key: '2', value: '二期' },{ key: '3', value: '三期' }]" direction="rtl" placeholder="请选择第几期培训考试" required></selector> -->
        <datetime v-model="formInfo.level" format="YYYY-MM" :min-year="curYear" :max-year="maxYear" @on-change="dateTimechange" title="预约考试" placeholder="请选择考试月份" :start-date="startDate" :end-date="endDate" year-row="{value}年" month-row="{value}月" day-row="{value}日" required></datetime>
        <popup-picker title="预约地点" placeholder="请选择考试地点" :data="placeList" :columns="3" v-model="formInfo.examPlace" show-name required></popup-picker>
        <x-input ref='name' title="姓名" placeholder="请填写" v-model="formInfo.name" text-align="right" is-type="china-name" required></x-input>
        <x-input ref='IDCard' title="身份证" placeholder="请填写18位身份证号码" v-model="formInfo.IDCard" :is-type="checkIDCard" :debounce='1000' text-align="right" :max='IDNumberCheck' :min='IDNumberCheck' required></x-input>
        <x-input ref="birthday" title="出生日期" placeholder="根据身份证计算得到" v-model="formInfo.birthday" text-align="right" readonly></x-input>
        <x-input ref='age' title="年龄" placeholder="根据身份证计算得到" v-model="formInfo.age" text-align="right" readonly></x-input>
        <selector title="性别" v-model="formInfo.gender" :options="[{ key: '1', value: '男' },{ key: '0', value: '女' }]" direction="rtl" placeholder="请选择性别" required></selector>
        <x-input ref='nation' title="民族" placeholder="请填写" v-model="formInfo.nation" text-align="right"></x-input>
        <x-input ref='major' title="专业" placeholder="请填写" v-model="formInfo.major" text-align="right"></x-input>
        <x-input ref="education" title="学历" placeholder="请填写" v-model="formInfo.education" text-align="right"></x-input>
        <x-input ref='workPlace' title="工作单位" placeholder="请填写" v-model="formInfo.workPlace" text-align="right"></x-input>
        <x-input ref='post' title="职务" placeholder="请填写" v-model="formInfo.post" text-align="right"></x-input>
        <x-input ref='postTitle' title="职称" placeholder="请填写" v-model="formInfo.postTitle" text-align="right"></x-input>
        <x-input ref="contactAddress" title="联系地址" placeholder="请填写" v-model="formInfo.contactAddress" text-align="right" required></x-input>
        <x-input ref="phone" title="手机" placeholder="11位手机号码" v-model="formInfo.phone" text-align="right" required is-type="china-mobile"></x-input>
        <x-input ref="email" title="电子邮箱" placeholder="请填写" v-model="formInfo.email" text-align="right" required is-type="email"></x-input>
        <x-input ref="invoiceTitle" title="发票抬头" placeholder="请填写正确的发票抬头" v-model="formInfo.invoiceTitle" text-align="right"></x-input>
        <x-input ref="taxpayerIdentityNumber" title="纳税人识别号" placeholder="开具发票使用" v-model="formInfo.taxpayerIdentityNumber" text-align="right" place></x-input>
        <x-input ref="hotel" title="预订酒店房型" placeholder="根据报名先后顺序为准" v-model="formInfo.hotel" text-align="right"></x-input>
        <input @change="fileIDCardChange($event)" type="file" accept="image/jpeg,image/jpg,image/png" id="upload_IDCardPic" name="upload_IDCard" :multiple=false style="display: none" />
        <x-input title="身份证上传" :inline-desc="'正面照'" readonly @click.native="chooseIDCardFile">
          <div slot="right-full-height" class="uploadPic" :style="{'background-image':'url('+IDCardPicUpload+')'}"></div>
        </x-input>
        <input @change="fileEducationChange($event)" type="file" accept="image/jpeg,image/jpg,image/png" id="upload_EducationPic" name="upload_Education" :multiple=false style="display: none" />
        <x-input title="最高学历证明上传" readonly @click.native="chooseEducationFile">
          <div slot="right-full-height" class="uploadPic" :style="{'background-image':'url('+EducationPicUpload+')'}"></div>
        </x-input>
        <input @change="fileResumeChange($event)" type="file" accept="*" id="upload_ResumePic" name="upload_Resume" :multiple=false style="display: none" />
        <x-input title="个人简历上传" readonly @click.native="chooseResumeFile">
          <div slot="right-full-height" class="uploadPic" :style="{'background-image':'url('+picUpload+')'}"></div>
        </x-input>
      </group>
    </div>
    <div class="operation">
      <span class="priceInfo">合计: ￥<span class="price">{{examInfo.price}}</span></span>
      <xButton :gradients="['#FF9500','#FF5E3A']" type="primary" class="registerBtn" :mini="true" :id="examInfo.examID" @click.native="buy">立即购买</xButton>
    </div>
  </div>
</template>
<script>
import { Group, Cell, CellBox, XButton, Toast, XInput, Selector, XTextarea, Datetime, PopupPicker } from 'vux'

export default {
  components: {
    Group,
    Cell,
    CellBox,
    XButton,
    Toast,
    XInput,
    Selector,
    XTextarea,
    Datetime,
    PopupPicker
  },
  data() {
    return {
      number: 'number',
      IDNumberCheck: 18,
      examInfo: {
        examID: '',
        price: ''
      },
      placeList: [],
      formInfo: {
        level: '',
        name: '',
        gender: '1',
        nation: '',
        major: '',
        education: '',
        workPlace: '',
        post: '',
        postTitle: '',
        contactAddress: '',
        phone: '',
        email: '',
        invoiceTitle: '',
        taxpayerIdentityNumber: '',
        hotel: '',
        IDCard: '',
        age: '',
        birthday: '',
        IDCardPic: '',
        EducationPic: '',
        ResumePic: '',
        examPlace: []
      },
      startDate: '',
      endDate: '',
      curYear: 2018,
      maxYear: 2018,
      offsetDay: 15,
      file: '',
      imgType: {
        accept: 'image/gif, image/jpeg, image/png, image/jpg',
      },
      EducationPicUpload: 'https://fakeimg.pl/44/ddd/666/?retina=1&text=%E4%B8%8A%E4%BC%A0&font=noto',
      IDCardPicUpload: 'https://fakeimg.pl/44/ddd/666/?retina=1&text=%E4%B8%8A%E4%BC%A0&font=noto',
      picUpload: 'https://fakeimg.pl/44/ddd/666/?retina=1&text=%E4%B8%8A%E4%BC%A0&font=noto'
    }
  },
  mounted() {
    console.log(this.$route.params);
    // return;
    if (this.$route.params.ID == undefined || this.$route.params.ID == '') {
      // console.log('111');
      this.$vux.toast.text('非法操作', 'center');
      this.$router.replace({ name: 'ExamList' });
    }
    this.examInfo.examID = this.$route.params.ID;
    this.examInfo.price = this.$route.params.Price;

    //重新填值
    let formValue = this.$_global.localStorageGet('RegisterExamForm');
    if (formValue != null && typeof(formValue) == 'object') {
      this.formInfo = formValue;
    }

    //选择的年份
    this.curYear = parseInt(new Date().getFullYear());
    this.maxYear = parseInt(this.curYear + 1);

    //得到>15天后的月的日期.只能预约>15天后的日期
    var day1 = new Date();
    day1.setDate(day1.getDate() + this.offsetDay);
    this.startDate = day1.format("yyyy-MM-dd");

    day1.setDate(day1.getDate() + 365);
    this.endDate = day1.format("yyyy-MM-dd");

    let uri = 'ExamCon/getExamPlaces';
    let url = this.$_global.makeSign(uri);
    let params = { ExamID: this.examInfo.examID };
    let that = this;
    this.$vux.loading.show();
    this.$http.post(url, params).then((response) => {
      console.log(response.data);
      let data = response.data;
      if (data.ret != 0) {
        this.$vux.loading.hide();
        this.$vux.toast.text(data.errDesc, 'top');
        return;
      }
      this.placeList = data.errDesc;
      this.$vux.loading.hide();
    }).catch(err => {
      console.log('请求失败：' + err.status + ',' + err.statusText);
      this.$vux.toast.text('请求失败!', 'middle');
      this.$vux.loading.hide();
    });

  },
  methods: {
    dateTimechange() {

    },
    chooseIDCardFile() {
      document.getElementById('upload_IDCardPic').click();
    },
    fileCheck(event, uriParam, uploadName) {
      if (!event.target.files[0].size) return;
      console.log(event.target.files[0]);
      let reader = new FileReader();
      let img1 = event.target.files[0];
      let type = img1.type;
      if (uploadName != 'upload_Resume') {
        type = img1.type; //文件的类型，判断是否是图片 
        if (this.imgType.accept.indexOf(type) == -1) {
          this.$vux.toast.text('仅支持png/jpg图片格式！', 'middle');
          return false;
        }
      } else {
        type = "*";
      }

      let size = img1.size; //文件的大小，判断图片的大小  

      // if (size > 3145728) {
      //   alert('请选择3M以内的图片！');
      //   return false;
      // }
      // var uri = ''
      let form = new FormData();
      form.append(uploadName, img1, img1.name);
      form.isUploadFile = true;

      let uri = uriParam;
      let url = this.$_global.makeSign(uri);
      // let params = {};
      let that = this;
      this.$vux.loading.show();
      return this.$http.post(url, form, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
        console.log(response.data);
        let data = response.data;
        if (data.ret != 0) {
          this.$vux.loading.hide();
          this.$vux.toast.text(data.errDesc);
          return -1;
        }


        this.$vux.loading.hide();
        this.$vux.toast.text('上传成功');
        return data;
      }).catch(err => {
        console.log('上传失败：' + err.status + ',' + err.statusText);
        this.$vux.toast.text('上传失败!', 'middle');
        this.$vux.loading.hide();
      });
    },
    fileIDCardChange(event) {
      let uri = 'ExamCon/uploadIDCardPic';
      let that = this;
      this.fileCheck(event, uri, 'upload_IDCard').then((data) => {
        console.log('上传后返回url:', data.errDesc.url);
        that.formInfo.IDCardPic = data.errDesc.url;
        that.IDCardPicUpload = data.errDesc.url;
      });
    },
    chooseEducationFile() {
      document.getElementById('upload_EducationPic').click();
    },
    fileEducationChange(event) {
      let uri = 'ExamCon/uploadEducationPic';
      let that = this;
      this.fileCheck(event, uri, 'upload_Education').then((data) => {
        console.log('上传后返回url:', data.errDesc.url);
        that.formInfo.EducationPic = data.errDesc.url;
        that.EducationPicUpload = data.errDesc.url;
      });
    },
    chooseResumeFile() {
      document.getElementById('upload_ResumePic').click();
    },
    fileResumeChange(event) {
      let uri = 'ExamCon/uploadResumePic';
      let that = this;
      this.fileCheck(event, uri, 'upload_Resume').then((data) => {
        console.log('上传后返回url:', data.errDesc.url);
        that.formInfo.ResumePic = data.errDesc.url;
        that.picUpload = "https://fakeimg.pl/44/fff%2C0/000%2C255/?retina=1&text=已上传&font=noto";
      });
    },
    buy: function() {
      if (!this.$refs.name.valid || !this.$refs.IDCard.valid || !this.$refs.birthday.valid || !this.$refs.age.valid || !this.$refs.phone.valid || !this.$refs.email.valid || !this.$refs.contactAddress.valid) {
        this.$vux.toast.text('请先正确填写报名表', 'middle');
        return;
      }
      if (this.formInfo.IDCardPic == '' || this.formInfo.EducationPic == '' || this.formInfo.ResumePic == '') {
        this.$vux.toast.text('请先上传<br />身份证正面照、<br />最高学历证明、<br />个人简历', 'middle');
        return;
      }
      // this.$vux.toast.text('购买成功', 'center');
      // this.$router.replace({ name: 'MyExamList', replace: true, Params: { ID: this.examInfo.examID } });
      let uri = 'ExamCon/registerExam';
      let url = this.$_global.makeSign(uri);
      let params = this.formInfo;
      params.examID = this.examInfo.examID;
      let that = this;
      this.$vux.loading.show();
      this.$http.post(url, params).then((response) => {
        console.log(response.data);
        let data = response.data;
        if (data.ret != 0) {
          this.$vux.loading.hide();
          this.$vux.toast.text(data.errDesc, 'top');
          return;
        }


        //销毁保存的字段
        this.$_global.localStorageGet('RegisterExamForm', true);

        this.$vux.loading.hide();
        this.$vux.toast.text('报名成功', 'middle');
        this.$router.replace({ name: 'MyExamList', replace: true, Params: { ID: this.examInfo.examID } });
      }).catch(err => {
        console.log('请求失败：' + err.status + ',' + err.statusText);
        this.$vux.toast.text('请求失败!', 'middle');
        this.$vux.loading.hide();
      });
    },
    getBirthdayFunc() {
      // this.$vux.toast.text(this.formInfo.IDCard);
      if (this.formInfo.IDCard.length != 18) {
        return;
      }

      let year = this.formInfo.IDCard.substring(6, 10);
      console.log(year);
      let month = this.formInfo.IDCard.substring(10, 12);
      console.log(month);
      let day = this.formInfo.IDCard.substring(12, 14);
      console.log(year, month, day);
      this.formInfo.birthday = year + '-' + month + '-' + day;
      let date = new Date();
      this.formInfo.age = date.getFullYear() - year;
    },
    checkIDCard() {
      // console.log(11111111111);
      let res = isIdCardNo(this.formInfo.IDCard);
      if (res == false) {
        return { valid: false, msg: '身份证格式不正确!' };
      }
      this.getBirthdayFunc();
      return { valid: true };
    }
  },
  watch: {
    formInfo: {　　　　
      handler(newValue, oldValue) {
        // 　　　　　　console.log('表单变动:',this.formInfo,'变动值:',newValue)
        this.$_global.localStoragePut('RegisterExamForm', newValue);　　　　
      },
      　　　　deep: true　　
    }
  },
  computed: {

  }
}

function isIdCardNo(idCard) {
  //15位和18位身份证号码的正则表达式
  var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
  //如果通过该验证，说明身份证格式正确，但准确性还需计算
  if (regIdCard.test(idCard)) {
    if (idCard.length == 18) {
      var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
      var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
      var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
      for (var i = 0; i < 17; i++) {
        idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
      }
      var idCardMod = idCardWiSum % 11; //计算出校验码所在数组的位置
      var idCardLast = idCard.substring(17); //得到最后一位身份证号码

      //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
      if (idCardMod == 2) {
        if (idCardLast == "X" || idCardLast == "x") {
          //alert("恭喜通过验证啦！");
          return true;
        } else {
          // alert("身份证号码错误！");
          return false;
        }
      } else {
        //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
        if (idCardLast == idCardY[idCardMod]) {
          //alert("恭喜通过验证啦！");
          return true;
        } else {
          //alert("身份证号码错误！");
          return false;
        }
      }
    }
  } else {
    //alert("身份证格式不正确!");
    return false;
  }
}

</script>
