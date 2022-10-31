<template>
    <div class="swipe">
        <van-swipe class="swipe-list" :autoplay="5000" indicator-color="white">
            <template v-for="(item, index) in swipeData">
                <van-swipe-item class="item">
                    <img :src="item.url" alt="">
                </van-swipe-item>
            </template>
            <template #indicator="{active, total}">
                <div class="indicator">
                    <template v-for="(value, key, index) in swiperGroup" :key="key">
                        <!-- 当索引值key 和 swipeData[active].enumPictureCategory值相同时，指示器加上active类。由于类型不一致，所以这里不用全等号 -->
                        <span class="item" :class="{active: swipeData[active]?.enumPictureCategory == key }">
                            <span class="text">{{ getName(value[0].title)}}</span>
                            <span class="count" v-if="swipeData[active]?.enumPictureCategory == key">{{
                            getCategoryIndex(swipeData[active]) + 1 }}/{{value.length}}</span>

                        </span>

                    </template>
                </div>
            </template>
        </van-swipe>
    </div>
</template>   

<script setup>
import { storeToRefs } from 'pinia';


import useDetailStore from '@/stores/modules/detail';

const detailStore = useDetailStore();
const { detailInfos } = storeToRefs(detailStore);
const swipeData = detailInfos.value.topModule.housePicture.housePics;

// 对轮播数据进行转换
const swiperGroup = {};   // 最终是转换为{"2": [item1, item2, ...], "4": [item3, item4, ...], ... }这样的对象

// 思路一：两次循环
/* for (const item of props.swipeData) {
    swiperGroup[item.enumPictureCategory] = []; //初始化轮播数据的分类
}
for (const item of props.swipeData) {
    // 将每个分类对应的item放到数组中存放起来
    const valueArray = swiperGroup[item.enumPictureCategory]; 
    valueArray.push(item);
} */

// 思路二：一次循环
if (swipeData) {
console.log("swipeData", swipeData);

    for (const item of swipeData) {
        let valueArray = swiperGroup[item.enumPictureCategory];
        if (!valueArray) {
            // 如果valueArray为空就初始化数组，然后存放item；valueArray有值就直接继续存放item
            valueArray = [];
            swiperGroup[item.enumPictureCategory] = valueArray;
        }
        valueArray.push(item);
    }
}

// console.log(swiperGroup);

// 定义转换数据的方法
const nameReg = /【(.*)】/i;
const getName = name => {
    // return name.replace("：", "").replace("【", "").replace("】", "");

    const results = nameReg.exec(name);
    return results[1];
}

const getCategoryIndex = item => {
    const valueArray = swiperGroup[item.enumPictureCategory];
    return valueArray.findIndex(data => data === item);
}

</script>

<style lang="less" scoped>
.swipe {
    .swipe-list {

        position: relative;

        .item {
            img {
                width: 100%;
            }
        }

        .indicator {
            display: flex;
            position: absolute;
            right: 5px;
            bottom: 5px;
            padding: 2px 5px;
            font-size: 12px;
            color: #fff;
            background: rgba(0, 0, 0, .1);

            .item {
                margin: 0 5px;

                &.active {
                    padding: 0 3px;
                    border-radius: 5px;
                    background-color: #fff;
                    color: #333;
                }

            }
        }
    }
}
</style>