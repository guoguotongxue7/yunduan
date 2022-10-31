<template>
    <div class="home" ref="homeRef">
        <home-nav-bar />
        <div class="banner">
            <img src="@/assets/img/home/banner.webp" alt="">
        </div>
        <home-search-box />
        <home-categories />
        <search-bar v-if="isShowSearchBar" />
        <home-content />

    </div>
</template>   

<script>
  export default {name: "home"} // 与keep-alive组件匹配
</script> 

<script setup>
import { computed, onActivated, ref, watch } from 'vue';

import HomeNavBar from './cpns/home-nav-bar.vue';
import homeSearchBox from './cpns/home-search-box.vue'
import homeCategories from './cpns/home-categories.vue'
import homeContent from './cpns/home-content.vue';
import searchBar from '@/components/search-bar/search-bar.vue';

import useHomeStore from '@/stores/modules/home'
import useScroll from '@/hooks/useScroll'

// 发送网络请求
const homeStore = useHomeStore();
homeStore.fetchHomeSuggestsData();
homeStore.fetchCategoriesData();
homeStore.fetchHouselistData();





// 监听window滚动,滚动到底部加载更多数据

// useScroll(() => {   这种方式只传入一个回调函数，不方便再追加其他功能
//     homeStore.fetchHouselistData();
// });

// 监听滚动到底部
const homeRef = ref();
const { isReachBottom, scrollTop } = useScroll(homeRef); 
watch(isReachBottom, (newValue) => {
    if (newValue) {
        homeStore.fetchHouselistData().then(() => {
            isReachBottom.value = false;  // 请求完数据,再修改isReachBottom的值
        });
    }
})


// 搜索框显示与否的控制
// 变量控制法,需要节流
/* const isShowSearchBar = ref(false);
watch(scrollTop, (newTop) => {
    isShowSearchBar.value = newTop > 100; 
}) */

// 计算属性做法,计算属性有缓存,不用节流
/* 一个标识符变化关系到另一个标识符,用计算属性比较方便;
一个标识符关系到js逻辑代码的执行,还是用watch监听,传入回调函数比较方便  */
const isShowSearchBar = computed(() => {
    return scrollTop.value >= 350;
})


// 跳转home时,保留原来的位置
onActivated(()=> {
    homeRef.value?.scrollTo({
        top: scrollTop.value
    })
})

</script>

<style lang="less" scoped>
.home {
    padding-bottom: 80px;
    height: 100vh;
    // height设置为页面高度100vh，让home页面的内容滚动而不是window页面滚动，
    // 这样可以避免页面切换时,触发了window窗口对页面滚动的监听事件
    box-sizing: border-box;
    overflow-y: auto;
    

    .banner img {
        width: 100%;
    }

    .search {
        position: fixed;
        z-index: 9;
        top: 0;
        left: 0;
        right: 0;
        height: 45px;
        padding: 16px 16px 10px;
        background-color: #fff;
    }
}
</style>