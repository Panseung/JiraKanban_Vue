import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/board',
      name: 'board',
      component: () => import ( '../components/BoardMain' )
    },
    {
      path: '/features',
      name: 'features',
      component: () => import ( '../components/FeaturesMain' )
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import ( '../components/SettingsMain' )
    }
  ]
})
