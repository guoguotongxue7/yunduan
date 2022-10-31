export const getAssetsURL =(image) => {
    // 参数一是image相对路径，参数二是当前文件的绝对路径
    return new URL(`../assets/img/${image}`, import.meta.url).href;
};

