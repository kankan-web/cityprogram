import { formatProgress,generateRandomIds} from '../../utils/data'
// components/item-module/item-module.js
Component({
    properties: {
        info:{
            type:Object,
            observer:function(newVal){
                const type = wx.getStorageSync('type')
                newVal.progress = formatProgress(newVal.progress)
                if(!newVal.taskCode) newVal.taskCode = generateRandomIds(type,newVal.id)
                this.setData({
                    messageItem:newVal
                })
            }
        },
        repair:{
            type:Boolean,
            value:false
        }
    },
    data: {
        messageItem:{},
        titleName:'报修'
    },
    onLoad(){
        const type=wx.getStorageSync('type')
        if(type==1){
            this.setData({
                titleName:'巡检'
            })
        }else if(type==2){
            this.setData({
                titleName:'维修编号'
            })
        }
    },
    methods: {
        onBtnClick(event){
            const {id,taskCode}=this.data.messageItem;
            const repair=this.data.repair
            const type = wx.getStorageSync('type');
            let src='';
            if(type==0){
               src = '/pages/detail/index?messageId='+id+'&taskCode='+taskCode;
            }else if(type==2&&repair){
              src='/pages/guarddetail/index?messageId='+id+'&taskCode='+taskCode;
            }else{
               src = '/pages/detail/index?messageId='+id+'&taskCode='+taskCode;
            }
            //将参数传递给详细页面
            wx.navigateTo({
              url: src,
            })
        }
    }
})
