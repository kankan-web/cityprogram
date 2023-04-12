export const info=[{
    serialNum:'166599726866550',
    type:'保修',
    address:'思明区厦港街道鸿山社区居委会',
    date:' 2022-10-17',
    time:'17:01:08',
    statu:'需审核'
},{
    serialNum:'166599726866551',
    type:'报修',
    address:'思明区厦港街道鸿山社区居委会',
    date:' 2022-10-17',
    time:'17:01:08',
    statu:'需审核'
},{
    serialNum:'166599726866552',
    type:'保修',
    address:'思明区厦港街道鸿山社区居委会',
    date:' 2022-10-17',
    time:'17:01:08',
    statu:'已完结'
},{
    serialNum:'166599726866553',
    type:'报修',
    address:'思明区厦港街道鸿山社区居委会',
    date:' 2022-10-17',
    time:'17:01:08',
    statu:'已完结'
}]
export const funcmodel2=[{
    name:'保安巡检',
    desc:'公共设施一键报修',
    src:'/pageFunc/pages/inspection/index',
    img:'/assets/image/扫描1.png'
},{
    name:'设备报修',
    desc:'',
    src:'/pageFunc/pages/repair/index',
    img:'/assets/image/维修记录.png',
},{
    name:'联系客服',
    desc:'',
    src:'',
    img:'/assets/image/联系.png',
}]
export const funcmodel3=[{
    name:'设备维修',
    desc:'公共设施一键报修',
    src:'/pageFunc/pages/maintenance/index',
    img:'/assets/image/维修记录.png'
},{
    name:'消息中心',
    desc:'',
    src:'/pages/message/index',
    img:'/assets/image/消息.png',
},{
    name:'联系客服',
    desc:'',
    src:'',
    img:'/assets/image/联系.png',
}]
export function formatProgress(progress){
    switch(progress){
        case 0:
            progress='wait'
            break;
        case 1:
            progress='feedback'
            break;
        case 2:
            progress='finish';
            break;
        default:
            break
    }
    return progress;
}
export const pickArray=[{
    name:'高新置业',
    id:7001,
},{
    name:'科祥大厦',
    id:7002
},{
    name:'创业园A座',
    id:7003
},{
    name:"创业园B座",
    id:7004,
},{
    name:'旭然园',
    id:7005
},{
    name:"新发展",
    id:7006
},{
    name:"高新国际A座",
    id:7007
},{
    name:"高新国际B座",
    id:7008
},{
    name:'科技园',
    id:7009
},{
    name:"留创园B座",
    id:7010
},{
    name:'孵化基地4、5号园区',
    id:7011
},{
    name:'孵化基地4、5号地库',
    id:7012
},{
    name:'孵化基地5号楼',
    id:7013
},{
    name:"孵化基地4号楼",
    id:7014
},{
    name:"孵化基地2号楼园区",
    id:7015
},{
    name:"孵化基地2号楼",
    id:7016
},{
    name:"数码港A座",
    id:7017
},{
    name:"数码港B座",
    id:7018
},{
    name:"检察院",
    id:7019
},{
    name:"综改公安分局南区",
    id:7020
},{
    name:"富士康派出所",
    id:7021
},{
    name:"综改公安分局北区",
    id:7022
},{
    name:"管委会主楼",
    id:7023
},{
    name:"管委会新建附属楼",
    id:7024
},{
    name:"唐槐园一期",
    id:7025
},{
    name:"唐槐园二期",
    id:7026
},{
    name:"物联网地库",
    id:7027
},{
    name:"物联网A座",
    id:7028
},{
    name:"物联网B座",
    id:7029
},{
    name:"物联网C座",
    id:7030
},{
    name:"物联网D座",
    id:7031
},{
    name:"物联网E座",
    id:7032
}
]
export const pickArrayName=['高新置业',
'科祥大厦',
'创业园A座',
"创业园B座",
'旭然园',
"新发展",
"高新国际A座",
"高新国际B座",
'科技园',
"留创园B座",
'孵化基地4、5号园区',
'孵化基地4、5号地库',
'孵化基地5号楼',
"孵化基地4号楼",
"孵化基地2号楼园区",
"孵化基地2号楼",
"数码港A座",
"数码港B座",
"检察院",
"综改公安分局南区",
"富士康派出所",
"综改公安分局北区",
"管委会主楼",
"管委会新建附属楼",

"唐槐园一期",
"唐槐园二期",
"物联网地库",
"物联网A座",
"物联网B座",
"物联网C座",
"物联网D座",
"物联网E座",
]
export function generateRandomIds(type,id){
    let head ='YH';
    if(type==1) head="WX"
    else if(type==2) head="BA"
    if(id<10) id ='0'+id;
    let body=Math.random().toString(16).slice(2,10).toUpperCase();
    return head+id+body;
}
export function SeparatedData(arr){
    let arrId=[],arrName=[],arrAddress=[];
    arr.forEach((item)=>{
        arrId.push(item.id)
        arrName.push(item.deviceName)
        arrAddress.push(item.adeviceAddress)
    })
    return {arrId,arrName,arrAddress};
}