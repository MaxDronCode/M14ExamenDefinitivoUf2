<script setup>
import { useRoute, useRouter } from 'vue-router'
import UseData from '@/composables/UseData.js'
import { watch, ref } from 'vue'

const route = useRoute()
const router = useRouter()

const mobilitatDones = ref("0")
const mobilitatHomes = ref("0")
const bequesDones = ref("0")
const bequesHomes = ref("0")
const percentageMobHomes = ref(0)
const percentatgeMobDones = ref(0)
const percentatgeBecaHomes = ref(0)
const percentatgeBecaDones = ref(0)

const centre = route.params.centre
const any = route.params.any

const tornar = () => {
  router.push(`/detall_any/${any}`)
}

const queryParams = {
  tipus_de_centres: centre,
  any: any,
}

const { data, getData } = UseData(queryParams)
getData()

const calculaPercentMobilitat = (mobilitatDones, mobilitatHomes) => {
  const totalMobilitat = Number(mobilitatDones) + Number(mobilitatHomes)
  console.log(totalMobilitat)
  if (mobilitatDones && mobilitatHomes == 0 || totalMobilitat == 0){
    percentageMobHomes.value = 0
    percentatgeMobDones.value = 0
    return
  }

  const percentDones = ((Number(mobilitatDones) / totalMobilitat) * 100).toFixed(2)
  const percentHomes = ((Number(mobilitatHomes) / totalMobilitat) * 100).toFixed(2)
  percentageMobHomes.value = percentHomes
  percentatgeMobDones.value = percentDones

}

const calculaPercentBeques = (bequesDones, bequesHomes) => {
  const totalBeques = Number(bequesDones) + Number(bequesHomes)

  if (bequesDones && bequesHomes == 0 || totalBeques == 0){
    percentageMobHomes.value = 0
    percentatgeMobDones.value = 0
    return
  }

  const percentDones = ((Number(bequesDones) / totalBeques) * 100).toFixed(2)
  const percentHomes = ((Number(bequesHomes) / totalBeques) * 100).toFixed(2)

  percentatgeBecaHomes.value = percentHomes
  percentatgeBecaDones.value = percentDones

}

watch(data, (newData) => {
  if (newData){
    mobilitatDones.value = newData[0].mobilitat_dones
    mobilitatHomes.value = newData[0].mobilitat_homes
    bequesDones.value = newData[0].formaci_dones
    bequesHomes.value = newData[0].formaci_homes
    calculaPercentMobilitat(mobilitatDones.value, mobilitatHomes.value)
    calculaPercentBeques(bequesDones.value, bequesHomes.value)
  }
})
</script>

<template>
  <h1>Informe sobre Beques i Mobilitat a {{ centre }}</h1>
  <h2>Any: {{ any }}</h2>
  <ul>
    <li><b>Beques Dones: </b>{{ bequesDones }} ({{ percentatgeBecaDones }}%)</li>
    <li><b>Beques Homes: </b>{{ bequesHomes }} ({{ percentatgeBecaHomes }}%)</li>
    <li><b>Mobilitat Dones: </b>{{ mobilitatDones }} ({{ percentatgeMobDones }}%)</li>
    <li><b>Mobilitat Homes: </b>{{ mobilitatHomes }} ({{ percentageMobHomes }}%)</li>
  </ul>
  <button @click="tornar">Tornar</button>
</template>

<style scoped></style>
