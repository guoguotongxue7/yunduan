<template>
    <div class="categories">
        <template v-for="(item, index) in categories" :key="item.id">
            <div class="item">
                <img :src="item.pictureUrl" alt="">
                <div class="text">{{item.title}}</div>
            </div>
        </template>
    </div>
</template>   

<script setup>
import { storeToRefs } from 'pinia';
import useHomeStore from '@/stores/modules/home';

const homeStore = useHomeStore();
const { categories } = storeToRefs(homeStore);
</script>

<style lang="less" scoped>
.categories {
    display: flex;
    height: 80px;
    padding: 0 10px;
    overflow-x: auto;

    &::-webkit-scrollbar {
        display: none;
    }


    .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 70px;
        flex-shrink: 0;
        text-align: center;

        // display: flex;
        img {
            width: 32px;
            height: 32px;
        }

        .text {
            margin-top: 8px;
            font-size: 12px;
        }
    }
}
</style>