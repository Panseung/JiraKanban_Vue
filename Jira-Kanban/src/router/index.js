import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import BoardMain from '@/components/BoardMain'
import FeaturesMain from '@/components/FeaturesMain'
import SettingsMain from '@/components/SettingsMain'

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
      component: BoardMain
    },
    {
      path: '/features',
      name: 'features',
      component: FeaturesMain
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsMain
    }
  ]
})
