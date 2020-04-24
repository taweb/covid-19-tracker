<template>
  <div class="bg-red-500 p-6 mb-6 fixed w-full">
    <router-link :to="{ name: 'Home' }"><h1 class="font-bold uppercase">&#x1F30D; Covid-19 Stats</h1></router-link>
  </div>
</template>

<script>
export default {
  name: 'Nav'
}
</script>