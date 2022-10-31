import axios from 'axios'
import { BASE_URL, TIMEOUT } from './config'
import useMainStore from '@/stores/modules/main'

const mainStore = useMainStore();

class HYRequest {
  constructor(baseURL, timeout = 10000) {
    this.instance = axios.create({
      baseURL,
      timeout
    })


    this.instance.interceptors.request.use(config => {
      // 拦截器：发送网络请求之前，把isLoading设置为true,发送完毕改为false
      mainStore.isLoading = true;
      return config;
    }, err => {
      return err;
    })


    this.instance.interceptors.response.use(res => {
      mainStore.isLoading = false;  // 响应成功结束动画
      return res;
    }, err => {
      mainStore.isLoading = false;  // 响应失败也结束动画
      return err;
    })
  }

  
  request(config) {
    // 发送网络请求之前，把isLoading设置为true,发送完毕改为false
    // 在网络请求的代码里写其他逻辑会有点混乱，所以使用拦截器来完成
    // mainStore.isLoading = true;

    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res.data);
        // mainStore.isLoading = false;  // 响应成功结束动画
      }).catch(err => {
        reject(err);
        // mainStore.isLoading = false;  // 响应失败也结束动画
      })
    })
  }

  get(config) {
    return this.request({ ...config, method: "get" })
  }

  post(config) {
    return this.request({ ...config, method: "post" })
  }
}

export default new HYRequest(BASE_URL, TIMEOUT)


