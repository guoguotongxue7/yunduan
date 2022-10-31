<template>
    <div class="section">
        <div class="header">
            <h2 class="title">{{title}}</h2>
        </div>
        <div class="content">
            <slot>
                <h3>默认插槽内容</h3>
            </slot>
        </div>
        <div class="footer" v-if="moreText.length">
            <span class="more">
                {{moreText}}
                <van-icon name="arrow" />

            </span>
        </div>
    </div>
</template>   

<script setup>
const props = defineProps({
    title: {
        type: String,
        default:  "默认标题"
    },
    moreText: {
        type: String,
        default: ""
    }
})
</script>

<style lang="less" scoped>

.section  {
    padding-left: 10px;
    .footer {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 44px;
        padding-right: 10px;
        font-size: 14px;
        color: #ff9645;

    }
}

</style>