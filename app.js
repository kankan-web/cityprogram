import {myRequest,newUrl} from './utils/request'
App({
  onLaunch(){
    // this.login()
  },
  //登陆设置
//   async login(){
//       let _this=this
//     const personInfo=await myRequest({
//         url:newUrl.login,
//         data:{
//             "type":0
//         },
//         header: { "content-type": "application/x-www-form-urlencoded" },
//         method:"post"
//     })
//     _this.setData({
//         personInfo
//     })
    //1.wx.login()获取code
    // wx.login({
    //   success: (res) => {
    //     console.log('code'+res.code+'url'+newUrl.login);
    //     //2.将code发给服务器

        // wx.request({
        //   url: newUrl.login,
        //   method:'POST',
        //   data:{
        //       code:res.code,
        //       type:0
        //   }
        // })
    //   },
    // })
//   }
})
