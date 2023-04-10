import { formatImage } from "../../utils/format";
import {myRequest,newUrl} from "../../utils/request"
import { formatTime,formatContent} from "../../utils/time"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        image:'../../assets/image/壁纸6.png',
        detailId:0,
        detail:{}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let _this=this
        const id=options.newsId;
        _this.setData({
            detailId:id
        })
        _this.getBoardDetailDate(id)
    },
    async getBoardDetailDate(id){
        const newdetail=await myRequest({
            url:newUrl.borderDetail,
            data:{
                "id":id
            }
        })
        newdetail.updateTime=formatTime(newdetail.updateTime)//处理时间数据
        newdetail.imgs=formatImage(newdetail.imgs)//处理图片
        newdetail.content = formatContent(newdetail.content);//处理文章数据
        this.setData({
            detail:newdetail
        })
    }
})