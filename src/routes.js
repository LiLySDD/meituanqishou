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
          role: ['ALL', 'STAFF', ],
      },
      children: [
          {path: '/main', component: Main, name: '主页'},
      ]
    },
    {
      path: '/',
      component: Home,
      name: '人员管理',
      meta: {
          role: ['ALL', 'STAFF',],
          // status: 41,
      },
      leaf: true,
      icon: 'fa fa-wrench',
      children: [
          {
              path: '/renyuan',
              component: () => import('./views/pages/renyuan.vue'),
              name: '人员管理',
              icon: 'fa fa-cubes'
          }
      ]
    },
    {
      path: '/',
      component: Home,
      name: '配置',
      meta: {
          role: ['ALL',],
          // status: 41,
      },
      // leaf: true,
      icon: 'fa fa-wrench',
      children: [
          {
              path: '/zhanghao',
              component: () => import('./views/pages/zhanghao.vue'),
              name: '账号分配',
              icon: 'fa fa-cubes'
          },
          {
            path: '/chengshi',
            component: () => import('./views/pages/chengshi.vue'),
            name: '城市配置',
            icon: 'fa fa-cubes'
        }
      ]
  },
  ];
export default routes;