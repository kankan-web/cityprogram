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
    onShow(options) {
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
        if(src=='repairmessage'){
            wx.navigateTo({
              url: '/pageRepair/pages/repairmessage/index',
            })
        }else if(src=='message'){
            wx.redirectTo({
              url: '/pages/message/index',
            })
        }else if(src=='privacy'){
            wx.navigateTo({
              url: '/pageFunc/pages/privacy/index',
            })
        }else if(src=='exit'){
                this.logout()
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
    },
    logout(){
        const _this=this;
        wx.showModal({
            title: '温馨提示',
            content: '您确定解除当前微信号与该小程序之间的绑定关系，退出账号吗？',
            cancelText:'我骗你的',
            confirmText:'是的没错',
            confirmColor:'#000000',
            cancelColor:'#576b95',
            success (res) {
              if (res.confirm) {
                wx.removeStorage({key: 'userId',})
                wx.removeStorage({key: 'type',})
                wx.removeStorage({key: 'phone',})
                wx.removeStorage({key: 'name',})
                wx.setStorageSync('isLogin', false)
                _this.setData({
                    isLogin:false
                })
                wx.reLaunch({url: '/pages/home/index'})
              } else if (res.cancel) {
                wx.showToast({
                  title: '用户点击取消',
                })
              }
            }
          })
        
    }
})