/*
 * @Date: 2020-06-05 10:05:30
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-25 00:37:39
 * @FilePath: /project/src/service/APIService.js
 */ 
import RequestTool from './requestUtils'
import {message} from 'antd'
import {ActionTypes, Status} from '../store/redux/ActionTypes'
 
export default class APIService {

    /*************************** 调用封装 ************************/
    static handleDispatch(type, data, dispatch, status) {
        return dispatch({
            reduceType: ActionTypes.BASE,
            type: type,
            data: data,
            status: status
        })
    }

    static handleRequest(actionType, request) {
        return (dispatch) => {
            this.handleDispatch(actionType, {}, dispatch, Status.LOADING);
            fetch(
                request
            ).then((response)=> 
                response.json()
            ).then((json) => {
                if(json.resultCode == 1) { // 成功
                    this.handleDispatch(actionType, json, dispatch, Status.SUCCESS)
                } else  {
                    message.warning(json.message)
                    return false
                }
            }).catch((err) =>  {
                this.handleDispatch(actionType, {}, dispatch, Status.ERROR);
            })
        }
    }

    static promiseRequest(request, responseType) {
        return fetch(request).then((response) =>  {
            return response.json()
        })
    }


    /*************************************************** API  接口 ************************************************/

  

     
    /**
     * 账号相关
     * @param {*} type  具体接口定义
     * @param {*} obj 参数
     */
    static WeChatRobotAPI(type, obj) {
        let  requests;
        switch(type) {
            case 'fetchAccounts': // 账号列表
                requests =  RequestTool.seriesRequest('POST', '/accounts', obj)
                return this.promiseRequest(requests)
            case 'saveAccounts': // 账号保存
                requests =  RequestTool.seriesRequest('POST', '/account/save', obj)
                return this.promiseRequest(requests)
            case 'fetchOrders': // 订单列表
                requests =  RequestTool.seriesRequest('GET', '/orders', obj)
                return this.promiseRequest(requests)
            case 'fetchUsers': // 用户列表
                requests =  RequestTool.seriesRequest('POST', '/user_list', obj)
                return this.promiseRequest(requests)
            default: 
                break;
        }
    }
    /**
     * 彩票管理
     * @param {*} type  具体接口定义
     * @param {*} obj 参数
     */
    static LotteryAPI(type, obj) {
        let requests;
        switch(type) {
            case 'LotteryType': //  彩票类型
                requests =  RequestTool.seriesRequest('POST', '/Lottery/LotteryTypeList', obj)
                return this.promiseRequest(requests)
            case 'LotteryCatList': // 彩票重分类列表
                requests =  RequestTool.seriesRequest('POST', '/Lottery/LotteryCategoryList', obj)
                return this.handleRequest(ActionTypes.LOTTERYCATEGORY,requests)
            case 'lotteryList': // 彩票列表
                requests =  RequestTool.seriesRequest('POST', '/Lottery/LottoList', obj)
                return this.handleRequest(ActionTypes.LOTTERYLIST ,requests)
            case 'recommendLottery': // 推荐彩票
                requests =  RequestTool.seriesRequest('POST', '/Lottery/HotLotteryList', obj)
                return this.handleRequest(ActionTypes.RECOMMENDLOTTERY ,requests)
            case 'porfessorRecommendLottery': // 专家推荐
                requests =  RequestTool.seriesRequest('POST', '/Lottery/LotteryRecordList', obj)
                return this.handleRequest(ActionTypes.PROFESSORRECOMMENDLOTTERY ,requests)
            case 'historyLottery': // 历史开奖
                requests =  RequestTool.seriesRequest('POST', '/Lottery/LotteryList', obj)
                return this.handleRequest(ActionTypes.HISTORYLOTTERY ,requests)
            case 'lotteryDetail': // 开奖详情
                requests =  RequestTool.seriesRequest('POST', '/Lottery/LotteryDetail', obj)
                return this.handleRequest(ActionTypes.LOTTERYDETAIL ,requests)
            case 'LotteryYesterdayInfo': //  昨日彩票战绩
                requests =  RequestTool.seriesRequest('POST', '/Lottery/GetLotteryExploits', obj)
                return this.handleRequest(ActionTypes.HISTORYINDEXLOTTERY,requests)
            default:
                break

        }
    }


    /**
     * 体育服务
     * @param {*} type  具体接口定义
     * @param {*} obj 参数
     */
    static SportsAPI(type, obj) {
        let requests;
        switch(type) {
            case 'historyRecord': // 昨日战绩
                requests =  RequestTool.seriesRequest('POST', '/Sports/GetExploits', obj)
                return this.handleRequest(ActionTypes.HISTORYTSPORTRECORD, requests)
            case 'sportsList': // 查询赛事列表
                requests =  RequestTool.seriesRequest('POST', '/Sports/GetCompetitionList', obj)
                return this.handleRequest(ActionTypes.SPORTSLIST, requests)
            case 'recommendSports': // 热门赛事
                requests =  RequestTool.seriesRequest('POST', '/Sports/GetReferralsList', obj)
                return this.handleRequest(ActionTypes.RECOMMENDSOPRTS, requests)
            case 'sportsDetail': // 赛事详情
                requests =  RequestTool.seriesRequest('POST', '/Sports/GetCompetitionDetail', obj)
                return this.promiseRequest( requests)
            case 'sportsInformationDetail': // 赛事情报
                requests =  RequestTool.seriesRequest('POST', '/Sports/GetInformationList', obj)
                return this.handleRequest(ActionTypes.SPORTSINFORMATION, requests)
            case 'sportsLeagueList': // 联赛列表
                requests =  RequestTool.seriesRequest('POST', '/Sports/GetLeagueList', obj)
                return this.handleRequest(ActionTypes.SPORTSLEAGUELIST, requests)
            case 'asianSportsIndexList': // 让球（亚盘）盘口数据
                requests =  RequestTool.seriesRequest('POST', '/Sports/GetAsiaHandicaList', obj)
                return this.handleRequest(ActionTypes.ASIANSPORTSINDEXLIST, requests)
            case 'asianSportsIndexDetail': // 让球（亚盘）盘口数据详情
                requests =  RequestTool.seriesRequest('POST', '/Sports/GetCompanyAsiaHandicaList', obj)
                return this.handleRequest(ActionTypes.ASIANSPORTSINDEXDETAIL, requests)
            case 'eroupSportsIndexList': // 亚盘盘口数据
                requests =  RequestTool.seriesRequest('POST', '/Sports/GetEuropeHandicaList', obj)
                return this.handleRequest(ActionTypes.EROUPSPORTSINDEXLIST, requests)
            case 'sizeSportsIndexList': // 亚盘盘口数据
                requests =  RequestTool.seriesRequest('POST', '/Sports/GetEuropeHandicaList', obj)
                return this.handleRequest(ActionTypes.SIZESPORTSINDEXLIST, requests)
            case 'sportsTextLive': // 文字直播查询
                requests =  RequestTool.seriesRequest('POST', '/Sports/GetLiveInformation', obj)
                return this.handleRequest(ActionTypes.SPORTSTEXTLIVE, requests)
            default:
                break
        }
    }

    /**
     * 活动服务
     */
    static PromotionAPI(type, obj) {
        let requests;
        switch(type) {
            case 'promotionType': // 活动种类
                requests =  RequestTool.seriesRequest('POST', '/Promotion/PromotionTypeList', obj)
                return this.handleRequest(ActionTypes.PROMOTIONTYPE, requests)
            case 'promotionList': // 活动列表
                requests =  RequestTool.seriesRequest('POST', '/Promotion/PromotionList', obj)
                return this.handleRequest(ActionTypes.PROMOTIONLIST, requests)
            case 'promotionDetail': // 活动详情
                requests =  RequestTool.seriesRequest('POST', '/Promotion/PromotionDetail', obj)
                return this.handleRequest(ActionTypes.PROMOTIONDETAIL, requests)
            case 'applyWelfare': // 申请活动
                requests =  RequestTool.seriesRequest('POST', '/Promotion/ApplyForPromotion', obj)
                return this.promiseRequest(requests)
            case 'applyWelfareList': // 申请活动列表
                requests =  RequestTool.seriesRequest('POST', '/Promotion/ApplyRecordList', obj)
                return this.handleRequest(ActionTypes.WELFAREAPPLYLIST,requests)
        }

    }
    /**
     * 资讯服务
     */
    static NewsAPI(type, obj) {
        let requests;
        switch(type) {
            case 'newsList':
                requests =  RequestTool.seriesRequest('POST', '/News/GetNewsList', obj)
                return this.handleRequest(ActionTypes.NEWSLIST, requests)
            case 'newsDetail':
                requests =  RequestTool.seriesRequest('POST', '/News/GetNewsById', obj)
                return this.handleRequest(ActionTypes.NEWSDETAIL, requests)
            case 'NewsCommentList': // 资讯评论列表
                requests =  RequestTool.seriesRequest('POST', '/News/GetCommentInfoList', obj)
                return this.handleRequest(ActionTypes.NEWSCOMMENTLIST, requests)
            case 'addNewsComment': // 添加资讯评论
                requests =  RequestTool.seriesRequest('POST', '/News/AddCommentInfo', obj)
                return this.promiseRequest(requests)
            case 'updateCommentNum': // 更新评论数
                requests =  RequestTool.seriesRequest('POST', '/News/UpdateNewsCommentNumber', obj)
                return this.handleRequest(ActionTypes.UPDATENEWSCOMMENT, requests)
        }
    }

    /**
     * 用户收藏关注
     */
    static UserInterstedAPI(type, obj) {
        let requests;
        switch(type) {
            case 'sportsFollow': // 体育关注列表
                requests =  RequestTool.seriesRequest('POST', '/UserIntersted/GetAttentionRecordsBySportList', obj)
                return this.handleRequest(ActionTypes.SPORTSFOLLOW, requests)
            case 'lotteryFollow': // 彩票关注列表
                requests =  RequestTool.seriesRequest('POST', '/UserIntersted/GetAttentionRecordsByLotteryList', obj)
                return this.handleRequest(ActionTypes.LOTTERYFOLLOW, requests)
            case 'newsCollection': // 资讯收藏列表
                requests =  RequestTool.seriesRequest('POST', '/UserIntersted/GetSYSBlackWordList', obj)
                return this.handleRequest(ActionTypes.NEWSCOLLECTION, requests)
            case 'sportsCollection': // 体育收藏列表
                requests =  RequestTool.seriesRequest('POST', '/UserIntersted/GetInterestedRecordsSportList', obj)
                return this.handleRequest(ActionTypes.SPORTSCOLLECTION, requests)
            case 'addCollection': // 添加收藏
                requests =  RequestTool.seriesRequest('POST', '/UserIntersted/AddInterestedRecords', obj)
                return this.promiseRequest(requests)
            case 'addFollow': // 添加关注
                requests =  RequestTool.seriesRequest('POST', '/UserIntersted/AddAttentionRecords', obj)
                return this.promiseRequest(requests)
            default:
                break
        }
    }
    
    /**
     * 聊天室服务
     */
    static ChatRoomAPI(type, obj) {
        let requests;
        switch(type) {
            case 'createChatRoom':
                requests =  RequestTool.seriesRequest('POST', '/ChatRoom/CreateChatroom', obj)
                return this.promiseRequest(requests)
            case 'enterChatRoom':
                requests =  RequestTool.seriesRequest('POST', '/ChatRoom/AddMembers', obj)
                return this.promiseRequest(requests)
            case 'exitChatRoom':
                requests =  RequestTool.seriesRequest('POST', '/ChatRoom/RemoveMembers', obj)
                return this.promiseRequest(requests)
            case 'sendText': // 发送聊天文字信息
                requests =  RequestTool.seriesRequest('POST', '/ChatRoom/SendTxtMessage', obj)
                return this.handleRequest(ActionTypes.NEWSLIST, requests)
            case 'chatroomDetail': // 聊天室详情
                requests =  RequestTool.seriesRequest('GET', '/ChatRoom/GetChatroomInfoById', obj)
                return this.promiseRequest(requests)
            case 'getSign': // 获取签名
                requests =  RequestTool.seriesRequest('POST', '/ChatRoom/GetSign', obj)
                return this.promiseRequest(requests)
        }
    }

    
}