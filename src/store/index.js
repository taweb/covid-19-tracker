import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/services/axios.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: true,
    summaries: {
      global: {},
      countries: []
    },
    countryDetail: {
      country: null,
      slug: null,
      data: []
    },
    sortBy: {
      options: {
        direction: [{
          type: 'asc',
          label: 'Ascending'
        }, {
          type: 'desc',
          label: 'Descending'
        }],
        fields: [
          {
            type: 'Slug',
            label: 'Country'
          },
          {
            type: 'TotalConfirmed',
            label: 'Confirmed Cases'
          },
          {
            type: 'TotalDeaths',
            label: 'Total Deaths'
          }
        ]         
      },
      current: {
        field: {
          type: 'Slug',
          label: 'Country'
        },
        direction: {
          type: 'asc',
          label: 'Ascending'
        }
      }
    }
  },
  mutations: {
    SET_COUNTRY_SUMMARIES(state, { global, countries }) {
      state.summaries = {
        global,
        countries
      }
    },
    SET_COUNTRY_DETAIL(state, payload) {
      state.countryDetail = payload
    },
    SET_LOADING(state, payload) {
      state.loading = payload
    },
    SET_SORT(state, { option, type }) {
      state.sortBy.current[type] = option
    }
  },
  actions: {
    setSort({ commit, state }, {type, value}) {
      if (type === 'field') {
        const optionToSet = state.sortBy.options.fields.find(option => option.type === value)
        commit('SET_SORT', {
          option: optionToSet,
          type
        })
      }
      if (type === 'direction') {
        const optionToSet = state.sortBy.options.direction.find(option => option.type === value)
        commit('SET_SORT', {
          option: optionToSet,
          type
        })
      }
    },
    setLoading({ commit }, payload) {
      commit('SET_LOADING', payload)
    },
    fetchCountrySummaries({ commit, state }){
      if (state.summaries.countries.length === 0) {
        return axios.getSummaries().then(({ data }) => {
          const obj = {
            global: data.Global,
            countries: data.Countries
          }
          commit('SET_COUNTRY_SUMMARIES', obj)
        })
      } else {
        return
      }
    },
    fetchCountryDetail({ commit, state }, slug){
      if (slug === state.countryDetail.slug) { return }
      return axios.getCountryDetail(slug).then(({ data }) => {        
        if (data.length === 0) {
          const emptyObj = {
            slug,
            country: null,
            data: []
          }
          return commit('SET_COUNTRY_DETAIL', emptyObj)
        }
        
        const country = data[0].Country
        const dataSeries = data.reduce((acc, record) => {
          const { Confirmed: confirmed, Deaths: deaths, Date: date } = record
          const formattedDate = date.slice(0, 10)

          return [...acc, {
            date: formattedDate,
            deaths,
            confirmed
          }]
        }, [])
        commit('SET_COUNTRY_DETAIL', {
          slug,
          country,
          data: dataSeries
        })
        
      })
    }
  },
  getters: {
    sortedSummaries: state => {
      const dir = state.sortBy.current.direction.type
      const field = state.sortBy.current.field.type      
      
      if (field === 'Slug') {
        return state.summaries.countries.sort((a, b) => {
          if (dir === "desc") { return b.Slug.localeCompare(a.Slug) }
          if (dir === "asc") { return a.Slug.localeCompare(b.Slug) }
        })
      } else {
        return state.summaries.countries.sort((a, b) => {
          if (dir === "desc") { 
            if (b[field] < a[field]) { return -1 }
            if (b[field] > a[field]) { return 1 }
            if (b[field] === b[field]) {
              return a.Slug.localeCompare(b.Slug)
            }
          }
          if (dir === "asc") { 
            if (b[field] > a[field]) { return -1 }
            if (b[field] < a[field]) { return 1 }
            if (b[field] === b[field]) {
              return a.Slug.localeCompare(b.Slug)
            }
          }
        })
      }
    },
    getSummaryBySlug: state => slug => {
      return state.summaries.countries.find(country => country.Slug === slug) || null
    }
  },
  modules: {
  }
})
