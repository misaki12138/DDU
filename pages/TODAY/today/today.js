const app = getApp();

Page({

  data: {
    array: []
  },

  //在载入的时候从数据库中取出未完成的习惯
  onLoad: function (options) {
    wx.showLoading({
      title: '正在载入',
    })
    this.get_unfinish_habits();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   * 这里会进行判断需不需要重新读取数据库的习惯数据，如果添加了一个新的习惯，则需要刷新数组内容
   */
  onShow: function () {
    var isneedflush = app.globalData.create_new_habit;

    //根据标志判断是否修改过习惯
    if (isneedflush) {
      wx.showLoading({
        title: '正在载入',
      })
      console.log("我现在要刷新页面" + isneedflush);
      //恢复标志

      this.get_unfinish_habits();
    }

  },

  //此方法用于取出未完成的习惯，并且标识出习惯今天是否已经签到
  get_unfinish_habits: function () {
    const db = wx.cloud.database();
    db.collection("habits_unfinish").where({ // 查找需要openid，添加不需要
      _openid: app.globalData.openid
    }).get({
      success: res => {
        console.log("Today.js", "--- 已从数据库读取习惯 ---");
        var newarray = [];
        this.setData({
          array: newarray
        });

        for (var i = 0; i < res.data.length; i++) {
          var date = res.data[i].sign_time;
          var signtime = res.data[i].sign_days;
          var now = new Date();

          var dis = false;
          if (date.getMonth() == now.getMonth() && date.getDate() == now.getDate() && signtime > 0) {
            console.log("今天已经有项目做过了")
            dis = true;
          }

          var obj = {
            name: res.data[i].hname,
            days: res.data[i].days,
            signdays: res.data[i].sign_days,
            remarks: res.data[i].remark,
            imageurl: res.data[i].imageUrl,
            id: res.data[i]._id,
            disabled: dis
          };
          this.data.array.push(obj);
        }
        
        this.setData({
          array: this.data.array
        });

        //恢复标志
        app.globalData.create_new_habit = false;
        
        wx.hideLoading();
      }
    })
  },

  //此方法用index和color来获取图标url
  get_icon_url: function (index, color) {
    const db = wx.cloud.database();
    db.collection("habit_icons").where({
      index: this.data.index,
      color: this.data.color
    }).get({
      success: res => {
        console.log("取到了一个图标");
        console.log(res);
      },
      fail: err => {

      }
    })
  },

  //此方法为按钮的绑定方法，修改数据库的记录，同时使按钮不可用
  btnclick: function (e) {
    var index = e.currentTarget.id;
    var obj = this.data.array[index];

    var item = 'array[' + index + '].disabled';
    this.setData({
      [item]: true
    });
    wx.showToast({
      title: '打卡成功',
    })
    this.update_custom(obj);
    //console.log(obj.id);
  },

  //此方法用于更新数据库中记录的天数
  update_custom: function (obj) {
    const db = wx.cloud.database();
    db.collection("habits_unfinish").doc(obj.id).update({
      data: {
        sign_days: obj.signdays + 1,
        sign_time: new Date()
      },
      success: res => {
        console.log("修改数据成功");
        this.setData({
          array: this.data.array
        });
      },
      fail: err => {

        console.error('[数据库] [更新记录] 失败：', err)
      }
    })
  },
  e: function () {
    console.log("!2#");
  }
})