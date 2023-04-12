export function formatTime(time){
    // 2022-10-17  17:01:08
    let arr = time.split(' ')
    if(!arr[1]){
        time = ''
    }else{
        time = arr[1]
    }
    let timeArr=arr[0].split('-')
    let date=timeArr[0]+'年'+timeArr[1]+'月'+timeArr[2]+'日'
    return date+' '+time
}
export function nowTime(){
    let current = new Date();//实例化Date对象
    let nowYear = current.getFullYear();//获取当前的年份
    let nowMonth = current.getMonth() + 1;//默认显示的是0-11月，比我们正常的月份少一个月，所以要+1
    let nowdates = current.getDate();//获取日期
    let nowHours = current.getHours();//获取小时
    let nowMinutes = current.getMinutes();//获取当前分钟
    let nowSeconds = current.getSeconds();//获取当前秒钟
    return nowYear+'-'+nowMonth+'-'+nowdates+' '+nowHours+':'+nowMinutes+':'+nowSeconds;
}
export function formatContent(detail){
    let arr=detail.split('\r\n\r\n');
    return arr;
}

export function getDetailProgress(progress){
    if(progress==0){
        return '需处理';
    }else if(progress==1){
        return '需反馈';
    }else if(progress==2){ 
        return '已完结';
    }
}