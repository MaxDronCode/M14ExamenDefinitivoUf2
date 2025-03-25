<script setup>
import { useRoute, useRouter } from 'vue-router'
import UseData from '@/composables/UseData.js'
import { watch } from 'vue'

const { data, getData, centres, getCentresFromData } = UseData()

const route = useRoute()
const router = useRouter()

const any = route.params.any

getData()
watch(data, (newData) => {
  if (newData){
    getCentresFromData(newData)
    console.log(centres.value)
  }
})

const tornar = () => {
  router.push("/anys")
}


</script>
<template>
  <h1>Informe de l'any {{ any }}</h1>
  <p>Clica sobre el tipus de centre per visualitzar les dades</p>
  <h2>Centres:</h2>
  <ul>
    <li v-for="centre in centres" :key="centre">
      <RouterLink :to="`../detall_centre/${centre}/${any}`">{{ centre }}</RouterLink>
    </li>
  </ul>
  <button @click="tornar">Tornar</button>
</template>
<style scoped></style>
