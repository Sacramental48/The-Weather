<template>
    <div class="wrapper" :class="backgroundImage">
        <div class="wrapper__first-bg first-bg" v-if="isActive">
            <div class="first-bg__body">
                <input type="text" v-model="city" placeholder="Enter any city" @keyup.enter="getInputRequest">
            </div>
        </div>
        <div class="wrapper__content" v-else>
            <input type="text" v-model="city" :placeholder="weatherInfo.name" @keyup.enter="getInputRequest">
            <div class="wrapper__current-day current-day">
                <div class="current-day__body">
                    <div style="display: flex; gap: 10px;">
                        <div class="current-day__temperature">{{Math.round(currentTemperature)}}&deg;</div>
                        <div class="current-day__weather-icon">
                            <img class="current-day__icon" :src="`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`" alt="icon">
                            <p class="current-day__text">{{weatherInfo.weather[0].main}}</p>
                        </div>
                    </div>
                    <p class="current-day__city">{{weatherInfo.name}},</p>
                    <p class="current-day__country">{{weatherInfo.sys.country}}</p>
                </div>
                <div class="wrapper__info info">
                    <div class="info__body">
                        <p class="info__text">Clouds:</p>
                        <p>{{weatherInfo.clouds.all}}%</p>
                    </div>
                    <div class="info__body">
                        <p class="info__text">Humidity:</p>
                        <p>{{weatherInfo.main.humidity}}%</p>
                    </div>
                    <div class="info__body">
                        <p class="info__condition-text">Wind:</p>
                        <p>{{Math.round(weatherInfo.wind.speed)}}m/s</p>
                    </div>
                    <div class="info__body">
                        <p class="info__date">{{date}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref, watch, onMounted, computed} from 'vue'
import axios from 'axios'
import {useStore} from 'vuex'
    const store = useStore()
    const city = ref('')
    const weatherInfo = ref({})

    const currentTemperature = computed(() => weatherInfo.value.main.temp - 273)

    const isActive = ref(true)

    const time = ref('')
    const date = ref('')

    const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const updateTime = () => {
        if(weatherInfo.value.dt) {
            const cd = new Date();

            date.value = addZeroNumber(cd.getFullYear(), 4) + '-' + addZeroNumber(cd.getMonth()+1, 2) + '-' + addZeroNumber(cd.getDate(), 2) + ' ' + week[cd.getDay()];
        }
    }

    const addZeroNumber = (num, digit) => {
        let zero = '';
        for(let i = 0; i < digit; i++) {
            zero += '0';
        }
        return (zero + num).slice(-digit);
    }
    
    const getInputRequest = async () => {
        try {
            let instance = axios.create();
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${process.env.VUE_APP_API_KEY}`

            delete instance.defaults.headers.common['Accept'];
            delete instance.defaults.headers.common['X-Requested-With'];
            delete instance.defaults.headers.common['X-CSRF-TOKEN'];

            await instance.get(url).then(res => weatherInfo.value = res.data)
        } catch(e) {
            console.log(e)
        }
        updateTime()
        city.value = ''
        isActive.value = false
        console.log(weatherInfo.value);
    }

    const backgroundImage = computed(() => {
        if(isActive.value === false) {
            if(weatherInfo.value.weather[0].main === 'Clouds') {
                return 'background-clouds'
            } else if (weatherInfo.value.weather[0].main === 'Clear') {
                return 'background-clear'
            } else if (weatherInfo.value.weather[0].main === 'Snow') {
                return 'background-snow'
            } else if (weatherInfo.value.weather[0].main === 'Rain') {
                return 'background-rain'
            } else {
                return 
            }
        }
    })
</script>
<style scoped lang="scss">
@import './weather-style.scss';
</style>