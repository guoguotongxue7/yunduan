<template>
    <div class="notice">
        <DetailSection title="预定须知">
            <div class="notice-inner">
                <template v-for="(item, index) in noticeData" :key="index">
                    <div class="item">
                        <span class="title">{{item.title}}</span>
                        <span class="introduction">{{item.introduction}}</span>
                        <span class="tip" v-if="item.tips">查看说明</span>
                    </div>

                </template>
            </div>
        </DetailSection>
    </div>
</template>   

<script setup>
import DetailSection from '@/components/detail-section/detail-section.vue'

defineProps({
    noticeData: {
        type: Array,
        default: () => ([])
    }
})
</script>

<style lang="less" scoped>
.notice {
    background-color: #f5f7fa;

    .notice-inner {
        margin-top: 20px;

        .item {
            display: flex;
            padding: 6px 0;
            font-size: 12px;

            .title {
                width: 80px;
                color: #999;
            }

            .introduction {
                flex: 1;
                color: #333;
            }

            .tip {
                margin-right: 20px;
                font-weight: bold;
            }
        }
    }
}
</style>