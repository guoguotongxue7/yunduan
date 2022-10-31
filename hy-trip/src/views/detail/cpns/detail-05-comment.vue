<template>
    <div class="comment">
        <DetailSection title="热门评论" :more-text="`查看全部${commentData.totalCount}条评论`">
            <div class="scores">
                <div class="left">
                    <div class="score">
                        <div class="overall">{{commentData.overall}}
                            <div class="line"></div>
                        </div>

                    </div>
                    <div class="info">
                        <div class="scoreTitle">{{commentData.scoreTitle}}</div>
                        <div class="totalCount">{{commentData.totalCount}}条评论</div>
                        <van-rate v-model="commentData.overall" color="#ff9854" size="14" readonly allow-half />
                    </div>

                </div>
                <div class="right">
                    <div class="subScores">
                        <template v-for="(item, index) in commentData.subScores" :key="index">
                            <span class="item">
                                {{item}}
                            </span>

                        </template>
                    </div>
                </div>
            </div>
            <div class="commentTagVo">
                <template v-for="(item, index) in commentData.commentTagVo" :key="index">
                    <div class="item" :style="{color: item.color, backgroundColor: item.backgroundColor}">
                        {{item.text}}
                    </div>
                </template>
            </div>
            <div class="user-comments">
                <div class="user">
                    <div class="icon">
                        <img :src="commentData.comment.userAvatars" alt="">
                    </div>
                    <div class="userInfo">
                        <div class="userName">{{commentData.comment.userName}}</div>
                        <div class="checkInDate">{{commentData.comment.checkInDate}}</div>

                    </div>
                </div>
                <div class="comment-detail">{{commentData.comment.commentDetail}}</div>
            </div>
        </DetailSection>
    </div>
</template>   

<script setup>
import DetailSection from '@/components/detail-section/detail-section.vue'

const props = defineProps({
    commentData: {
        type: Object,
        default: () => ({})
    }
})
</script>

<style lang="less" scoped>
.comment {
    background-color: #f5f7fa;

    .scores {
        display: flex;
        justify-content: space-between;
        padding-right: 20px;
        margin-top: 10px;



        .left {
            display: flex;

            .score {

                .overall {
                    font-size: 48px;
                    font-weight: bold;
                    position: relative;

                }

                .line {
                    width: 66px;
                    height: 6px;
                    background: linear-gradient(90deg, #fa8c1d, #fcaf3f);
                    border-radius: 3px;
                    position: absolute;
                    bottom: 6px;
                    z-index: 5;
                }
            }

            .info {
                display: flex;
                flex-direction: column;
                padding: 8px;

                .totalCount {
                    color: #999;
                }
            }

        }

        .right {
            display: flex;
            justify-content: flex-end;
            flex-wrap: wrap;
            flex: 1;
            margin-left: 15px;
            margin-top: 5px;

            .item {
                margin: 1px 4px 2px 0;
                color: #999;
                font-size: 12px;
            }

        }

    }

    .commentTagVo {
        display: flex;
        flex-wrap: wrap;

        .item {
            margin: 3px 5px;
            font-size: 14px;
            color: #666;

        }
    }

    .user-comments {
        margin-top: 20px;

        .user {
            display: flex;
            padding-left: 20px;

            img {
                width: 30px;
            }

            .userInfo {
                padding-left: 10px;

                .checkInDate {
                    color: #999;
                    font-size: 12px;
                }
            }
        }
    }

    .comment-detail {
        margin: 15px 20px;
        color: #666;
        font-size: 12px;
    }
}
</style>