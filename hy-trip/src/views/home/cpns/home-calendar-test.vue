<template>
    <div class="calendar-test">
        <!-- 日期范围-->
        <div class="date-range section" @click="showCalendar = true">
            <div class="start">
                <div class="date">
                    <span class="tip">入住</span>
                    <span class="time">{{startDate}}</span>
                </div>
            </div>
            <div class="stay">
                <span>共一晚</span>
            </div>
            <div class="end">
                <div class="date">
                    <span class="tip">离店</span>
                    <span class="time">{{endDate}}</span>
                </div>

            </div>

        </div>
        <van-calendar v-model:show="showCalendar" type="range" color="#ff9854" :round="false" @confirm="onConfirm" />
        <div class="test" @click="showCalendar = true">
            <div class="date">
                <span>入住</span>
                <span>9.25</span>
            </div>
        </div>
        <van-calendar v-model:show="showCalendar" type="range" color="#ff9854" :round="false" @confirm="onConfirm" />

    </div>
</template>   

<script setup>
import useCityStore from '@/stores/modules/city';
import { storeToRefs } from 'pinia';
import { reactive, ref, toRef } from 'vue';
import { useRouter } from 'vue-router';

import { formatMonthDate } from '@/utils/format_date';

const cityStore = useCityStore();
const router = useRouter();

// 日期范围的处理
const nowDate = new Date();
const startDate = ref(formatMonthDate(nowDate));
const newDate = nowDate.setDate(nowDate.getDate() + 1);
const endDate = ref(formatMonthDate(newDate));

const showCalendar = ref(false);

const onConfirm = (value) => {
    const selectStartDate = value[0];
    const selectEndDate = value[1];
    startDate.value = formatMonthDate(selectStartDate);
    endDate.value = formatMonthDate(selectEndDate);
    console.log("-----");

    showCalendar.value = false;
    console.log(showCalendar);

    console.log(showCalendar.value);

}
</script>

<style lang="less" scoped>
.search-box {
    --van-calendar-popup-height: 100%;
}



.test {
    height: 40px;
    margin-top: 10px;
    background-color: pink;

}
</style>