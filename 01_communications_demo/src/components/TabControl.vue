<template>
    <div class="tab-control">
        <template v-for="(item, index) in titles" :key="item">
            <div class="tab-control-item" @click="itemClick(index)" :class="{ active: index === currentIndex }">
                <span>{{ item }}</span>

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
            currentIndex: -1
        }
    },
    emits: ["tabItemClick"],
    methods: {
        itemClick(index) {
            this.currentIndex = index;
            // console.log(index);
            this.$emit("tabItemClick", index);
        }
    }
}
</script>

<style scoped>
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
    color: red;
    font-weight: bold;
}

.tab-control-item.active  span {
    padding: 8px;
    border-bottom: 3px solid red;
}
</style>