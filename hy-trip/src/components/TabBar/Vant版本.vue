<template>
    <div class="tab-bar">

        <van-tabbar v-model="currentIndex" active-color="orange" route >
            <template v-for="(item, index) in tabbarData">
                <van-tabbar-item :to="item.path">
                    <span>{{item.text}}</span>
                    <template #icon>
                        <img v-if="currentIndex !== index" :src="getAssetsURL(item.image)">
                        <img v-else="currentIndex === index " :src="getAssetsURL(item.imageActive)">
                    </template>
                </van-tabbar-item>
            </template>

        </van-tabbar>
    </div>
</template>    

<script setup>
import { ref, watch } from 'vue'
import tabbarData from '@/assets/data/tabbar'
import { getAssetsURL } from '@/utils/get_assets_img'
import { useRoute } from 'vue-router';

// 监听路由发生变化时，找到对应的索引，设置currentIndex
const route = useRoute();
const currentIndex = ref(0);
watch(route, newRoute => {
    const index = tabbarData.findIndex(item => item.path === newRoute.path);
    if (index === -1) return; //严谨：如果没有找到对应的路径，直接返回
    currentIndex.value = index;
})

</script>

<style lang="less" scoped>
.tab-bar {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    border-top: 1px solid #ff9854;
    z-index: 2;

    // 找到类，对类中的css属性重写
    // :deep(class)找到子组件的类，让子组件的类中的样式也可以生效
    :deep(.van-tabbar-item__text) {
        font-size: 16px;
    }

    img {
        height: 30px;
    }
}
</style>