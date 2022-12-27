// components/tab-bar/tab-bar.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title:{
            type:Array,
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        currentTab:0
    },

    /**
     * 组件的方法列表
     */
    methods: {
        changeTab(event){
            const {index} = event.currentTarget.dataset
            this.setData({
                currentTab:index
            })
            this.triggerEvent("tabchange",index)
        }
    }
    
})
