<template>
    <div class="wrapper">
        <div class="current-day">
            <div v-if="data !== null">
                <div class="current-day__city center">City-name</div>
                <div class="current-day__discription center">Yasno</div>
                <div class="current-day__temperature center">{{data.temp}}&#8451;</div>
                <div class="current-day__month center">Tuesday, 25 feb</div>
            </div>
            <div v-else>
                <h1>Choose your city</h1>
            </div>
        </div>
        <div class="city">
            <h1 class="city-discribe">Enter City!</h1>
            <div class="search">
                <input type="text" class="city-name" placeholder="...London?" v-model="city" @keyup.enter="getRequest">
                <small class="error" v-if="isError">Введите корректное название города!</small>
            </div>  
            <button class="btn" :disabled="isActive" @click="getRequest">Search</button>
        </div>
    </div>
</template>

<script>
import {ref, watch} from 'vue'
import axios from 'axios'
export default {
    setup() {
        const city = ref('')
        const data = ref(null)
        const isError = ref(false)
        const isActive = ref(true)

        watch(isError, val => {
            if(val) {
                setTimeout(() => {
                    error.value = false
                }, 3000)
            }
        })

        watch(city, val => {
            if(val.length > 3) {
                isActive.value = false
            }
        })

        const getRequest = async () => {
            try {
                const url = `https://api.api-ninjas.com/v1/weather?city=${city.value}`
                await axios.get(url, {
                    headers: {
                        'X-Api-Key': process.env.VUE_APP_API_KEY
                    },
                }).then(res => data.value = res.data)
            }catch(e) {
                isError.value = true
            }
        }
        return {
            city, getRequest, isError, data, isActive
        }
    }
}
</script>