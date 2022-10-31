<template>
    <div class="tab-control">
        <template v-for="(item, index) in titles" :key="item">
            <div class="tab-control-item" @click="itemClick(index)" :class="{ active: index === currentIndex }">
                <slot :item="item" aaa="mmm">
                    <span>{{ item }}</span>
                </slot>
            </div>
        </template>
    </div>
</template>   


<script>
export default {
    props: {
        titles: {
            type: Array,
            default: () => []
        }
    },

    data() {
        return {
            currentIndex: 0
        }
    },
    emits: ["tabItemClick"],
    methods: {
        itemClick(index) {
            this.currentIndex = index;
            // console.log(index);
            this.$emit("tabItemClick", index);
        },
        setCurrentIndex(index) {
            this.currentIndex = index;
        }
    }
}
</script>


<style lang="less" scoped>
.tab-control {
    display: flex;
    height: 44px;
    text-align: center;
    align-items: center;
}

.tab-control-item {
    flex: 1;
    cursor: pointer;

}

.tab-control-item.active {
    color: var(--primary-color);
    font-weight: bold;
}

.tab-control-item.active span {
    padding: 8px;
    border-bottom: 3px solid var(--primary-color);
}
</style>