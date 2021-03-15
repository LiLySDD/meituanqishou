// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'  
import axios from 'axios';
import VueRouter from 'vue-router'
import routes from './routes'


Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.prototype.$ajax = axios; 
axios.defaults.baseURL = process.env.API_ROOT;
Vue.config.productionTip = false


const router = new VueRouter({
  routes
}); 
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
      sessionStorage.removeItem('user');
  }
  let user = sessionStorage.getItem('user');

  if (to.path === '/getCode') {//获取用户openid
      next()
  }else if (to.path === '/boxMemberRegister') {//公众号--厢货之家注册会员
      next()
  } else if (to.path === '/500') {
      next()
  } else if (to.path === '/404') {
      next()
  } else if (!user && to.path !== '/login') {
      next({path: '/login'})
  } else {
      console.log(sessionStorage.getItem('user'));
      let role = '';
      if (sessionStorage.getItem('user')) {
          role = JSON.parse(sessionStorage.getItem('user')).qx;
      }
      console.log(role)
      console.log(to)
      next()
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
  // components: { App },
  // template: '<App/>'
}).$mount('#app')
