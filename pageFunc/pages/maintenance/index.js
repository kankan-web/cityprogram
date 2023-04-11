import { myRequest, newUrl } from "../../../utils/request"
import {SeparatedData} from '../../../utils/data'
Page({
    data: {
        index:-1,//数组
        showPick:false,//是否展示提示信息
        imgArr:[],
        maintenanceDetail:'',
        maintenanceId:-1,
        arrayId:[],//未维修的设备编号
        arrayName:[],//未维修的设备名称
        arrayAddress:[],//未维修的设备地址
    },
    onLoad(options){
        const maintenanceId = options.maintenanceId;
        this.setData({
            maintenanceId
        })
       this.getMaintenanceList();
    },
    bindPickerChangeId(e){
        this.setData({
            index:e.detail.value,
            showPick:true
        })
    },
    bindPickerChangeName(e){
        this.setData({
            index:e.detail.value,
            showPick:true
        })
    },
    bindPickerChangeAddress(e){
        this.setData({
            index:e.detail.value,
            showPick:true
        })
    },
    //初始化接单列表
    async getMaintenanceList(){
        const list =await myRequest({
            url:newUrl.messageListRepair,
            data:{
                "repairId":1,
                "currentPage":1,
                "pigeSize":10,
                "progress":0
            }
        })        
       if(list.length!==0){
        let {arrId,arrName,arrAddress}=SeparatedData(list);
        const index = arrId.indexOf(parseInt(this.data.maintenanceId))
        this.setData({
            arrayId:arrId,
            arrayName:arrName,
            arrayAddress:arrAddress,
            index:index
        })
       }
    },
    //上传数据
    async uploadFormData(e){
        const _this = this;
        let flag=false;//用于检测数据是否有效
        const {index,arrayId,imgArr} = _this.data
        const userId = wx.getStorageSync('userId');
        const maintenanceId = arrayId[index];
        const {maintenanceDetail} = e.detail.value;
        flag = _this.handleCheckInfo(index,maintenanceDetail);
        if(flag){
            const res = await myRequest({
                url:newUrl.uploadFinishRepair,
                method:"POST",
                data:{
                    "resultNumber":maintenanceId,
                    "resultText":maintenanceDetail,
                    "taskId":maintenanceId,
                    "imgs":imgArr,
                    "taskWorkId":userId,
                }
            })
            console.log('res',res)
            if(res.code==200){
                wx.redirectTo({
                    url:'/pages/postsuccess/index?stateId=2'
                })
            }
        }
    },
    handleCheckInfo(id,detail){
        if(id==-1){
            wx.showToast({
              title: '设备信息不全',
              icon:"error",
              duration:1000
            })
            return false;
        }
        if(!detail){
            wx.showToast({
              title: '维修详情不能为空',
              icon:'error',
              duration:1000
            })
            return false;
        }
        return true;
    },
    //获取图片信息
    async getImageData(imgList){
        const newArr = [...this.data.imgArr,imgList.detail.fileContent];
        this.setData({
            imgArr:newArr
        })
    },
})