import {pickArray,pickArrayName} from '../../../utils/data'
import {myRequest, myRequestPostImg,newUrl} from '../../../utils/request'
Page({
    data: {
        repairName:'',//设备名称
        repairDetail:'',//投诉详情
        repairImg:[],//图片
        repairAddress:'',//地址
        index: 0,
        array:pickArray,
        arrayName:pickArrayName,
        showPick:false
    },
    async uploadFormData(e){
        const _this=this;
        let flag=false;//用于判断是否可以进行数据提交
        const {repairDetail,repairName,repairAddress}=e.detail.value;
        const {repairImg,array,index,showPick} = _this.data;
        const bname=array[index].id;//楼id
        const updateId = wx.getStorageSync('userId');
        const type=wx.getStorageSync('type');
        let updateType;
        if(type==0){//发起人类型,0-用户,1-保安
             updateType=0;
        }else{
             updateType=1
        }
        const partId = _this.data.array[_this.data.index].id;
        flag = this.handleCheckRepair(repairDetail,repairAddress,repairName,showPick)
        if(flag){
            const result = await myRequest({
                url:newUrl.uploadRepair,
                method:"POST",
                data:{
                    "updateId":updateId,
                    "deviceName":repairName,
                    "bname":bname,
                    "adeviceAdress":repairAddress,
                    "adeviceProblem":repairDetail,
                    "updateType":updateType,
                    "imgs":repairImg
                }
            })
            console.log('result为：',result)
            if(result.code==200){
                wx.redirectTo({
                    url:'/pages/postsuccess/index?stateId=1'
                })
            }
        }
    },
    bindPickerChange(e){
        this.setData({
            index:e.detail.value,
            showPick:true
        })
    },
    async getImageData(imgList){
        console.log('imgList',imgList.detail)
        const newArr = [...this.data.repairImg,imgList.detail.fileContent];
        this.setData({
            repairImg:newArr
        })
    },
    handleCheckRepair(repairDetail,repairAddress,repairName,showPick){
        //1.检测设备信息是否为空
        if(!repairDetail||!repairAddress||!repairName){
            wx.showToast({
              title: '报修信息不全',
              icon:"error",
              duration:1000
            })
            return false;
        }
        if(!showPick){
            wx.showToast({
              title: '没有选择当前地址',
              icon:'error',
              duration:1000
            })
            return false;
        }
        return true;
    }
})