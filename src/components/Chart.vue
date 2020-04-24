<script>
    import { Line, mixins } from 'vue-chartjs'
    const { reactiveProp } = mixins

    export default {
        extends: Line,
        mixins: [reactiveProp],
        props: ['chartData', 'chartOptions'],
        mounted () {                                    
            this.renderChart({
                labels: this.chartData.labels,
                datasets: this.chartData.datasets
            }, {
                ...this.chartOptions,
            })
        }
    }
</script>

<style lang="scss" scoped>
</style>