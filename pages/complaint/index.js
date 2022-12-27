// pages/complaint/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        complaintName:'',//姓名
        complaintTel:'',//电话
        complainType:'',//类型
        complainDetail:'',//详情
        complainImg:'',//图片
        complainAddress:''//地址
    },

    loginFormData:function(e){
        console.log('点击')
        console.log(e)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },
})