import {myRequest,newUrl} from "../../utils/request"
import {funcmodel2,funcmodel3} from '../../utils/data'
Page({
    data: {
        background:[{
            src:'/assets/image/banner.png',
            imgId:100
        },{
            src:'/assets/image/banner.png',
            imgId:101
        },{
            src:'/assets/image/banner.png',
            imgId:102
        }],
        notify:[],//公告栏列表
        funcmodel1:[{
            name:'用户报修',
            desc:'公共设施一键报修',
            src:'/pages/repair/index',
            img:'/assets/image/维修记录.png'
        },{
            name:'消息中心',
            desc:'',
            src:'/pages/message/index',
            img:'/assets/image/消息.png',
        },{
            name:'联系客服',
            desc:'',
            src:'',
            img:'/assets/image/联系.png',
        }],
        showModal: false,//是否显示联系客服模态框
        currentPage:1,
        isloading:false,//发起请求时展示的loading效果
        isLogin:false,
        personInfo:{
            name:'请登陆',
            src:"/assets/icon/用户-圆.png"
        },
    },
    onLoad(){
        let _this=this;
        let type=wx.getStorageSync('type')
        if(type==2){
            _this.setData({
                funcmodel1:funcmodel2
            })
        }else if(type==1){//维修人员
            _this.setData({
                funcmodel1:funcmodel3
            })
        }
        _this.getBoardDate(this.data.currentPage)
        const isLogin = wx.getStorageSync('isLogin')
        if(isLogin){//表示已经登陆过了，获取了数据
            _this.haveDataLogin()
            this.setData({
                isLogin:true
            })
        }
        this.login()
    },
  //控制功能模块页面跳转
  handleFuncNav(e){
      //1.获取路径
      const src = e.currentTarget.dataset.src
      console.log(e.currentTarget)
      if(src=='/pages/message/index'){
        //2.跳转路径
        wx.switchTab({
            url: src,
        })
      }else if(!src){//进入联系客服
        this.setData({
            showModal:!this.data.showModal
        })
      }else{
        wx.navigateTo({
            url: src,
        })
      }
  },
  //获取公告栏的数据
  async getBoardDate(page){
        //发请求前展示loading效果
      this.setData({
          isloading:true,
          currentPage:page+1
      })
      wx.showLoading({
        title: '加载更多',
      })
      const boradDate = await myRequest({
        url:newUrl.border,
        data:{
            "currentPage":page,
            "pigeSize":4
        },
      },()=>{
          wx.hideLoading()
          this.setData({isloading:false})
      })
      this.setData({
          notify:[...this.data.notify,...boradDate]
      })
  },
  //处理页面是否展示
  async handleIsShow(e){
      const isShow=e.detail;
      this.setData({
        showModal:isShow
      })
  },
  //实现下来加载更多
  onReachBottom() {
    if(this.data.isloading) return
    this.getBoardDate(this.data.currentPage++);
  },
  //若已经登陆过，则获取缓存中的数据
  haveDataLogin(){
      const userId=wx.getStorageSync('userId');
      const phone = wx.getStorageSync('phone');
      const name = wx.getStorageSync('name');
      const obj={
          userId,
          phone,
          name
      }
      this.setData({
          personInfo:obj
      })
  },
//   //登陆代码设置
  login(){
      wx.login({
        success: (res) => {
          console.log('res',res)
        },
      })
  }
})