<template>
    <div class="facility">
        <DetailSection title="房屋设施" more-text="查看全部设施">
            <template v-for="(item, index) in facilityData?.houseFacilitys" :key="index">
                <div class="house-facilities item" v-if="facilityData.facilitySort?.includes(index)">
                    <div class="group">

                        <img :src="item.icon" alt="">

                        <div class="text">{{item.groupName}}</div>
                    </div>
                    <div class="list">
                        <template v-for="(item, index) in item.facilitys.slice(0, 4)">
                            <div class="itemm">
                                <i class="icon_check icon"></i>
                                <span>{{item.name}}</span>
                            </div>
                        </template>
                    </div>
                </div>
            </template>

        </DetailSection>
    </div>
</template>   

<script setup>
import DetailSection from '@/components/detail-section/detail-section.vue'


const props = defineProps({
    facilityData: {
        type: Object,
        default: () => ({})
    }
})
</script>

<style lang="less" scoped>
.facility {
    padding: 5px 0;
    background-color: #f5f7fa;

    .item {
        display: flex;
        align-items: center;
        text-align: center;
        margin: 25px 0;

        .group {
            width: 90px;

            img {
                width: 20px;
                height: 20px;
            }

            .text {
                margin-top: 5px;
                color: #000;
            }
        }

        .list {
            display: flex;
            flex: 1;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: center;

            .itemm {
                display: flex;
                align-items: center;
                width: 50%;
                margin: 5px 0;

                .icon {
                    margin: 0 6px;
                }
            }
        }
    }
}
</style>