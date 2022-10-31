<template>
    <div class="intro">
        <h3>价格说明</h3>
        <div class="introduction">{{introData.introduction}}</div>
    </div>
</template>   

<script setup>

defineProps({
    introData: {
        type: Object,
        default: ()=> ({})
    }
})
</script>

<style lang="less" scoped>
.intro {
    background-color: #f5f7fa;
    padding: 15px;
    border-top: 5px solid #f2f3f4;

    .introduction {
        padding-top: 15px;
        font-size: 12px;
        color: #999;
    }
}
</style>