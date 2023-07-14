import { createMemoryHistory, createRouter } from 'vue-router'

export default createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () =>
        import(/* webpackChunkName: "home" */ '../pages/HomePage.vue')
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () =>
        import(
          /* webpackChunkName: "settings" */ '../pages/SettingsPage.vue'
        )
    },
    {
      path: '/debug',
      name: 'Debug',
      component: () =>
        import(
          /* webpackChunkName: "debug" */ '../pages/DebugPage.vue'
        )
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})
