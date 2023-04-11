// pages/postsuccess/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        stateId:'-1'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const stateId=options.stateId;
        this.setData({
            stateId:options.stateId
        })
        if(stateId==2){//去页面
            setTimeout(function(){
                wx.redirectTo({
                    url: '/pages/home/index',
                  })
               },2000)
        }else if(stateId==1){//去message页面
            setTimeout(function(){
                wx.redirectTo({
                    url: '/pages/message/index',
                  })
               },2000)
        }else if(stateId==3){
            setTimeout(function(){
                wx.redirectTo({
                //   url: '../repairmessage/index',
                url:'/pageRepair/pages/repairmessage/index'
                })
            },2000)
        }else{//去维修页面
            setTimeout(function(){
                wx.redirectTo({
                    url: '/pageFunc/pages/repair',
                  })
               },2000)
        }
       
    },
})