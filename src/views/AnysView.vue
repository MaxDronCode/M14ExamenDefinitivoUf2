<script setup>
import { watch } from 'vue'
import { RouterLink } from 'vue-router'
import UseData from '@/composables/UseData.js'

const { data, anys, getData, getAnysFromData } = UseData()

getData()

watch(data, (newData) => {
  getAnysFromData(newData)
  console.log(anys.value)
})
</script>
<template>
  <h1>Llistat d'Anys</h1>
  <ul>
    <li v-for="any in anys" :key="any">
      <RouterLink :to="`detall_any/${any}`">{{ any }}</RouterLink>
    </li>
  </ul>
</template>
<style scoped></style>
