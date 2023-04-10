Component({
    properties: {
      /**
      * 组件大小
      * small: 小
      * normal: 正常
      * large: 大
      */ 
      starSize: {
        type: String,
        value: 'normal'
      },
      // 评分值
      score: {
        type: Number,
        value: 0
      },
      // 同时使用多个组件,事件监听的方法名
      starIdx: {
        type: String,
        value: 'I'
      },
    },
    data: {
      star: [
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4},
        {id: 5}
      ],
      defaultSrc: '/assets/image/Star.png',
      activeSrc: '/assets/image/Star_active.png'
    },
    methods: {
      grade (e) {
          console.log('展示的数据为',e)
        // 如果只是展示分值，就屏蔽评分
        this.setData({
          score: e.currentTarget.dataset.index
        }, () => {
          const scoreDetail = {
            score: e.currentTarget.dataset.index
          };
          let evenName = 'getscore' + this.data.starIdx;
          this.triggerEvent(evenName, scoreDetail)
        })
      }
    }
  })