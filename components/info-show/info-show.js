import { formatTime } from "../../utils/time"
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        notifyItem:{
            type:Object,
            observer:function(newVal){
                newVal.createTime=formatTime(newVal.createTime)
                this.setData({
                    notify:newVal
                })
            }
        }
    },
    data: {
        notify:{}
    },
    methods: {
        //将公共对应的参数传递给详细页面
        handleEnterDetail(e){
            const {id} = e.currentTarget.dataset
            wx.navigateTo({
              url: '/pages/news/index?newsId='+id,
            //   success:function(res){
            //       res.eventChannel.emit('handleDetailIdTransfer',id)
            //   }
            })
        }
    }
})
