<template>
    <div class="city">
        <div class="top">
            <!-- 1. 搜索框 -->
            <van-search v-model="searchValue" placeholder="城市/区域/位置" shape="round" show-action @cancel="cancelClick" />

            <!-- 2. Tab切换栏-->
            <!-- tabActive默认是绑定的索引，给tab绑定name属性后，tabActive就绑定了属性值 -->
            <van-tabs v-model:active="tabActive" color="#ff9854">
                <template v-for="(value, key, index) in allCities" :key="key">
                    <van-tab :title="value.title" :name="key"></van-tab>
                </template>
            </van-tabs>
        </div>

        <div class="content">
            <!-- <city-group :group-data="currentCityGroup"></city-group> -->

            <!-- 优化切换标签页内容的速度：展示两个标签的内容，然后把未选中tab的内容隐藏 -->
            <template v-for="(value, key, index) in allCities">
                <city-group  v-show="tabActive === key" :group-data="value"  />
            </template>

        </div>
    </div>
</template>   

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import useCityStore from '@/stores/modules/city';
import { storeToRefs } from 'pinia';

import cityGroup from './cpns/city-group.vue';

const router = useRouter();

// 1. 搜索框功能
const searchValue = ref("");
const cancelClick = () => {
    router.back();// 回到上一个路由页面
};

// 2. tab切换
const tabActive = ref();
/** 
 * 这个位置发送网络请求有两个缺点
 * 1. 如果网络请求太多，那么页面组件中就包含了大量的对于网络请求和数据处理逻辑
 * 2. 如果页面封装了很多的子组件，子组件需要这些数据，我们必须一步步将数据传递出去
 * 
 * 所以，这里把网络请求抽取到一个状态管理文件中
 */

// 网络请求：城市数据
/* const allCities = ref({});
getCityAll().then(res => {
    console.log("城市数据请求成功");
    allCities.value = res.data;
}) */
// 从store中获取数据
const cityStore = useCityStore();
cityStore.fetchAllCitiesData();
const { allCities } = storeToRefs(cityStore);


/** 3. 获取选中标签的数据
 * 3.1 获取正确的Key:将tab中name属性绑定key值，则将tabs中绑定的tabActive正确绑定
 * 3.2 根据key从allCities中获取数据，默认直接获取的数据不是响应式的，所以我们用computed对数据进行转换
 */
const currentCityGroup = computed(() => allCities.value[tabActive.value]);

</script>



<style lang="less" scoped>
.city {
    --van-tabs-line-height: 40px;

    /* 这种方案，内容部分的滚动条位置是整个页面下的滚动状态，所以不采用
    .top {  top固定定位
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
    }

    .content {
        margin-top: 94px;
    } */

    .top {  // 防止城市数据滚动时遮挡标签栏
        position: relative;
        z-index: 5;
    }


    // 布局滚动
    .content {
        height: calc(100vh - 94px);
        overflow-y: auto;
    }
}
</style>