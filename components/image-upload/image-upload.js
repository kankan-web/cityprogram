/**
 * 小程序图片上传
 * 组件接受参数
 * fileList  图片数组
 * prevent 控制是否可新增
 * 方法
 * bindimageChange 选择图片后触发
 * bindimageDel  删除图片后触发
 * 
 */
Component({
  data: {
    fileList: [],
    isShow:true,
    maxNum:7,
    maxSize:0,
  },
  ready() {},
  methods: {
    // 点击加号进入手机相册，并进行图片选择
    _addImg() {
      let _this = this;
      if(_this.data.fileList.length>_this.data.maxNum-2){
        _this.setData({
          isShow:false
        })
      }
      // 此方法为微信小程序自带api 
      wx.chooseImage({
        count: 3,
        sizeType:['compressed'],
        sourceType:['album','camera'],//选择图片的来源
        success(res) {
          //此处会返回图片暂存路径和文件大小
          const data = res.tempFiles;
            _this.setFile(data)
        },
        fail(res){
            if(_this.data.fileList.length<_this.data.maxNum){
                _this.setData({
                  isShow:true
                })
              }
        }
      })
    },
    // 将wx.chooseImage返回的数据进行扩展
    setFile (data) {
      const item = data[0];
      console.log('item的path为',item.path)
      // 通过路径截取文件后缀名
      const fileFormat = item.path.substring(item.path.lastIndexOf(".") + 1, item.path.length);
      if(fileFormat!='png'&&fileFormat!='jpg'){
        wx.showToast({
            title: '图片格式错误',
            icon: 'error',
            duration: 2000
          })
          return;
        }
      // wx.getFileSystemManager()小程序文件管理器api，可以将通过文件路径将其转换成64编码
      const fileManager = wx.getFileSystemManager();
      const base64 = fileManager.readFileSync(item.path, 'base64');
      item.fileContent = base64;
      // 通过时间获取随机13位随机数并且拼接文件后缀进行文件命名
      item.fileName = this.getFileName(13) + '.' + fileFormat;
      // 此处操作是用来进行选中图片显示的，只有这样拼接才能显示base64编码的路径
      item.path = `data:image/${fileFormat};base64,${base64}`;
      let size = this.data.maxSize+parseInt(item.size);
      this.setData({ 
        fileList: this.data.fileList.concat(item.path),
        maxSize:size,
    });
      // 此处操作是用来将获取到的文件数据传递给父组件进行文件上传
      this.triggerEvent('imageChange',item)
    },
    // 随机生成文件名
    getFileName (m) {
      m = m > 13 ? 13 : m;
      var num = new Date().getTime();
      return num.toString().substring(13 - m);
    },

    //点击进行图片删除
    _onDelTab(e) {
      // 获取图片索引
      let idx = e.currentTarget.dataset.idx;
      let delFile = this.data.fileList[idx];
      this.data.fileList.splice(idx, 1);
      if(this.data.fileList.length<this.data.maxNum){
        this.setData({
          isShow:true
        })
      }
      this.setData({
        fileList: this.data.fileList
      })
      this.triggerEvent('imageDel', delFile);
    }
}})
