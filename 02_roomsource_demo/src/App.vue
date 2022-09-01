<template>
  <div class="app">
    <RoomArea :area-data="highScore"></RoomArea>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import RoomArea from './components/room-area.vue'

/* import highScore from './data/high_score.json'
console.log(highScore); */

// 模拟网络请求
const highScore = ref({});
setTimeout(() => {
  import("./data/high_score.json").then(res=> {
    // console.log(res);
    highScore.value = res.default;
  })
}, 1000)

</script>

<style lang="less" scoped>
.app {
  width: 1032px;
  margin: 0 auto;
  padding: 40px;
}
</style>