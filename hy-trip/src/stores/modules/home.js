import {getHomeCategories, getHomeSuggests, getHomeHouselist} from '@/service'

import { defineStore } from "pinia";

const useHomeStore = defineStore("home", {
    state: ()=>({
        hotSuggests: [],
        categories: [],
        houselist: [],
        currentPage: 1,
    }),
    actions: {
        async fetchHomeSuggestsData() {
            const res = await getHomeSuggests();
            this.hotSuggests = res.data;

        },
        async fetchCategoriesData() {
            const res  = await getHomeCategories();
            this.categories = res.data; 
        },
        async fetchHouselistData() {
            const res = await getHomeHouselist(this.currentPage++);
            this.houselist.push(...res.data); // 每次请求数据后，追加新的数据
        }
    }
});

export default useHomeStore;