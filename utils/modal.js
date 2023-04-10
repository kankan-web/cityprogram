
export function myModal(options){
    return new Promise((resolve,reject)=>{
        wx.showModal({
            ...options,
            success (res) {
              if (res.confirm) {
                resolve(res)
              } else if (res.cancel) {
                reject(res)
              }
            }
          })
    })
}
export function myGetUserProfile(options){
    return new Promise((resolve,reject)=>{
        wx.getUserProfile({
            ...options,
            success:(res)=>{
                resolve(res)
            },
            fail:(res)=>{
                reject(res)
            }
        })
    })
}