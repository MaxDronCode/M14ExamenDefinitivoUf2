import axios from 'axios'
import { ref } from 'vue'

export default function UseData(queryParams) {
  const URL = 'https://analisi.transparenciacatalunya.cat/resource/rsgi-8ymj.json'
  const data = ref([])
  const anys = ref([])
  const centres = ref([])

  const getData = async() => {
    try{
      const response = await axios.get(URL, { params: {...queryParams}})
      data.value = response.data
      // console.log(data.value)
    } catch (err) {
      console.error(err)
    }
  }

  const getAnysFromData = (data) => {
    if (!Array.isArray(data)) return
    data.forEach(obj => {
      if (!anys.value.includes(obj.any)) {
        anys.value.push(obj.any)
      }
    })
  }

  const getCentresFromData = (data) => {
    if (!Array.isArray(data)) return
    const uniqueCentres = new Set()
    data.forEach(obj => {
      uniqueCentres.add(obj.tipus_de_centres)
    })
    centres.value = Array.from(uniqueCentres)
  }

  return {
    data, anys, getData, getAnysFromData, centres, getCentresFromData
  }
}
