import {myRequest,newUrl} from "../../utils/request"
import {getDetailProgress} from "../../utils/time"
import {formatImage} from '../../utils/format'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        messageId:0,
        messageDetail:{},
        // imgList:['../../assets/image/提示图3.png'],
        taskCode:'',
        type:0,//默认为用户
    },
    onLoad(options) {
        let _this=this;
        const id = options.messageId;
        const taskCode = options.taskCode;
        const type = wx.getStorageSync('type')
        console.log('options',options)
        _this.setData({
            messageId:id,
            taskCode:taskCode,
            type:type
        })
        _this.getMessageDetail(id,taskCode);
    },
    async getMessageDetail(id,taskCode){
        const type = wx.getStorageSync('type');
        if(type==0){//获取用户的消息详情
            const newdetail=await myRequest({
                url:newUrl.messageDetailUser,
                data:{
                    "id":id
                }
            })
            newdetail.progress=getDetailProgress(newdetail.progress);
            newdetail.taskCode = taskCode;
            if(newdetail.repairDetailTestBringImgs) {
                newdetail.repairDetailTestBringImgs.imsg=formatImage(newdetail.repairDetailTestBringImgs.imsg)
            }
            if(newdetail.repairResultDetailBringImgs){
                newdetail.repairResultDetailBringImgs.imsg=formatImage(newdetail.repairResultDetailBringImgs.imsg)
            }
            this.setData({
                messageDetail:newdetail
            })
        }else if(type==2){//获取保安的消息详情
            const newdetail = await myRequest({
                url:newUrl.messageDetailGuard,
                data:{
                    "id":id
                }
            })
            newdetail.progress=getDetailProgress(newdetail.progress)
            newdetail.taskCode = taskCode;
            this.setData({
                messageDetail:newdetail
            })
        }else{//获取保安的消息详情
            const newdetail=await myRequest({
                url:newUrl.reqairDetailGuard,
                data:{
                    "id":id
                }
            })
            newdetail.progress=getDetailProgress(newdetail.progress)
            newdetail.taskCode = taskCode;
            this.setData({
                messageDetail:newdetail
            })
        }
    },
    //进入评论页面
    async enterEvaluation(){
        const id = this.data.messageId
        const taskCode = this.data.taskCode
        wx.navigateTo({
          url: '/pages/evaluation/index?messageId='+id+'&taskCode='+taskCode,
        })
    },
    //进入维修页面
    async enterMaintenance(){
        const id = this.data.messageId
        const taskCode = this.data.taskCode
        wx.navigateTo({
          url: '/pages/maintenance/index?maintenanceId='+id,
        })
    }
})