// pages/mine/index.js
Page({
    data: {
      islogin:false,
      info:{
          name:'未填写',
          phone:'未填写'
      },
      personInfo:{
        name:'请登陆',
        src:"/assets/icon/用户-圆.png"
      },
      isrepair:false,
      isLogin:false
    },
    onLoad(options) {
      const type =wx.getStorageSync('type')
      const isLogin = wx.getStorageSync('isLogin')
      if(isLogin){//表示用户已经进行了登陆
        this.haveDataLogin()
        this.setData({
            isLogin:true
        })
      }
      if(type==2) this.setData({isrepair:true});
      if(this.data.isLogin){
        this.haveDataLogin()
      }
    },
    // 控制路由跳转
    handleNavTo(e){
        const src = e.currentTarget.dataset.src;
        console.log('点击了',e.currentTarget.dataset.src)
        if(src=='repairmessage'){
            wx.navigateTo({
              url: '/pages/repairmessage/index',
            })
        }else if(src=='message'){
            wx.redirectTo({
              url: '/pages/message/index',
            })
        }else{
            wx.showToast({
              title: '功能待开发',
              icon:'none',
              duration:1000
            })
        }
    },
    //获取登陆信息
    haveDataLogin(){
        const userId=wx.getStorageSync('userId');
        const phone = wx.getStorageSync('phone');
        const name = wx.getStorageSync('name');
        const obj={
            userId,
            phone,
            name
        }
        const info={
            phone,
            name
        }
        this.setData({
            personInfo:obj,
            info:info
        })
    }
})