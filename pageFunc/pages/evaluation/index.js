import {myRequest,newUrl} from "../../../utils/request"
Page({

    data: {
        stars:[{score:0,starIdx:'I'},
        {score:0,starIdx:'II'},
        {score:0,starIdx:'III'}],
        messageDetail:{},
        // detail:'',
        taskCode:''//前端展示编号
    },
    onLoad(options) {
        console.log('option为',options)
        let _this=this;
        const id=options.messageId;
        const taskCode = options.taskCode;
        _this.setData({
            messageId:id,
            taskCode:taskCode
        })
        _this.getMessageDetail(id)
    },
    async getMessageDetail(id){
        let url=newUrl.messageDetailUser;
        const type = wx.getStorageSync('type');
        if(type==0) url=newUrl.reqairDetailGuard;
        const newdetail=await myRequest({
            url:url,
            data:{
                "id":id
            }
        })
        this.setData({
            messageDetail:newdetail,
        })
    },
    getscoreI(e){
        this.setData({
            'stars[0].score':e.detail.score
        })
    },
    getscoreII(e){
        this.setData({
            'stars[1].score':e.detail.score
        })
    },
    getscoreIII(e){
        this.setData({
            'stars[2].score':e.detail.score
        })
    },
    async uploadFormData(e){
        const detail=e.detail.value.complainDetail;//反馈信息
        const {stars,taskCode} = this.data;
        const {id} = this.data.messageDetail;
        const starArr=[];
        const type = wx.getStorageSync('type');
        let updateId = 0;
        if(type==2) updateId=2;
        let flag=false;
        stars.forEach((item,index)=>{
            starArr.push(item.score)
        })
        flag=this.checkDateBeforeUpload(detail,starArr)
        if(flag){
            const result = await myRequest({
                url:newUrl.commentUrl,
                method:"POST",
                data:{
                    updateType:updateId,
                    taskId:id,
                    resultText:detail,
                    pingJia:starArr
                }
            })
            if(result.code==200&&type==2){
                wx.redirectTo({
                    url:'/pages/postsuccess/index?stateId=3'
                  })
            }else{
                wx.redirectTo({
                    url:'/pages/postsuccess/index?stateId=2'
                  })
            }
        }
    },
    //检查上传的数据
    checkDateBeforeUpload(detail,starArr){
        if(!detail){
            wx.showToast({
              title: '评价字数不能为空',
              icon:'error',
              duration:2000
            })
            return false;
        }
        try{
        starArr.forEach((item)=>{
            if(item==0){
                wx.showToast({
                  title: '评价程度不能为0',
                  icon:'error',
                  duration:1500
                })
                throw new Error('false')
            }
        })
        }catch(e){
            console.log('报错信息为',e.message)
            if(e.message=='false') return false
        }
        return true;
    }
})