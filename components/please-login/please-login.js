import { myRequestPost,newUrl} from '../../utils/request'
Component({
    properties:{
        loginInfo:{
            type:Object,
        },
        isLogin:{
            type:Boolean,
        }
    },
    methods: {
        handleLogin(e){
            let _this=this;
            const isLogin=e.currentTarget.dataset.islogin;
            if(!isLogin){//表示未进行登陆
                wx.setStorageSync('isLogin', true)
                _this.login();
                _this.setData({
                    isLogin:true
                })
            }
        },
        async login(){
            let _this=this
            const type =2;//登陆类别0-用户,1-维修,2-保安
            let obj={};//用于存储登陆信息
            const newPersonInfo=await myRequestPost({
                url:newUrl.login,
                data:{
                    "type":type
                },
            })
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
                obj= newPersonInfo;
            }
            _this.setData({
                loginInfo:obj
            })
            wx.setStorageSync('type', type)//类型：0-用户，1-维修，2-保安
            wx.setStorageSync('userId', obj.id)//id
            wx.setStorageSync('phone', obj.phone)//电话号码
            wx.setStorageSync('name', obj.name)//名字
            wx.redirectTo({
              url: '/pages/home/index',
            })
        },
      
    }
})
