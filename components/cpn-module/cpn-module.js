// components/cpn-module/cpn-module.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title:{
            type:String
        },
        explain:{
            type:String
        },
        src:{
            type:String
        },
        page:{
            type:String
        }
    },
    data: {

    },
    methods: {
        onBtnClick(event){
            //1.获取路径
            const src = event.currentTarget.dataset.page;
            //2.跳转路径
            wx.navigateTo({
              url: src,
            })
        }
    }
})
