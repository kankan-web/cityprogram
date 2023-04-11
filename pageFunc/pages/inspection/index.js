import {myRequest,newUrl,url} from "../../../utils/request"
Page({
    data: {
        position:{//地址
            latitude:0,//经度
            longitude:0//维度
        },
        info:{
            inspectionNum:'',//设备编号
            inspectionName:'',//设备名称
            inspectionPosition:'',//设备编号
        },
        state:[{id:"0",name:"异常",checked:"ture"},{id:"1",name:"正常"}],
        stateId:"-1"//默认为-1，表示没有进行选择
    },
    onLoad(options) {
      const _this=this;
    },
    //获取设备状态
    radioChange(e){
        this.setData({
            stateId:e.detail.value
        })
    },
    //扫描功能
    async handleOpenScan(){
        var _this=this;
        _this.getPosition()
        wx.scanCode({//允许从相机和相册扫描
            async success(res){
                const checkId = res.result;
                const {latitude:x,longitude:y}=_this.data.position;
                const userId = wx.getStorageSync('userId');
                console.log('userId',checkId,'x+y',x,y)
                const result = await myRequest({
                    url:newUrl.checkInfo,
                    method:"POST",
                    data:{
                        "checkId":70010010001,
                        "checkXaxis":112.731583543,
                        "checkYaxis":37.756144,
                        "userId":2,
                    }
                })
                console.log('result',result)
                if(result.msg='巡检的签到成功！'){
                    console.log('checkId',checkId)
                    const obj={
                        inspectionId:checkId,
                        inspectionName:result.name,
                        inspectionPosition:result.location
                    }
                    _this.setData({
                        info:obj
                    })
                }else if(result.msg=='不能重复签到！'){
                    wx.showToast({
                      title: '不能重复签到！',
                    })
                }else{
                    wx.showToast({
                      title: '签到失败，请到规定位置签到！',
                    })
                }
                
            }
          })
    },
    //获取定位
    getPosition(){
      var _this = this;
      wx.getLocation({
        type: 'wgs84',
        success (res) {
          const position={
            latitude:res.latitude,
            longitude:res.longitude
          }
          _this.setData({
            position
          });
        }
       })
    },
    //上传文件
    updateFormData(e){
        const _this=this;
        let flag=false;//用于判断是否可以进行数据提交
        const {stateId,position}=_this.data;
        flag=this.handleCheckInspection(e.detail.value);
        //如果数据都不为空时，才进入
        if(flag){
            //跳转的中转页面
            if(stateId==0){
               setTimeout(()=>{
                wx.redirectTo({
                    url:'/pages/postsuccess/index?stateId=0'
                })
               },0)
            }else{
                setTimeout(()=>{
                    wx.redirectTo({
                        url:'/pages/postsuccess/index?stateId=1'
                    })
                })
            }
        }
    },
    //检查上传的数据
    handleCheckInspection(data){
        const _this=this
        const {inspectionName,inspectionNum,inspectionPosition}=data;
        const {stateId,position}=_this.data;
        //1.检测设备信息是否为空
        if(!inspectionName||!inspectionNum||!inspectionPosition){
            wx.showToast({
                title: '设备信息不全',
                icon: 'error',
                duration: 2000
              })
              return false;
        }
        //2.检查设备情况是否没有输入
        if(stateId=='-1'){
                wx.showToast({
                    title: '设备情况未知',
                    icon: 'error',
                    duration: 2000
                  })
                  return false;
        }
        //3.检查是否获取位置信息
        if(!position.latitude){
            wx.showToast({
                title: '位置信息为空',
                icon: 'error',
                duration: 2000
              })
              return false;
        }
        return true;
    }
})