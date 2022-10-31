<template>
    <div class="house-item">
        <div class="item-inner">
            <div class="cover">
                <img :src="itemData.image.url">
            </div>
            <div class="infos">
                <div class="location">
                    <img src="@/assets/img/home/location.png" alt="">
                    <span class="text">{{itemData.location}}</span>
                </div>
                <div class="summary">{{itemData.summaryText}}</div>
                <div class="houseName">{{itemData.houseName}}</div>
                <div class="price">
                    <div class="newPrice">{{"￥" + itemData.finalPrice}}</div>
                    <div class="oldPrice">{{"￥" + itemData.productPrice}}</div>
                    <div class="tip">{{itemData?.priceTipBadge?.text}}</div>
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

const itemStore = computed(() => {
    return Number(props.itemData.commentScore)
})
</script>

<style lang="less" scoped>
.house-item {
    width: 50%;


    .item-inner {

        margin: 5px;
        border-radius: 6px;
        background-color: #fff;
        overflow: hidden;


        .cover {

            img {
                width: 100%;
            }
        }


        .infos {
            padding: 8px 10px;
            font-size: 12px;
            color: #666;

            .location {
                display: flex;
                align-items: center;
                img {
                    width: 12px;
                    height: 12px;
                }

                .text {
                    margin-left: 2px;
                    font-size: 12px;
                    color: #666;
                }
            }

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
                align-items: flex-start;
                margin-top: 10px 0;
                
            }

            .newPrice {
                color: #ff9645;
                font-size: 14px;
            }

            .oldPrice {
                margin: 0 3px;
                color: #999;
                font-size: 12px;
                 text-decoration: line-through;
            }

            .tip {
                background-image: linear-gradient(270deg, #f66, #ff9f9f);
                color: #fff;
                padding: 0 6px;
                border-radius: 8px;
            }
        }

    }
}
</style>