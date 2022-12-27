// pages/appeal/index.js
import {info} from '../../data/appeal'
Page({
    data: {
        title:['全部','需受理','已办结'],
        index:0,
        info:[]
    },
    onLoad(){
        console.log(info)
        this.setData({
            info:info
        })
    },
    onTabChange(event){
      this.setData({index:event.detail})
    }
})