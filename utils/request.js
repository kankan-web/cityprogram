const baseurl="http://47.100.118.106:7777"
// const baseurl='http://127.0.0.1:4523/mock/2355445'
// const baseurl='http://127.0.0.1:4523/m1/2355445-0-94189213'

export const newUrl={
    login:baseurl+'/api/tmxk/login/test',//测试登陆
    loginwx:baseurl+'/api/tmxk/login/wx',//正式登陆
    border:baseurl+'/api/tmxk/display/rough/notify',//公共列表
    borderDetail:baseurl+'/api/tmxk/display/detail/notify',//公共详情
    // 用户有关的接口
    messageListUser:baseurl+'/api/tmxk/display/rough/task/user',
    messageDetailUser:baseurl+'/api/tmxk/display/detail/task/user',
    
    // 保安有关的接口
    messageListGuard:baseurl+'/api/tmxk/display/rough/guard',//巡检信息列表
    messageDetailGuard:baseurl+'/api/tmxk/display/detail/guard',//巡检信息详情
    reqairListGuard:baseurl+'/api/tmxk/display/rough/task/guard',//维修信息列表
    reqairDetailGuard:baseurl+'/api/tmxk/display/detail/task/guard',
    checkInfo:baseurl+'/api/admin/checkcode/getIsLoc',//二维码定点签到
    // 维修有关的接口
    messageListRepair:baseurl+'/api/tmxk/display/rough/rapire',//维修人员接单列表
    massageDetailRepair:baseurl+'/api/tmxk/display/detail/rapire',//维修人员接单详情
    uploadFinishRepair:baseurl+'/api/tmxk/jhx/moudles/addTaskWorker',//维修人员提交反馈
    //公共
    commentUrl:baseurl+'/api/tmxk/jhx/moudles/addTaskResult',//评论接口
    uploadRepair:baseurl+'/api/tmxk/jhx/moudles/addTask',//上传报修

}
export function myRequest(options,fun){
    return new Promise((resolve,reject)=>{
        wx.request({
          ...options,
          success:(res)=>{
              resolve(res.data)
          },
          fail:(res)=>{
              reject(res.data)
          },
          complete:fun
        })
    })
}
export function myRequestPost(options){
    return new Promise((resolve,reject)=>{
        wx.request({
          ...options,
          header: { "content-type": "application/x-www-form-urlencoded" },
          method:"post",
          success:(res)=>{
              resolve(res.data)
          },
          fail:(res)=>{
              reject(res.data)
          }
        })
    })
}
export function myRequestPostImg(newurl,newData){
    return new Promise((resolve,reject)=>{
        wx.request({
            url:newurl,
            method:'POST',
            data:newData,
            success:function(res){
                if(res.data.code==200){
                    wx.showModal({
                      title: '提示',
                      content: '提交成功，棒棒哒！',
                    })
                    wx.switchTab({
                        url: '/pages/message/index',
                    })
                }else{
                    wx.showModal({
                      title: '提示',
                      content: '上传失败！',
                    })
                }
                resolve('发送数据成功')
            },
        })
    })
}