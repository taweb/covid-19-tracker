import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '@/views/NotFound'
import Detail from '@/views/Detail'
import store from '@/store'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (routeTo, routeFrom, next) => {
      if (store.state.summaries.countries.length) { next() }
      store.dispatch('fetchCountrySummaries').then(response => {
        next()
      })
    }
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: Detail,
    props: true,
    beforeEnter: (routeTo, routeFrom, next) => {
      store.dispatch('fetchCountrySummaries').then(() => {
        store.dispatch('fetchCountryDetail', routeTo.params.id).then(() => {
          next()
        }).catch(error => {
          if (error.response && error.response.status === 404) {
            next({ name: '404', params: { resource: 'country' }})
          }
        })
      })
    }
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    props: true
  },
  {
    path: '*',
    redirect: { name: '404', params: { resource: 'page' }}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  store.dispatch('setLoading', true)
  next()
})
router.afterEach(() => {
  store.dispatch('setLoading', false)
})

export default router
