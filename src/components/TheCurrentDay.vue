<template>
    <div class="weather">
        <div class="current-day">
            <div class="current-day__city center">London</div>
            <div class="current-day__discription center">Yasno</div>
            <div class="current-day__temperature center">28 &#8451;</div>
            <div class="current-day__month center">Twosday, 25 feb</div>
        </div>
        <div class="another-day">
            <div class="another-day__one box">
                <div class="left">
                    <p>Monday</p>
                    <span>clear</span>
                </div>
                <div class="rigth">
                    <div>25 <span>&#8451;</span></div>
                </div>
            </div>
            <div class="another-day__two box">
                <div class="left">
                    <p>Wednesday</p>
                    <span>clear</span>
                </div>
                <div class="rigth">
                    <div>25 <span>&#8451;</span></div>
                </div>
            </div>
            <div class="another-day__three box">
                <div class="left">
                    <p>Thursday</p>
                    <span>rain</span>
                </div>
                <div class="rigth">
                    <div>25 <span>&#8451;</span></div>
                </div>
            </div>
            <div class="another-day__four box">
                <div class="left">
                    <p>Friday</p>
                    <span>rain</span>
                </div>
                <div class="rigth">
                    <div>25 <span>&#8451;</span></div>
                </div>
            </div>
            <div class="another-day__five box">
                <div class="left">
                    <p>Saturday</p>
                    <span>snow</span>
                </div>
                <div class="rigth">
                    <div>25 <span>&#8451;</span></div>
                </div>
            </div>
            <div class="another-day__six box">
                <div class="left">
                    <p>Sunday</p>
                    <span>rain</span>
                </div>
                <div class="rigth">
                    <div>25 <span>&#8451;</span></div>
                </div>
            </div>
        </div>
        <div class="city">
            <h1 class="city-discribe">Enter City!</h1>
            <div class="search">
                <input type="text" id="city" class="city-name">
                <div class="button">
                    <div class="button__text">Learn more...</div>
                    
                    <div class="button__wrapper">
                        <div class="button__arrow"></div>
                        <div class="button__border-circle"></div>
                        <div class="button__mask-circle">
                        <div class="button__small-circle"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import {ref} from 'vue'
export default {
}
</script>