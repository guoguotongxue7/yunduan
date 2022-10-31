<template>
    <div class="tab-bar">

        <template v-for="(item, index) in tabbarData" :key="index">
            <div class="tab-bar-item" 
                 :class="{ active: currentIndex === index}"
                 @click="itemClick(index, item)">
                <img v-if="currentIndex !== index" :src=getAssetsURL(item.image)>
                <img v-else="currentIndex === index " :src=getAssetsURL(item.imageActive)>
                <span class="text">{{item.text}}</span>
            </div>
        </template>
    </div>
</template>    

<script setup>
import { ref } from 'vue'
import tabbarData from '@/assets/data/tabbar'
import { getAssetsURL } from '@/utils/get_assets_img'
import { useRouter } from 'vue-router';

const router = useRouter();
const currentIndex = ref(0);

const itemClick= (index, item) => {
    // 切换页面
    currentIndex.value = index;
    // 切换路由
    router.push(item.path);
}

</script>

<style lang="less" scoped>
.tab-bar {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    background-color: #fff;
    border-top: 1px solid #ff9854;

    .tab-bar-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &.active {
            color: var(--primary-color);
        }

        .text {
            margin-top: 2px;
            font-size: 14px;
        }

        img {
            width: 36px;
        }
    }
}
</style>