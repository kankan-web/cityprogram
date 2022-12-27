// pages/home/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page:[
            {name:'设备保修',explain:'市政设施一键保修',class:"func-module1",
             page:'/pages/repair/index',src:'/assets/image/维修记录.png'},
            {name:'市政投诉',explain:'市政设施一键投诉',class:"func-module2",
            page:'/pages/complaint/index',src:'/assets/image/维修记录.png'}
        ]
    },
    onBtnClik(event){
        console.log('点击',event)
    }
})