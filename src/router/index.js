import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/Home.vue')
const Index = () => import('../views/Index.vue')
const About = () => import('../views/mode/About.vue')
const page1 = () => import('../views/mode/page1.vue')


const ErrorPage = () => import('../views/mode/ErrorPage.vue')

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home,
    redirect: {
      name: 'index'
    },
    children: [{
      path: '/index',
      name: 'index',
      component: Index
    }, {
      path: '/about',
      name: 'about',
      component: About
    }, {
      path: '/page1',
      name: 'page1',
      component: page1
    }]
  },
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/404',
    component: ErrorPage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router