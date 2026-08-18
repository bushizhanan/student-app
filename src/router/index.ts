import { createRouter,createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(),
  routes:[
    {
      path:'/',
      redirect:'/login'
    },
    {
      path:'/login',
      component:()=>import('../views/user/user-login.vue'),
      meta:{title:'用户登录'}
    },
    {
      path:'/register',
      component:()=>import('../views/user/user-register.vue'),
      meta:{title:'用户注册'}
    },
    {
    path:'/index',
    component: ()=> import('../views/index/index.vue'),
    meta:{title:'进入首页'},
    
    children:[
      {
        path:'',   // path为空字符串，代表父路由访问时默认渲染这个组件
        component:()=>import('../views/index/home.vue'),
        meta:{title:'首页'}
      },
      {
        path:'home',
        component:()=>import('../views/index/home.vue'),
        meta:{title:'首页'}
      },
      {
        path:'gongneng',
        component:()=>import('../views/index/gongneng.vue'),
        meta:{title:'功能'}
      },
    ]
    }
  ,

  ]
})
export default router
