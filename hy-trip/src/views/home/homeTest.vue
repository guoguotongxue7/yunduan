<template>
    <div class="home">
        <home-nav-bar></home-nav-bar>
        <div class="banner">
            <img src="@/assets/img/home/banner.webp" alt="">
        </div>
        <home-calendar-test></home-calendar-test>
    </div>
</template>   

<script setup>
import homeNavBar from './cpns/home-nav-bar.vue';
import homeCalendarTest from './cpns/home-calendar-test.vue';
</script>

<style lang="less" scoped>
.home {
    .banner img {
        width: 100%;
    }
}
</style>