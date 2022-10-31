import { onActivated, onDeactivated, onMounted, onUnmounted, ref } from "vue";
import { throttle } from 'underscore'

// 回调函数做法
/* export default function useScroll(reachBottomCallback) {

    // 监听window滚动，注意：
    // 1. 离开home页面时需要将监听事件关闭，否则别的页面也会被监听而受到影响
    //    所以我们在onMounted函数内进行滚动事件的监听与去除监听
    // 2. 为了让Home组件保持缓存，需要使用keep-alive组件，那么就需要在onActived和onDeactived这两个函数内进行监听
    const scrollListenerHandler = () => {

        const clientHeight = document.documentElement.clientHeight;
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;


        if (scrollTop + clientHeight >= scrollHeight) {
            // 滚动到页面底部，调用回调函数获取数据
            console.log("滚动到页面底部");
            if (reachBottomCallback) reachBottomCallback();
        }

    };

    onMounted(() => {
        window.addEventListener("scroll", scrollListenerHandler);
    })


    onUnmounted(() => {
        window.removeEventListener("scroll", scrollListenerHandler);
    })

} */


// 变量控制法 
export default function useScroll(ElRef) {
    let el = window; // 默认是监听window,但是尽量传入元素的ref引用,监听页面ref的滚动,避免出错

    // 通过isReachBottom来控制是否加载更多的数据
    const isReachBottom = ref(false);

    const scrollTop = ref(0);
    const scrollHeight = ref(0);
    const clientHeight = ref(0);

    // 节流
    const scrollListenerHandler = throttle(() => {
        // console.log("监听到滚动");
        if (el === window) {
            clientHeight.value = document.documentElement.clientHeight;
            scrollTop.value = document.documentElement.scrollTop;
            scrollHeight.value = document.documentElement.scrollHeight;
        } else {
            clientHeight.value = el.clientHeight;
            scrollHeight.value = el.scrollHeight;
            scrollTop.value = el.scrollTop;
            // console.log(clientHeight.value, scrollHeight.value, scrollTop.value);
        }

        if (scrollTop.value + clientHeight.value >= scrollHeight.value - 1) {
            // 滚动到页面底部，调用回调函数获取数据
            console.log("滚动到页面底部");
            isReachBottom.value = true;
        }

    }, 100);

    onMounted(() => {
        if (ElRef) el = ElRef.value;

        el.addEventListener("scroll", scrollListenerHandler);
    })
    onActivated(() => {
        if (ElRef) el = ElRef.value;

        el.addEventListener("scroll", scrollListenerHandler);
    })

    onUnmounted(() => {
        if (ElRef) {
            el = ElRef.value;
        }
        el.removeEventListener("scroll", scrollListenerHandler);
    })

    onDeactivated(() => {
        if (ElRef) {
            el = ElRef.value;
        }
        el.removeEventListener("scroll", scrollListenerHandler);

    })


    return { isReachBottom, scrollTop, scrollHeight, clientHeight };
}