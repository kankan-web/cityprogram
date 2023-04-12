Component({
    properties:{
        loginInfo:{
            type:Object,
        },
        isLogin:{
            type:Boolean,
        }
    },
    methods: {
        handleLogin(){
            let isLogin = this.data.isLogin;
            if(!isLogin){
                wx.navigateTo({
                    url: '/pageFunc/pages/login/index',
                  })
            }
        }
    }
})
