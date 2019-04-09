var util = require('../../../utils/util.js');
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    buttonUrl1: 'https://7465-test1-f7f051-1255569511.tcb.qcloud.la/getup/打卡前.png?sign=043f729f5595c8fd4730ebee9e80c479&t=1554447682',
    buttonUrl2: 'https://7465-test1-f7f051-1255569511.tcb.qcloud.la/getup/daka.png?sign=05ad8f95fc6f9590e612686f5de07042&t=1554447700',
    imageUrl: 'https://7465-test1-f7f051-1255569511.tcb.qcloud.la/背景白色.png?sign=2463ae044655a4c12bc23148195f2a98&t=1554430179',
    hadPunched: false,
    disabled: false,
    today: util.formaTime1(new Date())
  },

  onLoad: function(options) {
    wx.showLoading({
      title: '正在载入...',
    });

    const db = wx.cloud.database();
    var now = new Date();
    db.collection("wake_up").where({
      _openid: app.globalData.openid,
      month: now.getMonth(),
      day: now.getDate()
    }).get({
      success: res => {
        if (res.data.length > 0) {
          console.log("Home.js", "今日已经签到");
          var sign = res.data[0].time;
          this.setData({
            hadPunched: true,
            disabled: true,
          });
        } else console.log("Home.js", "今日尚未签到");
        wx.hideLoading();
      }
    });

    this.popup = this.selectComponent('#popup');

  },

  //此方法用于插入一条早起签到的记录
  getup: function() {
    var now = new Date();
    const db = wx.cloud.database();
    db.collection('wake_up').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        month: now.getMonth(),
        day: now.getDate(),
        time: now
      },
      success: res => {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        this.setData({
          hadPunched: true,
          disabled: true,
        })
        wx.navigateTo({
          url: '../show_wakeup_image/show_wakeup_image',
        })
      }
    })
  },

  //此方法用于跳转到新建习惯页面
  habit: function() {
    wx.navigateTo({
      url: '../create_custom_habit/create_custom_habit',
    })
  },

  //此方法用于跳转到新建任务页面
  mission: function() {
    this.popup.showPopup();
  },

  popup_error() {
    this.popup.hidePopup();
  },
  popup_success() {
    if (btn_sport) {
      this.popup.btnsport();
    }
    if (btn_study) {
      this.popup.btnstudy();
    }
    if (btn_cancel) {
      this.popup.hidePopup();
    }
  },
})