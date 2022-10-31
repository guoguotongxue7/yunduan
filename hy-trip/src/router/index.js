import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
     history: createWebHashHistory(),
    //  映射关系：path-> component
    routes: [
        {
            path: "/",
            redirect: "/home"
        },
        {
            path: "/home",
            component: ()=> import("@/views/home/home.vue")
            // component: ()=> import("@/views/home/homeTest.vue")
        },
        {
            path: "/order",
            component: ()=> import("@/views/order/order.vue")
        },
        {
            path: "/message",
            component: ()=> import("@/views/message/message.vue"),
            meta: {  // 隐藏页面底部的标签栏可以通过路由的meta属性来控制，也可以利用top-page类css来控制
                hideTabBar: true,
            }
        },
        {
            path: "/favor",
            component: ()=> import("@/views/favor/favor.vue")
        },
        {
            path: "/city",
            component: ()=> import("@/views/city/city.vue"),
            meta: {  // 隐藏页面底部的标签栏可以通过路由的meta属性来控制，也可以利用top-page类css来控制
                hideTabBar: true,
            }
        },
        {
            path: "/search",
            component: ()=> import("@/views/search/search.vue"),
            meta: {  // 隐藏页面底部的标签栏可以通过路由的meta属性来控制，也可以利用top-page类css来控制
                hideTabBar: true,
            }
        },
        {
            path: "/detail/:id",
            component: ()=> import("@/views/detail/detail.vue")
        }
    ]
})

export default router;