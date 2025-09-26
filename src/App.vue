<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
onMounted(async() => {
  await store.dispatch('fetchDropdowns')
})
</script>

<template>
  <div>
    <router-view/>
  </div>
</template>

<style scoped>
</style>
