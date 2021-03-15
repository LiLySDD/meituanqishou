import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import error from './views/500.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'

Vue.use(Router)

let routes = [
    {
      path: '/login',
      component: Login,
      name: '',
      hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '404',
        hidden: true
    },
    {
        path: '/500',
        component: error,
        name: '500',
        hidden: true
    },
    {
      path: '/',
      component: Home,
      name: '主页',
      hidden: true,
      meta: {
          role: ['admin', 'club', 'club_staff', 'picc', 'picc_staff', 'ins', 'ins_staff', 'cloud', 'cloud_staff', 'channel', 'channel_staff'],
      },
      children: [
          {path: '/main', component: Main, name: '主页'},
      ]
    },
    {path: '*', redirect: '/404', hidden: true},
  ];
export default routes;