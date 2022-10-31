<template>
    <div class="search-box">
        <!-- 位置信息 -->
        <div class="location bottom-gray-line">
            <div class="city" @click="cityClick">{{currentCity.cityName}}</div>
            <div class="position" @click="positionClick">
                <span class="text">我的位置</span>
                <img src="@/assets/img/home/icon_location.png" alt="">
            </div>
        </div>

        <!-- 日期范围-->
        <div class="date-range section bottom-gray-line" @click="showCalendar = true;">
            <div class="start">
                <div class="date">
                    <span class="tip">入住</span>
                    <span class="time">{{startDateStr}}</span>
                </div>
            </div>
            <div class="stay">
                <span>共{{stayCount}}晚</span>
            </div>
            <div class="end">
                <div class="date">
                    <span class="tip">离店</span>
                    <span class="time">{{endDateStr}}</span>
                </div>

            </div>

        </div>
        <van-calendar v-model:show="showCalendar" type="range" color="#ff9854" :round="false" @confirm="onConfirm" />

        <!-- 价格人数选项 -->
        <div class="price-count section bottom-gray-line">
            <div class="price">
                <span class="text">价格不限</span>
            </div>
            <div class="personCount">
                <span class="text">人数不限</span>
            </div>
        </div>

        <!-- 关键字 -->
        <div class="keyword section bottom-gray-line">
            <span class="text">关键字/位置/民宿名</span>
        </div>

        <!-- 热门建议 -->
        <div class="hot-suggests section">
            <template v-for="(item, index) in hotSuggests" :key="index">
                <div class="item" :style="{color: item.tagText.color, background: item.tagText.background}"
                    @click="hotSuggestsItemClick(item)">
                    {{ item.tagText.text }}
                </div>
            </template>
        </div>

        <!-- 搜索按钮 -->
        <div class="search-btn section">
            <div class="btn" @click="searchBtnClick">开始搜索</div>
        </div>

    </div>
</template>   

<script setup>
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import useMainStore from '@/stores/modules/main';
import useCityStore from '@/stores/modules/city';
import useHomeStore from '@/stores/modules/home';


import { formatMonthDate, getDiffDate } from '@/utils/format_date';

const cityStore = useCityStore();
const homeStore = useHomeStore();
const router = useRouter();

// 当前城市
const { currentCity } = storeToRefs(cityStore);

// 位置/城市点击
const cityClick = () => {
    router.push("/city");
}
const positionClick = () => {
    navigator.geolocation.getCurrentPosition(res => {
        console.log("获取位置成功", res);
    }, err => {
        console.log("获取位置失败", err);
    }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    });
}


// 日期范围的处理
// const nowDate = new Date();
// const newDate = new Date();
// newDate.setDate(nowDate.getDate() + 1);
const mainStore = useMainStore();
const { startDate, endDate } = storeToRefs(mainStore);

const startDateStr = computed(() => formatMonthDate(startDate.value));
const endDateStr = computed(() => formatMonthDate(endDate.value));
const stayCount = ref(getDiffDate(startDate.value, endDate.value));

const showCalendar = ref(false);

const onConfirm = (value) => {
    // 设置日期
    const selectStartDate = value[0];
    const selectEndDate = value[1];
    mainStore.startDate = selectStartDate;
    mainStore.endDate = selectEndDate;

    // 隐藏日历
    showCalendar.value = false;
    stayCount.value = getDiffDate(selectStartDate, selectEndDate)

}

// 网络请求热门建议
const { hotSuggests } = storeToRefs(homeStore);
const hotSuggestsItemClick = item => {
    router.push({
        path: "./search",
        query: {
            keyword: item.tagText.text
        }
    })

}

// 搜索页面
const searchBtnClick = () => {
    router.push({
        path: "/search",
        query: {
            startDate: startDate.value,
            endDate: endDate.value,
            currentCity: currentCity.value.cityName
        }
    });
}

</script>




<style lang="less" scoped>
.search-box {
    --van-calendar-popup-height: 100%;
}

.location {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 20px;

    .city {
        flex: 1;
        font-size: 15px;
        color: #333;
    }

    .position {
        width: 74px;

        .text {
            font-size: 12px;
            color: #666;
        }

        img {
            margin-left: 6px;
            width: 18px;
            height: 18px;
        }
    }

}

.section {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 0 25px 0 20px;
    height: 44px;
    color: #999;

    .date {
        display: flex;
        flex-direction: column;
        align-items: center;

        .time {
            margin-top: 3px;
            color: #333;
            font-size: 15px;
            font-weight: 500;
        }

        .tip {
            font-size: 12px;
            color: #999;
        }


    }

    .stay {
        height: 44px;
        line-height: 30px;
    }


}

.price-count .price {
    padding-right: 120px;
    border-right: 1px solid var(--line-color);
}

.hot-suggests {
    height: auto;
    margin: 10px 0;

    .item {
        padding: 4px 8px;
        margin: 5px 3px;
        border-radius: 3px;
        line-height: 1;
        font-size: 12px;
    }
}

.search-btn {
    .btn {
        height: 38px;
        width: 342px;
        max-height: 50px;
        font-weight: 500;
        font-size: 18px;
        line-height: 38px;
        text-align: center;
        border-radius: 20px;
        color: #fff;
        background-image: var(--theme-linear-gradient-color);
    }
}
</style>