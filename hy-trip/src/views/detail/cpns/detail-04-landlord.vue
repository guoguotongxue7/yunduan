<template>
    <div class="landlord">
        <DetailSection :title="'房东介绍'" more-text="查看房东主页">
            <div class="top">
                <img :src="landlordData.topScroll" alt="">
            </div>
            <div class="info">
                <div class="left">
                    <div class="icon">
                        <img :src="landlordData.hotelLogo" alt="">

                    </div>
                    <div class="hotel">
                        <div class="hotelName">{{landlordData.hotelName}}</div>
                        <div class="hotelTags">
                            <template v-for="(item, index) in landlordData.hotelTags" :key="index">
                                <span class="item">{{item.tagText.text}} |</span>
                            </template>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="contact">联系房东</div>
                </div>
            </div>
            <div class="hotelSummary">
                <template v-for="(item,index) in  landlordData.hotelSummary" :key="index">
                    <div class="item">
                        <div class="title">{{item.title}}</div>
                        <div class="introduction">{{item.introduction}}</div>
                        <div class="tip">{{item.tip}}</div>
                    </div>
                </template>
            </div>
        </DetailSection>
    </div>
</template>   

<script setup>
import DetailSection from '@/components/detail-section/detail-section.vue'

const props = defineProps({
    landlordData: {
        type: Object,
        default: () => ({})
    }
})
</script>

<style lang="less" scoped>
.landlord {
    padding-right: 15px;
    background-color: #f5f7fa;

    .top img {
        width: 100%;
        margin-top: 10px;
        border-radius: 3px;
    }

    .info {
        display: flex;
        align-items: center;
        margin: 15px 0;

        .left {
            display: flex;

            img {
                width: 50px;
                height: 50px;
            }

            .hotel {
                display: flex;
                flex-direction: column;
                margin: 5px;

                .hotelName {
                    font-weight: bold;
                }

                .hotelTags {
                    padding-top: 5px;
                    font-size: 12px;
                    color: #999;

                    .item {
                        margin-right: 2px;
                    }
                }
            }
        }

        .right {
            .contact {
                margin-left: 20px;
                width: 70px;
                height: 25px;
                line-height: 25px;
                border-radius: 5px;
                background-color: var(--primary-color);
                color: #fff;
                text-align: center;
                font-size: 12px;
            }
        }
    }

    .hotelSummary {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .item {
            margin: 10px 0;
            .title, .tip {
                padding: 2px 0;
                color: #999;
                font-size: 12px;
            }
            .introduction {
                font-size: 16px;
            }
           
        }
    }

}
</style>