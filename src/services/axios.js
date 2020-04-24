import axios from 'axios'

const api = axios.create({
    baseURL: `https://api.covid19api.com/`,
    'Content-Type': 'application/json'
})

export default {
    getSummaries() {
        return api.get('/summary')
    },
    getCountryDetail(slug) {
        return api.get('/total/dayone/country/' + slug)
    }
}