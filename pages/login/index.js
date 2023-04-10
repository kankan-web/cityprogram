// pages/login/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isAgree:false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },
    getPhone(e){
        console.log('是否同意',e)
    },
    handleAgreement(e){
        const msg = e.detail.value[0];
        if(msg=='同意'){
            this.setData({
                isAgree:true
            })
        }else{
            this.setData({
                isAgree:false
            })
        }
    }
})