<template>
    <div class="city-group">
        <van-index-bar :sticky="false"  :index-list="cityIndexList">
            <!-- 热门城市数据 -->
            <van-index-anchor index="热门"  />
            <div class="list">
                <template  v-for="(city, index) in groupData.hotCities" :key="index">
                    <div class="city" @click="cityClick(city)">{{city.cityName}}</div>
                </template>

            </div>

            <!-- 全部城市数据 -->
            <template v-for="(group, index) in groupData.cities" :key="index">
                <van-index-anchor :index="group.group"  />
                <template v-for="(city, cityIndex) in group.cities" :key="cityIndex">
                    <van-cell :title="city.cityName" @click="cityClick(city)" />
                </template>
            </template>
        </van-index-bar>
    </div>
</template>   

<script setup>
import useCityStore from '@/stores/modules/city';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const cityStore = useCityStore(); 

// props
const props = defineProps({
    groupData: {
        type: Object,
        default: () => ({})
    }
});

// 根据城市数据动态生成首字母列表
const cityIndexList = computed(() => {
    const list = props.groupData.cities.map(item => item.group);  //需要通过props拿到groupData
    list.unshift("#");
    return  list;
});

// 监听城市的点击
const cityClick = (city) => {
    // 选中当前城市
    console.log(city.cityName);
    /* 方案一：事件总线
               缺点：利用事件总线把当前城市发送出去后，当前城市在很多地方都需要用到，
                     那么就很多地方都需要接收这个事件，比较繁琐
       方案二：把当前城市定义在store/city.js中 
    */
    cityStore.currentCity = city;

    // 返回上一级
    router.back();
}
</script>

<style lang="less" scoped>
.city-group {
    .list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        padding: 10px;
        padding-right: 25px;

        .city {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 70px;
            height: 28px;
            margin: 6px 0;
            border-radius: 14px;
            font-size: 12px;
            color: #000;
            background-color: #fff4ec;
        }
        
    }
}
</style>