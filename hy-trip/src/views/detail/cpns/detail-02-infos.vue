<template>
    <div class="infos">
        <div class="name">{{topInfos.houseName}}</div>
        <div class="tags">
            <template v-for="(item, index) in topInfos.houseTags" :key="index">
                <span class="item" v-if="item.tagText"
                    :style="{color: item.tagText.color, backgroundColor: item.tagText.background.color}">{{item.tagText.text}}</span>
            </template>
        </div>
        <div class="comment extra">
            <div class="left">
                <span class="score">{{topInfos.commentBrief.overall}}</span>
                <span class="title">{{topInfos.commentBrief.scoreTitle}}</span>
                <span class="brief">{{topInfos.commentBrief.commentBrief}}</span>
            </div>

            <div class="right">
                <div class="count">
                    {{topInfos.commentBrief.totalCount}}条评论
                    <van-icon name="arrow" />
                </div>
            </div>

        </div>
        <div class="location extra">
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

const props = defineProps({
    topInfos: {
        type: Object,
        default: () => ({})
    }
})

</script>

<style lang="less" scoped>
.infos {
    padding: 16px;
    background-color: #f5f7fa;


    .name {
        font-size: 14px;
        font-weight: bold;
        color: #333;

    }

    .tags {
        display: flex;
        justify-content: start;
        align-items: center;
        margin-top: 10px;

        .item {
            margin: 0 2px;
            font-size: 12px;
            padding: 1px 3px;
        }

    }

    .extra {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 12px 0;
        padding: 8px 12px;
        border-radius: 5px;
        font-size: 12px;




        .right {
            display: flex;
            color: #ff9645;
        }

        .score {
            font-weight: bold;
            font-size: 18px;
            color: #333;
        }

        .title {
            color: #333;
            font-weight: bold;
            margin: 0 3px;
        }

        .brief {
            color: #666;
        }

        .address {
            font-size: 14px;
            font-weight: bold;
            color: #333;
        }
    }

}
</style>