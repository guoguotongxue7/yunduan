import { getDetailInfos } from "@/service/modules/detail";
import { defineStore } from "pinia";
import { useRoute } from "vue-router";



const useDetailStore = defineStore("detail", {
    state: () => ({
        detailInfos: {},
        topInfos: {}
    }),
    actions: {
        async fetchDetailInfosData() {
            const route = useRoute();
            const houseId = route.params.id;

            const res = await getDetailInfos(houseId);
            this.detailInfos = res.data.mainPart;
            this.topInfos = res.data.mainPart.topModule;
            console.log("detailInfos", this.detailInfos);
        }
    }
});

export default useDetailStore;