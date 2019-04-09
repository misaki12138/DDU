Page({
  data: {
    selectArray: [{
      "id": 1,
      "text": "项目1"
    }, {
      "id": 2,
      "text": "项目2"
    }, {
      "id": 3,
      "text": "项目3"
    }, {
      "id": 4,
      "text": "项目4"
    }, {
      "id": 5,
      "text": "项目5"
    }]
  },

  //select选中某项的响应
  getDate: function (e) {
    console.log(e)
    this.setData({
      currSelected: e.detail.id
    });
  },

  //此方法是获取下拉列表选择的序号，然后从数据库中取出对应的项目
  start_event: function () {
    var id = this.data.currSelected;
    
    const db = wx.cloud.database();
    db.collection("sport_comm").where({
    }).get({
      success: res => {
        var tevent = res.data[0].event;
        var ttime = res.data[0].time;
        console.log("start_event", res.data[0].event);
        console.log("start_event", res.data[0].time)
        wx.navigateTo({
          url: '../library/library?event=' + tevent + '&time=' + ttime + '&type=1'
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },

  //此方法为跳转到自定义页面
  custom_event: function () {
    wx.navigateTo({
      url: '../create_custom_sport_event/create_custom_sport_event',
    })
  },
  
  //此方法为插入一条推荐的数据库记录
  insert: function () {
    console.log("inserting");
    const db = wx.cloud.database();
    db.collection('sport_comm').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
        id: 1,
        event: "running",
        time: 30
      },
      success(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })
  }
})