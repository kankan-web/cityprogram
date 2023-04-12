import {myRequestPost,newUrl} from '../../../utils/request'
Page({
    data: {
        isAgree:false,
    },
    onLoad(options) {

    },
    onShow() {

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
    // handleLogin(){
    //     wx.login({
    //       success: (res) => {
    //         const code = res.code;
    //         wx.request({
    //           url: 'url',
    //           success:(res)=>{
    //               console(result.data.openId);//获取到openid
    //           },
    //           fail:(err)=>{
    //               console.log('err')
    //           }
    //         })
    //       },
    //     })
    // },
     getPhoneNumber (e) {
        console.log(e.detail.code)
        console.log(e.detail.errMsg)
        console.log(e.detail.iv)
        console.log('e',e.detail.code)
        wx.login({
            success:res =>{
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
      },
      handleLogin(e){
        let _this=this;
        const isLogin = wx.getStorageSync('isLogin')
        const type=e.currentTarget.dataset.type;
        const isAgress = _this.data.isAgree;
        if(!isLogin&&isAgress){//表示未进行登陆
            _this.login(type);
           
        }else if(!isAgress){
            wx.showToast({
              title: '请先同意隐私协议',
              icon:'none'
            })
        }
    },
    async login(type){
        let _this=this
        let obj={};//用于存储登陆信息
        const newPersonInfo=await myRequestPost({
            url:newUrl.login,
            data:{
                "type":type
            },
        })
        //归一化数据
        if(type==2){//保安
            obj={
                id:newPersonInfo.workId,
                identity:newPersonInfo.workIdentity,
                name:newPersonInfo.workName,
                partId:newPersonInfo.workPartId,
                phone:newPersonInfo.workPhone,
                status:newPersonInfo.workStatus,
            }
        }else if(type==1){//维修人员
            obj={
                id:newPersonInfo.workId,
                identity:newPersonInfo.workIdentity,
                name:newPersonInfo.workName,
                partId:newPersonInfo.workPartId,
                phone:newPersonInfo.workPhone,
                status:newPersonInfo.workStatus
            }
        }else{
            obj=newPersonInfo
        }
        _this.setData({
            loginInfo:obj
        })
        wx.setStorageSync('type', type)//类型：0-用户，1-维修，2-保安
        wx.setStorageSync('userId', obj.id)//id
        wx.setStorageSync('phone', obj.phone)//电话号码
        wx.setStorageSync('name', obj.name)//名字
        wx.setStorageSync('isLogin', true)
        _this.setData({
            isLogin:true
        })
        wx.redirectTo({
          url: '/pages/home/index',
        })
    },
})