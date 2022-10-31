<template>
    <div class="detail top-page ">
        <van-nav-bar title="房屋详情" left-text="旅途" left-arrow @click-left="onClickLeft" />
        <div class="main" v-if="detailInfos"> 
            <!-- mainPart初始值是一个空对象,第一次加载时就为空,那么vue会报错;
                 所以这里用一个div包裹一下,在外层div使用v-if来保证mainPart不会因为空值而报错 -->
            <detail-swipe ></detail-swipe>
            <detail-infos ></detail-infos>
        </div>
    </div>
</template>   

<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'

import { getDetailInfos } from '@/service/modules/detail';
import DetailSwipe from './cpns/detail-01-swipe copy.vue';
import DetailInfos from './cpns/detail-02-infos copy.vue';
import useDetailStore from '@/stores/modules/detail';
import { storeToRefs } from 'pinia';
const route = useRoute();
const router = useRouter();

// const houseId = route.params.id;
// const detailInfo = ref({});
// const mainPart = computed(() => detailInfo.value.mainPart);
const detailStore = useDetailStore();
const {detailInfos} = storeToRefs(detailStore);
const mainPart = computed(() => detailInfos.value.mainPart);

// 发送网络请求
/* 一般在项目中,请求数据统一在页面中或者统一在store中,这里是为了学习不同的思路所以没有保存到detailStore中 */
// getDetailInfos(houseId).then(res => {
//     detailInfo.value = res.data;
// })
detailStore.fetchDetailInfosData();


// 监听返回按钮的点击
const onClickLeft = () => {
    router.back();
}


</script>

<style lang="less" scoped>

</style>