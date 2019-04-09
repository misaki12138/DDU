// pages/all/all.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 10,
    imageurl1: "https://7465-test1-f7f051-1255569511.tcb.qcloud.la/hobit_icon/运动粉色.png?sign=f1dd1e305fb9fb6d6f550c76f1bf0e37&t=1554468053",

    //已经完成的习惯
    finishHabits: [{

    }, {

    }],

    //未完成的习惯
    unFinishHabits: [{

    }, {

    }, {

    }],

    //已经完成的任务
    finishMissions: [{

    }, {

    }]
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showLoading({
      title: '正在加载...',
    });
    this.getFinishHabits();
    this.getUnfinishHabits();
    this.getMissions();
  },

  /*动态设置进度条*/
  changeTabbar(e) {
    this.setData({ index: e.currentTarget.dataset.id })
  },

  //此方法用于获取养成的习惯数组
  getFinishHabits: function () {

    //初始化数组
    var newArray = [];
    this.setData({
      finishHabits: newArray
    })

    const db = wx.cloud.database();
    db.collection("habits_finish").where({
      _openid: app.globalData.openid
    }).get({
      success: res => {
        // console.log(app.globalData);
        // console.log(res);

        for (var i = 0; i < res.data.length; i++) {

          var obj = {
            hname: res.data[i].hname,
            days: res.data[i].days,
            imageUrl: res.data[i].imageUrl,
            remark: res.data[i].remark,
            finish_time: res.data[i].finish_time,
          }
          this.data.finishHabits.push(obj);

        }
        this.setData({
          finishHabits: this.data.finishHabits
        })
      },
      fail: err => {

      }
    })
  },

  //此方法用于获取正在做的习惯数组
  getUnfinishHabits: function () {

    //初始化数组
    var newArray = [];
    this.setData({
      unFinishHabits: newArray
    })


    const db = wx.cloud.database();
    db.collection("habits_unfinish").where({
      _openid: app.globalData.openid
    }).get({
      success: res => {
        console.log("成功读取未完成的习惯 ");

        for (var i = 0; i < res.data.length; i++) {
          // console.log(res.data[i].sign_days / res.data[i].days);
          var pecent = (res.data[i].sign_days / res.data[i].days).toFixed(2);
          pecent = parseInt(pecent * 100);
          var obj = {
            hname: res.data[i].hname,
            days: res.data[i].days,
            sign_days: res.data[i].sign_days,
            imageUrl: res.data[i].imageUrl,
            remark: res.data[i].remark,
            pecent: pecent
          }
          this.data.unFinishHabits.push(obj);

        }
        this.setData({
          unFinishHabits: this.data.unFinishHabits
        })

        wx.hideLoading();
      },
      fail: err => {

      }
    })
  },

  //此方法用于获取已经完成的任务（学习和运动)
  getMissions: function () {

    //初始化数组
    var newArray = [];
    this.setData({
      finishMissions: newArray
    })
    this.queryMission("exercise");
    this.queryMission("study");

  },

  //此方法用于接收一个表名，查询运动或者学习的记录，都添加到finishMissions数组中
  queryMission: function (cname) {
    const db = wx.cloud.database();
    db.collection(cname).where({
      _openid: app.globalData.openid
    }).get({
      success: res => {
        console.log("成功读取完成的任务 ");

        for (var i = 0; i < res.data.length; i++) {
          var time = res.data[i].time;
          var h = 0;
          var m = 0;
          var s = 0;
          if (time < 60) {
            h = 0;
            m = 0;
            s = time;
          } else if (time > 60 && time < 3600) {
            h = 0;
            m = parseInt(time / 60);
            s = time - m * 60;
          } else {
            h = parseInt(time / 3600);
            m = parseInt((time - h * 3600) / 60);
            s = time - h * 3600 - m * 60;
          }
          // console.log(h+":"+m+":"+s);
          var obj = {
            event: res.data[i].event,
            time: res.data[i].time,
            finishtime: res.data[i].finishtime,
            hour: h,
            minute: m,
            second: s
          }
          // console.log(obj);
          this.data.finishMissions.push(obj);

        }
        this.setData({
          finishMissions: this.data.finishMissions
        })

      },
      fail: err => {

      }
    })
  },

  //用于插入一条习惯数据
  insert_habit: function () {
    const db = wx.cloud.database();
    db.collection("habits_finish").add({
      data: {
        _openid: app.globalData.openid,
        hname: "读一会书",
        days: 20,
        index: 2,
        color: 5,
        remark: "读呀读",
        finish_time: new Date(),
        imageUrl: 'https://7465-test1-f7f051-1255569511.tcb.qcloud.la/hobit_icon/学习蓝色.png?sign=6ae2057ed3d4ad1b2e2f623a8001ff40&t=1554517287'
      },
      success: res => {
        console.log("成功插入一条习惯");
      },
      fail: err => {

      }
    })
  },

  //此方法用于选中某个完成习惯的图标后显示更多信息
  chooseFinishHabits: function (e) {
    var obj = e.currentTarget.id;
    // console.log(this.data.finishHabits[obj].hname);
    wx.showModal({
      title: this.data.finishHabits[obj].hname,
      content: '养成时长:' + this.data.finishHabits[obj].days + '天\r\n备注:' + this.data.finishHabits[obj].remark,
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          // console.log('用户点击确定')
        }
      }
    });
  },

  //此方法用于选中某个完成的任务显示更多信息
  chooseFinishMission: function (e) {
    var obj = e.currentTarget.id;
    // console.log(this.data.finishHabits[obj].hname);
    wx.showModal({
      title: this.data.finishMissions[obj].event,
      content: '完成时间:' + this.data.finishMissions[obj].finishtime,
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          // console.log('用户点击确定')
        }
      }
    });
  }
})