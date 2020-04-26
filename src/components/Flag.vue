<template>
    <div v-if="svgPath">
        <img class="rounded-md shadow-md" :src="svgPath" alt="flag" loading="lazy" width="64">
    </div>
</template>

<script>
    export default {
        props: {
            code: {
                type: String,
                required: true
            },
        },
        computed: {
            svgPath() {
                const country = this.code.toLowerCase()
                let flag = null;
                try {
                    flag = require('@/assets/flags/' + country + '.svg')
                } catch(error) {}
                return flag
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>