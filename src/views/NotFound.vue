<template>
    <div>
        <h2 class="text-bold text-xl font-bold">404</h2>
        <p class="mb-4">
            I'm sorry, the {{ resource }} you have searched for doesn't exist.
        </p>
        <router-link :to="{ name: 'Home' }">
            <button class="bg-red-500 hover:bg-red-700 text-black hover:text-white font-bold py-2 px-4 rounded shadow-md mb-4">
                &#8592; Back to Home
            </button>
        </router-link>
    </div>
</template>

<script>
    export default {
        props: {
            resource: {
                type: String,
                required: true 
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>