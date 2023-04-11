import {myRequest,newUrl} from '../../../utils/request'
Page({
    data: {
        title:[{
            titleId:0,
            name:'全部',
        },{
            titleId:1,
            name:'需处理',
        },{
            titleId:2,
            name:'需反馈',
        },{
            titleId:3,
            name:'已完结',
        }],
        index:0,
        //内容数据
        all:[],
        wait:[],
        feedback:[],
        finish:[],
        isloading:false,
        pageAll:1,
        pageWait:1,
        pageFeedback:1,
        pageFinish:1
    },
    onShow(){
        this.getAllMessageListUser(this.data.pageAll)
    },
    onTabChange(event){
        let index = event.detail;
        this.setData({index})
    },
    changeTab(e){
        const _this=this;
        const {all,wait,feedback,finish,index}=_this.data;
        const {pageAll,pageWait,pageFeedback,pageFinish}=_this.data;
        switch(index){
            case 0:
                if(!all.length) _this.getAllMessageList(pageAll);
                break;
            case 1:
                if(!wait.length) _this.getWaitMessageList(pageWait);
                break;
            case 2:
                if(!feedback.length) _this.getFeedbackMessageList(pageFeedback);
                break;
            case 3:
                if(!finish.length) _this.getFinishMessageList(pageFinish);
                break;
            default:
                break;
        }
        this.setData({index})
    },
    //获取all中的信息 用户、保安、巡检
    async getAllMessageListUser(currentPage){
        let _this=this;
        const info =await this.getdetail(-1,currentPage)
        _this.setData({
            all:[..._this.data.all,...info],
            pageAll:currentPage+1
        })
    },
    //获取wait中的列表 用户、保安、维修
    async getWaitMessageList(currentPage){
        let _this=this;
        const info =await this.getdetail(0,currentPage)
        _this.setData({
            wait:[..._this.data.wait,...info],
            pageWait:currentPage+1
        })
    },
    //获取feedback中的列表 用户
    async getFeedbackMessageList(currentPage){
        let _this=this;
        const info = await this.getdetail(1,currentPage)
        _this.setData({
            feedback:[..._this.data.feedback,...info],
            pageFeedback:currentPage+1,
        })
    },
    //获取finish中的列表 用户、保安、维修
    async getFinishMessageList(currentPage){
        let _this=this;
        const info =await this.getdetail(2,currentPage)
        _this.setData({
            finish:[..._this.data.finish,...info],
            pageFinish:currentPage+1
        })
    },
    async getdetail(progress,currentPage){
        const id=wx.getStorageSync('userId');
        const pigeSize=4;
        return await myRequest({
            url:newUrl.reqairListGuard,
            data:{
                "guardId":id,
                "currentPage":currentPage,
                "pigeSize":pigeSize,
                "progress":progress
            }
        })
    },
    //下拉加载更多
    async bindDownLoad(){
        const _this=this
        let {index,pageAll,pageWait,pageFeedback,pageFinish} = this.data;
        switch(index){
            case 0:
                _this.getAllMessageListUser(pageAll++)
                break;
            case 1:
                _this.getWaitMessageList(pageWait++)
                break;
            case 2:
                _this.getFeedbackMessageList(pageFeedback++)
                break;
            case 3:
                _this.getFinishMessageList(pageFinish++)
                break;
            default:
                break;
        }
    }
})