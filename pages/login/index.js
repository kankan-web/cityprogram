// pages/login/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isAgree:false,
    },

    onLoad(options) {

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
    },
    handleLogin(){
        wx.login({
          success: (res) => {
            const code = res.code;
            wx.request({
              url: 'url',
              success:(res)=>{
                  console(result.data.openId);//获取到openid
              },
              fail:(err)=>{
                  console.log('err')
              }
            })
          },
        })
    },

    getPhoneNumber (e) {
        console.log(e.detail.code)
        console.log(e.detail.errMsg)
        console.log(e.detail.iv)
        wx.login({
            success:res =>{
                console.log(res.code);
                wx.request({
                    url:'服务器后端接口',
                    data:{
                       'encryptedData':e.detail.encryptedData,
                       'iv':e.detail.iv,
                       'codes':e.detail.code
                    },
                    method:'GET',
                    header:{
                        'content-type':'application/json'
                    },
                    success:function(res){
                        wx.setStorageSync('PhoneNumber',res.data.phoneNumber);
                        console.log("手机号为" + res.data.phoneNumber)
                    },
                    fail:function(err){
                        console.log(err);
                    }
                })
        }})
      }
})