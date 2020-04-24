<template>
  <div>
    <input v-model="search" type="text" placeholder="Search for a country..." class="rounded shadow-md mx-auto block w-full max-w-screen-sm mb-5 p-2 text-2xl">
    <p class="text-lg mb-2">Sort Results</p>
    <div class="flex">
      <div class="block w-1/2 lg:w-1/4 lg:max-w-xs mr-2">
        <label for="field" class="block mb-1">Statistic:</label>
        <select id="field" @change="updateSort($event, 'field')" class="block h-8 shadow-md w-full">
          <option 
            v-for="(option, index) in sortBy.options.fields"
            :key="index"
            :value="option.type"
            :selected="sortBy.current.field.type === option.type"
          >
            {{ option.label }}
          </option>
        </select>
      </div>
      <div class="block w-1/2 lg:w-1/4 lg:max-w-xs ml-2">
        <label for="direction" class="block mb-1">Order:</label>
        <select id="direction" @change="updateSort($event, 'direction')" class="block h-8 shadow-md w-full">
          <option
            v-for="(option, index) in sortBy.options.direction"
            :key="index"
            :value="option.type"
            :selected="sortBy.current.direction.type === option.type"
          >
            {{ option.label }}
          </option>
        </select>
      </div>
    </div>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
      <Card v-for="(country, index) in filteredCountries" :key="index" :country="country"/>
    </div>
    <div class="text-center">
      <p v-if="!filteredCountries.length" class="text-lg">No countries found - please try a different search</p>
    </div>
  </div>
</template>

<script>
import axios from '@/services/axios.js'
import { mapGetters, mapActions, mapState } from 'vuex'
import Card from '@/components/Card'
export default {
  name: 'Home',
  components: {
    Card
  },
  data() {
    return {
      search: "",
    }
  },
  computed: {
    ...mapGetters({
      countries: 'sortedSummaries'
    }),
    ...mapState({
      sortBy: state => state.sortBy
    }),
    filteredCountries() {
      return this.countries.filter(country => {
        const regex = new RegExp(this.search, 'gi')
        return country.Country.match(regex)
      })
    }
  },
  methods: {
    updateSort(e, type) {      
      this.$store.dispatch('setSort', {type: type, value: e.target.value})
    }
  }
}
</script>
