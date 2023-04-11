import {myRequest,newUrl} from "../../../utils/request"
import {getDetailProgress} from "../../../utils/time"
import {formatImage} from '../../../utils/format'
Page({
    data: {
        messageDetail:{
            repairDetailTestBringImgs:{
                imsg:[],
                test:''
            },
        },
        messageId:0,
    },
    onLoad(options) {
        let _this=this;
        const id =options.messageId;
        _this.setData({
            messageId:id
        })
        _this.getMessageDetail(id)
    },
    async getMessageDetail(id){
            const newdetail = await myRequest({
                url:newUrl.reqairDetailGuard,
                data:{
                    "id":id
                }
            })
            newdetail.progress=getDetailProgress(newdetail.progress)
            if(newdetail.repairDetailTestBringImgs) {
                newdetail.repairDetailTestBringImgs.imsg=formatImage(newdetail.repairDetailTestBringImgs.imsg)
            }
            if(newdetail.repairResultDetailBringImgs){
                newdetail.repairResultDetailBringImgs.imsg=formatImage(newdetail.repairResultDetailBringImgs.imsg)
            }
            console.log('newDetail',newdetail)
            this.setData({
                messageDetail:newdetail
            })
    },
    enterEvaluation(){
        const id = this.data.messageId;
        wx.navigateTo({
        url:'/pageFunc/pages/evaluation/index?messageId='+id
        })
    }
})