<template>
    <div class="detail top-page" ref="DetailRef">
        <TabControl v-if="showTabControl" class="tabs" :titles="names" @tab-item-click="tabItemClick" ref="tabControlRef" />
        <van-nav-bar title="房屋详情" left-text="旅途" left-arrow @click-left="onClickLeft" />
        <div class="main" v-if="detailInfo" v-memo="[mainPart]">
            <!-- mainPart初始值是一个空对象,第一次加载时就为空,那么vue会报错;
                 所以这里用一个div包裹一下,在外层div使用v-if来保证mainPart不会因为空值而报错 -->
            <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics" />
            <detail-infos name="描述" :ref="getSectionRef" :topInfos="mainPart.topModule" />
            <DetailFacility name="设施" :ref="getSectionRef"
                :facility-data="mainPart.dynamicModule.facilityModule.houseFacility" />
            <DetailLandLord name="房东" :ref="getSectionRef" :landlord-data="mainPart.dynamicModule.landlordModule" />
            <DetailComment name="评论" :ref="getSectionRef" :comment-data="mainPart.dynamicModule.commentModule" />
            <DetailNotice name="须知" :ref="getSectionRef" :notice-data="mainPart.dynamicModule.rulesModule.orderRules" />
            <DetailMap name="周边" :ref="getSectionRef" :map-data="mainPart.dynamicModule.positionModule" />
            <DetailIntro :intro-data="mainPart.introductionModule" />

        </div>

        <div class="footer">
            <img src="@/assets/img/detail/icon_ensure.png" alt="">
            <div class="text">弘源旅途, 永无止境!</div>
        </div>
    </div>
</template>   

<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router'

import { getDetailInfos } from '@/service/modules/detail'
import TabControl from '@/components/tab-control/TabControl.vue'
import useScroll from '@/hooks/useScroll';


import DetailSwipe from './cpns/detail-01-swipe.vue';
import DetailInfos from './cpns/detail-02-infos.vue';
import DetailFacility from './cpns/detail-03-facility.vue'
import DetailLandLord from './cpns/detail-04-landlord.vue'
import DetailComment from './cpns/detail-05-comment.vue'
import DetailNotice from './cpns/detail-06-notice.vue'
import DetailMap from './cpns/detail-07-map.vue'
import DetailIntro from './cpns/detail-08-intro.vue'

const route = useRoute();
const router = useRouter();

const houseId = route.params.id;
const detailInfo = ref();
const mainPart = computed(() => detailInfo.value.mainPart);


// 发送网络请求
/* 一般在项目中,请求数据统一在页面中或者统一在store中,这里是为了学习不同的思路所以没有保存到detailStore中 */
getDetailInfos(houseId).then(res => {
    detailInfo.value = res.data;
})

// 监听返回按钮的点击
const onClickLeft = () => {
    router.back();
}

// tabControl相关操作
const DetailRef = ref();

const sectionEls = ref({}); // sectionEls是一个对象，组件name值和组件元素一一对应，{"周边":div.map, ...}
const names = computed(() => {
    return Object.keys(sectionEls.value); // sctionEls的key值就是组件的name属性
})

const getSectionRef = (value) => { //ref引用会内部绑定组件
    if (!value) return; // 卸载组件时，value为null，这时下面的代码会报错，所以要判断value是否为空

    // 动态获取每个组件的name属性
    const name = value.$el.getAttribute("name");
    // console.log("name",name);  name是组件根元素的name属性值："描述"、"设施"、"房东"、"周边"等等
    // console.log("value.$el",value.$el);   value.$el是根组件元素： div.facility, div.landlord等等
    // console.log("sectionEls.value", sectionEls.value);  {"周边": div.map,"描述": div.infos, "设施":div.facility, ...}
    sectionEls.value[name] = value.$el;  // 把组件的根元素和name值一一对应，保存到sectionEls对象中
}

const { scrollTop } = useScroll(DetailRef);
const showTabControl = computed(() => {
    // console.log(scrollTop.value);
    return scrollTop.value > 300;
});

let isClick = false;  // isClick分情况控制点击时的index和滚动时的index
let currentDistance = -1;
const tabItemClick = (index) => {

    // console.log("index", index); index是tabControl组件内部传过来的索引值

    const key = Object.keys(sectionEls.value)[index]; //key是根据索引值拿到的组件name值,比如 设施、房东等等
    // console.log(key);
    const el = sectionEls.value[key];  // 根据name值拿到对应的组件
    let distance = el.offsetTop;  // 获取组件在页面元素内的高度
    if (index !== 0) {
        distance = distance - 44;  // 设施板块不需要减去tabControl的高度，后面的板块tabControl显示了，需要减去它的高度
    }

    isClick = true;
    currentDistance = distance;

    DetailRef.value.scrollTo({
        top: distance,
        behaivor: "smooth"
    })
}

// 页面滚动，滚动时匹配对应的tabControl的index
const tabControlRef = ref();
watch(scrollTop, newValue => {
    if (newValue === currentDistance) {
        isClick = false; // 滚动到正确位置后需要将isClick设置回false状态
    }
    if (isClick) return; // 点击事件不用watch来更改索引

    // 获取所有区域的offsetTop
    const els = Object.values(sectionEls.value);
    const values = els.map(el => el.offsetTop);

    // 根据newValue去匹配对应的索引
    let index = values.length - 1;
    for (let i = 0; i < values.length; i++) {
        if (values[i] >= newValue + 44) {
            index = i - 1; // index最开始要从-1开始，超过第一个区域才变为0
            break;
        }
    }
    // console.log(index);
    tabControlRef.value?.setCurrentIndex(index);
})

</script>

<style lang="less" scoped>
.detail {

    .tabs {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 3;
        text-align: center;
        background-color: #fff;
    }

    .footer {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 120px;

        img {
            width: 123px;
        }

        .text {

            margin-top: 12px;
            font-size: 12px;
            color: #7688a7;
        }
    }
}
</style>