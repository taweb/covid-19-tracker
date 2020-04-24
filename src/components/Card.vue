<template>
    <router-link :to="{ name: 'Detail', params: { id: country.Slug } }">
        <div class="rounded shadow-md p-6 bg-white flex justify-between h-full">
            <div class="mr-4">
                <h2 class="text-bold text-xl font-bold">{{ country.Country }}</h2>
                <p>Total Deaths: {{ country.TotalDeaths | numCommas }}</p>
                <p>Confirmed Cases: {{ country.TotalConfirmed | numCommas }}</p>
            </div>
            <Flag :code="code" />
        </div>
    </router-link>
</template>

<script>
    import Flag from '@/components/Flag'
    export default {
        props: {
            country: {
                type: Object,
                required: true
            },
        },
        components: {
            Flag,
        },
        computed: {
            code() {
                return this.country.CountryCode.toLowerCase()
            }
        },
        filters: {
            numCommas(number) {
                return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>