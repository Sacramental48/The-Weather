<template>
    <div class="wrapper">
        <div class="current-day">
            <AppLoader v-if="loader"/>
            <h1 v-if="checkOut">Select a city to Enter</h1>
            <div v-if="flag">
                <div class="current-day__city center" v-for="c in cityName" :key="c.id">{{c.name}}</div>
                <div class="current-day__discription center">Yasno</div>
                <div class="current-day__temperature center">{{data}}&#8451;</div>
                <div class="current-day__month center"></div>
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
import AppLoader from '../components/ui/AppLoader.vue'
export default {
    setup() {
        const city = ref('')
        const cityName = ref('')

        const data = ref(null)

        const isError = ref(false)
        const isActive = ref(true)
        const loader = ref(false)
        const flag = ref(false)
        const checkOut = ref(true)

        watch(isError, val => {
            if(val) {
                setTimeout(() => {
                    isError.value = false
                }, 3000)
            }
        })

        watch(city, val => {
            if(val.length > 3) {
                isActive.value = false
            }
        })

        const getRequest = async () => {
            checkOut.value = false
            loader.value = true
            flag.value = false
            try {
                const url = `https://api.api-ninjas.com/v1/weather?city=${city.value}`
                await axios.get(url, {
                    headers: {
                        'X-Api-Key': process.env.VUE_APP_API_KEY
                    },
                }).then(res => data.value = res.data.temp)
            }catch(e) {
                isError.value = true
            }

           try {
                const url = `https://api.api-ninjas.com/v1/city?name=${city.value}`
                await axios.get(url, {
                    headers: {
                        'X-Api-Key': process.env.VUE_APP_API_KEY
                    },
                }).then(res => cityName.value = res.data)
            }catch(e) {
            }
            loader.value = false
            flag.value = true
        }
        return {
            city, 
            getRequest, 
            isError, 
            data, 
            isActive, 
            cityName,
            loader,
            flag,
            checkOut,
            newDate: new Date().toJSON().slice(0,10).replace(/-/g,'/')
        }
    },
    components: {
        AppLoader
    }
}
</script>