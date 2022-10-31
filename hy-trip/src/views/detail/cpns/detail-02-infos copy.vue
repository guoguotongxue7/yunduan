<template>
    <div class="infos" >
        <div class="name">{{topInfos.houseName}}</div>
        <div class="tags">
            <template v-for="(item, index) in topInfos.houseTags" :key="index">
                <span class="item" v-if="item.tagText"
                    :class="{color: item.tagText.color, background: item.tagText.background.color}">{{item.tagText.text}}</span>
            </template>
        </div>
        <div class="comment">
            <div class="left">
                <span class="score">{{topInfos.commentBrief.overall}}</span>
                <span class="title">{{topInfos.commentBrief.scoreTitle}}</span>
                <span class="brief">{{topInfos.commentBrief.commentBrief}}</span>
            </div>

            <div class="right">
                <div class="count">{{topInfos.commentBrief.totalCount}}条评论</div>
                <van-icon name="arrow" />
            </div>

        </div>
        <div class="location">
            <div class="left">
                <span class="address">{{topInfos.nearByPosition.address}}</span>
            </div>
            <div class="right">
                <div class="near">
                    地图·周边
                    <van-icon name="arrow" />
                </div>
            </div>

        </div>

    </div>
</template>   

<script setup>
import useDetailStore from '@/stores/modules/detail'
import { storeToRefs } from 'pinia';

const detailStore = useDetailStore();
const { topInfos } = storeToRefs(detailStore);
console.log("topInfos", topInfos);

</script>

<style lang="less" scoped>

</style>