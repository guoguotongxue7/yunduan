<template>
    <div class="house-item">

        <div class="item-inner">
            <div class="cover">
                <img :src="itemData.image.url">
            </div>
            <div class="infos">
                <div class="summary">{{itemData.summaryText}}</div>
                <div class="houseName">{{itemData.houseName}}</div>
                <div class="price">
                    <van-rate :model-value="itemStore"  color="#fff" :size="15"  allow-half readonly />
                    <div class="newPrice">{{"￥" + itemData.finalPrice}}</div>
                </div>
            </div>

        </div>

    </div>
</template>   

<script setup>
import { computed } from 'vue';

const props = defineProps({
    itemData: {
        type: Object,
        default: () => ({})
    }
}) 

const itemStore = computed(()=> {
    return Number(props.itemData.commentScore)
})
</script>

<style lang="less" scoped>
.house-item {
    width: 50%;


    .item-inner {

        position: relative;
        margin: 5px;
        border-radius: 6px;
        overflow: hidden;


        .cover {

            img {
                width: 100%;
            }
        }


        .infos {
            position: absolute;
            bottom: 0;
            padding: 10px;

            z-index: 2;
            font-size: 12px;
            color: #fff;

            .houseName {
                display: -webkit-box;

                margin: 5px 0;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                
            }

            .price {
                display: flex;
                justify-content: space-between;
                margin-top: 10px;
                font-size: 15px;
            }
        }

    }
}
</style>