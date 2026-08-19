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
        path:'student',
        component:()=>import('../views/index/student.vue'),
        meta:{title:'学生管理'}
      },
      {
        path:'class',
        component:()=>import('../views/index/class.vue'),
        meta:{title:'班级管理'}
      },
      {
        path:'score',
        component:()=>import('../views/index/score.vue'),
        meta:{title:'成绩管理'}
      },
      {
        path:'user',
        component:()=>import('../views/index/user.vue'),
        meta:{title:'用户设置'}
      },
    ]
    }
  ,

  ]
})
export default router
