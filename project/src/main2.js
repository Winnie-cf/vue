import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import '../theme/index.css'
import globle from './assets/js/global.js'
import App from './App.vue'
import qs from 'qs'
import es6Promise from 'es6-promise'
import axios from 'axios'
import { Loading } from 'element-ui';
// import Home from './Home.vue'
const Login = () =>
    import ('./Login.vue').then(m => m.default)

const Home = () =>
    import ('./Home.vue').then(m => m.default)

const Videos = () =>
    import ('./Videos.vue').then(m => m.default)

const VideoInfo = () =>
    import ('./VideoInfo.vue').then(m => m.default)

const Lessons = () =>
    import ('./Lessons.vue').then(m => m.default)

const ExamOrder = () =>
    import ('./ExamOrder.vue').then(m => m.default)
const ExamInfo = () =>
    import ('./ExamInfo.vue').then(m => m.default)
const ExamInfoResult = () =>
    import ('./ExamInfoResult.vue').then(m => m.default)

const TestOrder = () =>
    import ('./TestOrder.vue').then(m => m.default)
const TestInfo = () =>
    import ('./TestInfo.vue').then(m => m.default)
const TestInfoResult = () =>
    import ('./TestInfoResult.vue').then(m => m.default)

const Exams = () =>
    import ('./Exams.vue').then(m => m.default)
const Users = () =>
    import ('./UserList.vue').then(m => m.default)

const ExamTypeInfo = () =>
    import ('./ExamTypeInfo.vue').then(m => m.default)
const UserInfo = () =>
    import ('./UserInfo.vue').then(m => m.default)

const UE = () =>
    import ('./UE.vue').then(m => m.default)


Vue.use(VueRouter)
Vue.use(ElementUI)
// Vue.use(axios)

const routes = [{
        path: '/',
        name: 'Main',
        meta: { title: "保翊中体" },
        component: Home
    }, {

        path: '/Login',
        name: 'Login',
        meta: { title: "保翊中体--后台登录" },
        component: Login
    },
    {
        path: '/Home',
        name: 'Home',
        meta: { title: "保翊中体-后台" },
        component: Home,
        children: [{
                path: '/ExamOrder',
                name: 'ExamOrder',
                meta: { title: "考试订单查询" },
                component: ExamOrder
            },
            {
                path: '/ExamInfo',
                name: 'ExamInfo',
                meta: { title: "考试订单详情" },
                component: ExamInfo
            },
            {
                path: '/ExamInfoResult',
                name: 'ExamInfoResult',
                meta: { title: "考试订单结果设置" },
                component: ExamInfoResult
            },
            {
                path: '/TestOrder',
                name: 'TestOrder',
                meta: { title: "科技服务订单查询" },
                component: TestOrder
            },
            {
                path: '/TestInfo',
                name: 'TestInfo',
                meta: { title: "科技服务订单详情" },
                component: TestInfo
            },
            {
                path: '/TestInfoResult',
                name: 'TestInfoResult',
                meta: { title: "科技服务订单结果设置" },
                component: TestInfoResult
            },
            {
                path: '/Videos',
                name: 'Videos',
                meta: { title: "培训视频管理" },
                component: Videos
            },
            {
                path: '/VideoInfo',
                name: 'VideoInfo',
                meta: { title: "培训视频管理" },
                component: VideoInfo
            },
            {
                path: '/Lessons',
                name: 'Lessons',
                meta: { title: "视频文章管理" },
                component: Lessons
            },
            {
                path: '/Exams',
                name: 'Exams',
                meta: { title: "考试类别管理" },
                component: Exams
            },
            {
                path: '/ExamTypeInfo',
                name: 'ExamTypeInfo',
                meta: { title: "考试类别信息管理" },
                component: ExamTypeInfo
            },
            {
                path: '/Users',
                name: 'Users',
                meta: { title: "用户管理" },
                component: Users
            },
            {
                path: '/UserInfo',
                name: 'UserInfo',
                meta: { title: "用户管理" },
                component: UserInfo
            },

        ]
    }
]

const router = new VueRouter({
    routes
})



var uid = globle.localStorageGet('uid');
var token = globle.localStorageGet('token');

router.beforeEach((to, from, next) => { //beforeEach是router的钩子函数，在进入路由前执行
    if (to.meta.title) { //判断是否有标题
        document.title = to.meta.title
    }
    let uid = JSON.parse(localStorage.getItem('uid'));;
    let token = JSON.parse(localStorage.getItem('token'));;
    console.log('缓存的登录状态:uid:', uid, 'global:', globle.localStorageGet('uid'));
    if (to.name != 'Login' && (uid == 'undefined' || uid == '' || uid == undefined)) {
        console.log('缓存的登录状态不存在:uid:', uid, ' token:', token, 'global:', globle);
        next({ name: 'Login' });
        // return;
    }
    next() //执行进入路由，如果不写就不会进入目标页
})


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

axios.interceptors.response.use(response => {
    let data = response.data;
    // console.log('mainjs data:',data);
    if (data.ret != '0' && parseInt(data.ret) >= -1000 && parseInt(data.ret) <= -100) {
        // console.log('mainjs 登录失败:',data);
        // this.$vux.toast.text('登录失败,请重新登录');
        // router.replace({name:'Login'});
        window.location.href = '/baoeadmin/#/Login';
        return;
    }
    return response

}, error => {
    // 这里我们把错误信息扶正, 后面就不需要写 catch 了
    return Promise.resolve(error.response)
})


Vue.prototype.$_global = globle;
Vue.prototype.$http = axios;

new Vue({
    router,
    el: '#app',
    render: h => h(App)
})