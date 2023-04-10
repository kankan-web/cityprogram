import {myRequest,newUrl} from '../../utils/request'
Page({
    data: {
        title:[{
            titleId:0,
            name:'全部',
        },{
            titleId:1,
            name:'需受理',
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
        islogin:false,
        pageAll:1,
        pageWait:1,
        pageFeedback:1,
        pageFinish:1
    },
    onShow(){
        let _this=this;
        let value = wx.getStorageSync('type')
        const isLogin = wx.getStorageSync('isLogin')
        //表示已经登陆的情况下
        if(isLogin){
            this.setData({
                islogin:true
            })
        }
        // 表示用户的情况下
        if(!value){
            _this.setData({
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
                }]
            })
        }
        _this.getAllMessageListUser(_this.data.pageAll);
    },
    // 切换Nav时触发的事件
    onTabChange(event){
        let index = event.detail;
        if(this.data.title.length==3&&index==2) index=3;
        this.setData({index})
    },
    changeTab(e){
        const _this=this;
        const {all,wait,feedback,finish}=_this.data;
        let {index,pageAll,pageWait,pageFeedback,pageFinish}=_this.data;
        if(_this.data.title.length==3&&index==2) index=3;
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
        const type = wx.getStorageSync('type');
        const id = wx.getStorageSync('userId');
        const info =await this.getdetail(-1,currentPage);
        _this.setData({
            all:[..._this.data.all,...info],
            pageAll:currentPage+1
        })
    },
    //获取wait中的列表 用户、保安、维修
    async getWaitMessageList(currentPage){
        let _this=this;
        const type = wx.getStorageSync('type');
        const id = wx.getStorageSync('userId');
        const info =await this.getdetail(0,currentPage)
        _this.setData({
            wait:[..._this.data.wait,...info],
            pageWait:currentPage+1
        })
    },
    //获取feedback中的列表 用户
    async getFeedbackMessageList(currentPage){
        let _this=this;
        const id = wx.getStorageSync('userId');
        const info = await this.getdetail(1,currentPage)
        _this.setData({
            feedback:[..._this.data.feedback,...info],
            pageFeedback:currentPage+1
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
        console.log('发送一次列表请求')
        const type = wx.getStorageSync('type');
        const id = wx.getStorageSync('userId');
        const pigeSize = 4; 
        let name='';
        let url;
        if(type==2) name='guardId',url=newUrl.messageListGuard;
        if(type==1) name='repairId',url=newUrl.messageListRepair;
        if(type==0) name='userId',url=newUrl.messageListUser;
        return await myRequest({
            url:url+'?'+name+'='+id,
            data:{
                "progress":progress,
                "currentPage":currentPage,
                "pigeSize":pigeSize
            }
        })
    },
    //页面滑动到底部
    bindDownLoad(){
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
    },
})