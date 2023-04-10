export function formatImage(src){
    let arr = src.split('\"');
    let res=[];
    arr.forEach((item,index)=>{
        if(index%2==1){
            res.push(item)
        }
    })
    return res;
}