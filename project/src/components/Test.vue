<template>
  <div>
    <group title="cell demo">
      <x-input title="姓名" placeholder="必填" v-model="formData.name"></x-input>
      <x-input title="性别" placeholder="必填" v-model="formData.sex"></x-input>
      <x-input title="住址" placeholder="必填" v-model="formData.addr"></x-input>
<!--       <cell title="VUX" :value="sbt" is-link @click.native="btn"></cell>
 -->      
 <x-button @click.native="btn">{{sbt}}</x-button>
    </group>
  </div>
</template>

<script>
import { Group, Cell, XInput, XButton } from 'vux'

export default {
  components: {
    Group,
    Cell,
    XInput,
    XButton
  },
  data () {
    return {
      formData:{
        name:'',
        sex: '',
        addr:''
      },
      sbt:'click me'
    }
  },
  methods:{
    btn(){
      // console.log(this.msg)
      // this.$router.push({name:'/Button' , params:{id:this.msg}})
      let url = 'http://localhost/CI/index.php/api';
      let params = {userData:this.userData};
    this.$http.post(url , params).then(({data}) => {
      console.log(data)
    })
  
    }
    
  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
