// pages/create_custom_habit/create_custom_habit.js
const app = getApp();

const daysArray = [];
for (let i = 1; i <= 30; i++){
  daysArray.push(i);
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl1: "https://7465-test1-f7f051-1255569511.tcb.qcloud.la/hobit_icon/喝水灰色.png?sign=06be44e79823537c681caeb98763d335&t=1554366638",
    imageUrl2: "https://7465-test1-f7f051-1255569511.tcb.qcloud.la/hobit_icon/学习灰色.png?sign=ab717eb7a7506ef877c36b3eb434d068&t=1554366650",
    imageUrl3: "https://7465-test1-f7f051-1255569511.tcb.qcloud.la/hobit_icon/拒绝手机灰色.png?sign=f1779798941305afc075245c93d8ae08&t=1554366665",
    imageUrl4: "https://7465-test1-f7f051-1255569511.tcb.qcloud.la/hobit_icon/早睡灰色.png?sign=3b15bd105c11fc745cb138c6b1472d7d&t=1554366679",
    imageUrl5: "https://7465-test1-f7f051-1255569511.tcb.qcloud.la/hobit_icon/早餐灰色.png?sign=ba35cfbb63582f7b100bdbe48371cb51&t=1554366694",
    imageUrl6: "https://7465-test1-f7f051-1255569511.tcb.qcloud.la/hobit_icon/灰色牙刷.png?sign=f49f2303a71b43fab77d56359eb086aa&t=1554366710",
    imageUrl7: "https://7465-test1-f7f051-1255569511.tcb.qcloud.la/hobit_icon/眼部运动灰色.png?sign=f37243e03e2b1c8d8e9aa95d1dcd0222&t=1554366721",
    imageUrl8: "https://7465-test1-f7f051-1255569511.tcb.qcloud.la/hobit_icon/运动灰色.png?sign=d8e69491f69da8eede6f64c4b60624aa&t=1554366733",
    imageUrl9: '',
    hname: '',
    remarks: '',
    days: '7',
    index: 1,
    color: 2,
    daysIndex: 6,
    daysArray
  },

  //用于插入图标url
  insert_icon: function () {
    const db = wx.cloud.database();
    db.collection("habit_icons").add({
      data: {
        index: 8,
        color: 6,
        url: 'https://7465-test1-f7f051-1255569511.tcb.qcloud.la/hobit_icon/运动黄色.png?sign=52331fd43dcee8401e48cd0ee40301a0&t=1554364518'
      },
      success: res => {
        console.log("成功插入");
      },
      fail: err => {

      }
    })
  },

  //选择颜色
  choosecolor: function (e) {
    console.log("选中的颜色序号是   " + e.currentTarget.id);
    const db = wx.cloud.database();
    var c = parseInt(e.currentTarget.id);
    db.collection("habit_icons").where({
      color: c,
      index: parseInt(this.data.index)
    }).get({
      success: res => {
        this.setData({
          imageUrl9: res.data[0].url
        })
      },
      fail: err => {

      }

    })
    this.setData({
      color: e.currentTarget.id,
    })

  },

  //输入框
  nameinput: function (e) {
    this.setData({
      hname: e.detail.value
    })
  },
  remarksinput: function (e) {
    this.setData({
      remarks: e.detail.value
    })
  },
  bindDaysChange: function (e) {
    this.setData({
      days: (parseInt(e.detail.value) + 1) + ""
    })
  },

  //此方法用于确认选中的图片样式
  chooseindex: function (e) {
    console.log("选中的图标序号是   " + e.currentTarget.id);
    const db = wx.cloud.database();
    var c = parseInt(e.currentTarget.id);
    db.collection("habit_icons").where({
      index: c

    }).get({
      success: res => {
        this.setData({
          imageUrl9: res.data[0].url
        })
      },
    })
    this.setData({
      index: e.currentTarget.id,
    })

  },

  //用于插入一条习惯数据
  insert_habit: function () {
    const db = wx.cloud.database();
    db.collection("habits_unfinish").add({
      data: {
        // openid: app.globalData.openid,
        hname: this.data.hname,
        days: this.data.days,
        index: this.data.index,
        color: this.data.color,
        sign_days: 0,
        remark: this.data.remarks,
        create_time: new Date(),
        sign_time: new Date(),
        imageUrl: this.data.imageUrl9
      },
      success: res => {
        console.log("成功插入一条习惯");
        app.globalData.create_new_habit = true;
        wx.showToast({
          title: '成功创建习惯',
        });
        this.timer = setInterval((() => {
          clearInterval(this.timer);
          wx.reLaunch({
            url: '../home/home',
          });
        }).bind(this), 1000);
      },
      fail: err=> {
        console.log("----------------------------------------")
        console.log(err);
        console.log("----------------------------------------")
      }
    });

  }
})