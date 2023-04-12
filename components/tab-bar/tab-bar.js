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
    data: {
        currentTab:0
    },
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
