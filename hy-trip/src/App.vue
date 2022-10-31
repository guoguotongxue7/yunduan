<template>
  <div class="app">
    <router-view v-slot="props">
      <keep-alive include="home">
        <component :is="props.Component"></component>
      </keep-alive>
    </router-view>

    <!-- includes匹配的是name属性 
    <keep-alive includes="home">
      <router-view /> 
    </keep-alive> -->
    <TabBar v-if="!route.meta.hideTabBar" />
    <loading />


  </div>
</template>



<script setup>
import TabBar from '@/components/TabBar/Vant版本.vue'
import { useRoute } from 'vue-router';

const route = useRoute();  // useRoute获取路由参数，useRouter进行路由跳转


</script>

<style scoped>

</style>