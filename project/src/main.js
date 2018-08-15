// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import qs from 'qs'
import es6Promise from 'es6-promise'
import axios from 'axios'
import App from './App'
import Home from './components/HelloFromVux'
import Test from './components/Test'
import Button from './components/Button'
import Global from './components/Global'
import { AjaxPlugin } from 'vux'
Vue.use(AjaxPlugin)

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: '/',
  component: Home
},
{
  path: '/Test',
  name: '/Test',
  component: Test
},
{
  path: '/Button',
  name: '/Button',
  component: Button
},
{
  path: '/Global',
  name: '/Global',
  component: Global
}]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.prototype.GLOBAL = Global
/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
    // console.log(config.data);
    // 发送请求之前做某件事
    if (config.method === 'post' && config.data.isUploadFile == undefined) {
        config.data = qs.stringify(config.data)
    }
    return config
}, (error) => {
    return error
})
