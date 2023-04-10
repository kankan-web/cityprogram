// components/rate/rate.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        value: {
            type: Number,
            observer(value) {
                if (value !== this.data.innerValue) {
                    this.setData({ innerValue: value });
                }
            },
        },
    },
    data: {
        innerValue:0,
        innerCountArray:Array.from({length:5}),
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onSelect(event){
            const { data } = this;
            const { score } = event.currentTarget.dataset;
            console.log('score',score)
            this.setData({
                value:score+1
            })
            wx.nextTick(() => {
                this.$emit('change', score + 1);
            });
        }
    }
})
