// components/modal2/modal2.js
Component({
    properties: {
        isshow: {
            type: Boolean,
        }
    },
    // 组件的方法列表
    methods: {
        //对话框确认按钮点击事件
        onCopy: function (e) {
            const status=e.currentTarget.dataset.status;
            this.hideModal();
            if(status=='success'){
                wx.setClipboardData({
                  data: '13457859456',
                  success(res){
                      console.log('内容已复制')
                  }
                })
            }
            // 将isshow返回给页面
            this.triggerEvent('changeIsShow',this.data.isshow)
        },
        //弹出框蒙层截断touchmove事件
        preventTouchMove: function () {},
        // 隐藏模态对话框
        hideModal: function () {
            this.setData({
                isshow: false
            });
        },
    },
    onLoad: function () {},


})