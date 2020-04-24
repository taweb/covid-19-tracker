<template>
    <div>
        <router-link :to="{ name: 'Home' }">
            <button class="bg-red-500 hover:bg-red-700 text-black hover:text-white font-bold py-2 px-4 rounded shadow-md mb-4">
                &#8592; Back
            </button>
        </router-link>
        <div class="flex justify-between">
            <h2 v-if="summary" class="text-bold text-xl font-bold">{{ summary.Country }}</h2>
            <Flag v-if="summary" :code="summary.CountryCode" />
        </div>
        <div class="md:flex md:justify-between">
            <div>
                <p v-if="lastData">Last Update: {{ lastData }}</p>
                <p v-if="summary">Total Deaths: {{ summary.TotalDeaths | numCommas }}</p>
                <p v-if="summary" >Confirmed Cases: {{ summary.TotalConfirmed | numCommas }}</p>
                <p>Latest Daily Death Toll: {{ lastDayToll | numCommas }}</p>
                <p>Latest New Daily Cases: {{ lastDayCases | numCommas }}</p>
            </div>
            <div v-if="detail.data.length" class="mt-4 md:mt-0">
                <p>Note:</p>
                <li class="text-sm list-disc">The chart below shows data from the date of the first recorded case</li>
                <li class="text-sm list-disc">Hide and show datasets by clicking on items in the legend</li>
            </div>
        </div>
        <div v-if="detail.data.length" class="relative w-full pt-8">
            <Chart :chartData="chartDataFormatted" :chart-options="chartOptions"/>
        </div>
    </div>
</template>

<script>
    import Chart from '@/components/Chart'
    import Flag from '@/components/Flag' 
    import { mapState, mapGetters } from 'vuex'
    import store from '@/store'

    export default {
        props: {
            id: {
                type: String,
            },
        },
        data() {
            return {
                chartOptions: {
                    maintainAspectRatio: false,
                },
            }
        },
        components: {
            Chart,
            Flag
        },
        filters: {
            numCommas(number) {
                return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
        },
        computed: {
            ...mapState({
                detail: state => state.countryDetail
            }),
            ...mapGetters(['getSummaryBySlug']),
            summary() {
                return this.getSummaryBySlug(this.id)
            },
            chartDataFormatted(){
                if (!this.detail.data.length) {
                    return null
                }

                const labels = this.detail.data.map(record => record.date)
                const deathsData = this.detail.data.map(record => record.deaths)
                const confirmedData = this.detail.data.map(record => record.confirmed)
                const dailyIncreaseConfirmed = this.detail.data.map((record, index) => {
                    if (index === 0) {
                        return record.confirmed
                    } else {
                        return record.confirmed - this.detail.data[index - 1].confirmed
                    }
                })
                const dailyIncreaseDeaths = this.detail.data.map((record, index) => {
                    if (index === 0) {
                        return record.deaths
                    } else {
                        return record.deaths - this.detail.data[index - 1].deaths
                    }
                })

                const datasets = [
                    {
                        name: 'deaths',
                        label: 'Deaths',
                        borderColor: '#cd0000',
                        backgroundColor: '#cd0000',
                        data: deathsData,
                        fill: false
                    },
                    {
                        name: 'daily-deaths',
                        label: 'Daily Rise in Deaths',
                        borderColor: '#ff7400',
                        backgroundColor: '#ff7400',
                        data: dailyIncreaseDeaths,
                        fill: false
                    },
                    {   
                        name: 'cases',
                        label: 'Confirmed Cases',
                        borderColor: '#0004ff',
                        backgroundColor: '#0004ff',
                        data: confirmedData,
                        fill: false
                    },
                    {
                        name: 'daily-cases',
                        label: 'Daily Rise in Confirmed Cases',
                        borderColor: '#00c5ff',
                        backgroundColor: '#00c5ff',
                        data: dailyIncreaseConfirmed,
                        fill: false
                    },
                ]
                
                return {
                    title: this.detail.country + ' Statistics',
                    labels,
                    datasets
                }
            },
            lastDayToll() {
                return this.chartDataFormatted && this.chartDataFormatted.datasets.find(set => set.name === 'daily-deaths').data.slice(-1)[0] || 0
            },
            lastDayCases() {
                return this.chartDataFormatted && this.chartDataFormatted.datasets.find(set => set.name === 'daily-cases').data.slice(-1)[0] || 0
            },
            lastData() {
                return this.chartDataFormatted && this.detail.data.slice(-1)[0].date
            }
        },
    }
</script>

<style lang="scss" scoped>
    
</style>