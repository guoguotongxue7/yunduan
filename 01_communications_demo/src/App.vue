<template>
  <div class="app">
    <!-- 1. tab-control -->
    <tab-control :titles="['衣服', '鞋子', '裤子']" @tab-item-click="tabItemClick"></tab-control>

    <!-- <tab-control :titles="['女装', '男装', '童装', '流行']"></tab-control> -->


    <!-- 2. 根据tab-control展示内容 -->
    <h1>{{pageContents[currentIndex]}}</h1>
  </div>
</template>   

<script>
import TabControl from './components/TabControl.vue'
export default {
  components: {
    TabControl

  },
  data() {
    return {
      pageContents: [
        "衣服列表",
        "鞋子列表",
        "裤子列表"
      ],
      currentIndex: 0,
    }
  },
  methods: {
    tabItemClick(index) {
      console.log("app:", index);
      this.currentIndex = index;

    }
  }
}
</script>

<style scoped>

</style>