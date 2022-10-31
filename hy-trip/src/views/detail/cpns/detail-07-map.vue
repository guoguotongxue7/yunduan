<template>
    <div class="map">
        <DetailSection title="位置周边" more-text="查看更多周边信息">
            <div class="position">
                <img :src="mapData.mapUrl" alt="">
            </div>
        </DetailSection>
    </div>
</template>   

<script setup>
import DetailSection from '@/components/detail-section/detail-section.vue'

defineProps({
    mapData: {
        type: Object,
        default: ()=>({})
    }
})
</script>

<style lang="less" scoped>
.map {
    background-color: #f5f7fa;

    .position {
        margin: 10px;

        img {
            width: 100%;
        }
    }

}
</style>