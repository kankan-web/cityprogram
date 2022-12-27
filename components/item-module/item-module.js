// components/item-module/item-module.js
Component({
    properties: {
        info:{
            type:Object
        }
        // serialNum:{
        //     type:String
        // },
        // type:{
        //     type:String,
        //     value:'保修'
        // },
        // address:{
        //     type:String
        // },
        // date:{
        //     type:String
        // },
        // time:{
        //     type:String
        // }
    },
    data: {
        
    },
    methods: {
        onBtnClick(event){
            const src = '/pages/detail/index?id='+event.currentTarget.dataset.num;
            console.log('点击',event.currentTarget.dataset.num)
            wx.navigateTo({
              url: src,
            })
        }
    }
})
