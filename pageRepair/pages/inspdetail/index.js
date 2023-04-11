import {myRequest,newUrl} from "../../../utils/request"
Page({
    data: {
        messageDetail:{}
    },
    onLoad(options) {
        const {messageId,taskCode,deviceName,progress} = options
        this.getMessageDetail(messageId,taskCode,deviceName,progress)
    },
    async getMessageDetail(id,taskCode,deviceName,progress){
        const newDetail = await myRequest({
            url:newUrl.messageDetailGuard,
            data:{
                "id":id
            }
        })
        newDetail.taskCode=taskCode;
        newDetail.deviceName=deviceName;
        newDetail.progress=progress;
        this.setData({
            messageDetail:newDetail
        })
    },
    enterFunction(){
        wx.navigateTo({
          url: '/pageFunc/pages/inspection/index',
        })
    }
})