import { formatImage } from "../../utils/format";
import {myRequest,newUrl} from "../../utils/request"
import { formatTime,formatContent} from "../../utils/time"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        image:'https://note.youdao.com/yws/api/personal/file/WEBc8d18ed4ba67ba404135fe5a0649f9c9?method=download&shareKey=c67b1659e192e1c095275bdc9bae446d',
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