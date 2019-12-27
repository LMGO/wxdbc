import Vue from 'vue'
import App from './App'
import qs from 'qs'
import Fly from  'flyio/dist/npm/wx'
import store from './store/store'

Vue.config.productionTip = false
App.mpType = 'app'

//将store对象放置在vue原型上，让每个实例都可以用
Vue.prototype.$store=store
Vue.prototype.$qs = qs;

let fly=new Fly
Vue.prototype.$fly = fly // 将fly实例挂在vue原型上


Vue.prototype.url = '';//用户图片服务器
Vue.prototype.url1 = '';//主体服务器
Vue.prototype.url2 = '';//识别服务器
const app = new Vue(App)
app.$mount()
