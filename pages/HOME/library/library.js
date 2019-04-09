// miniprogram/pages/library/library.js
const util = require('../../../utils/util.js')
const app = getApp();

// 时钟的角度
const initDegree = {
  left: 45,
  right: -45
}

Page({
  data: {
    hour: 0,
    min: 1,
    sec: 0,
    remainTimeText: '',
    isRunning: false,
    isBreaking: false,
    completed: false,
    log: {},
    leftDegree: initDegree.left,
    rightDegree: initDegree.right,
    event: "RUNNING",
    time: 60,
    type: 1
  },

  onLoad: function (option) {
    console.log(option.event + "  " + option.time);
    let H = Math.floor(option.time / (60 * 60)) % 24;
    let M = Math.floor(option.time / (60)) % 60;
    let S = Math.floor(option.time) % 60;
    let workHour = util.tomatoClockFormatTime(H, 'HH');
    let workMin = util.tomatoClockFormatTime(M, 'MM');
    let workSec = util.tomatoClockFormatTime(S, 'SS');
    console.log("OnLoad --- | " + workHour + ":" + workMin + ":" + workSec);
    this.setData({
      remainTimeText: (workHour === "00" ? "" : (workHour + ":")) + workMin + ":" + workSec,
      hour: H,
      min: M,
      sec: S,
      event: option.event,
      type: option.type,
      time: option.time
    })
  },

  onHide: function () {
    console.log("OnHide");
    this.stopTimer();
  },

  onUnload: function () {
    console.log("OnUnLoad");
    this.stopTimer();
    wx.reLaunch({
      url: '../home/home',
    })
  },

  // 开始按钮响应函数 
  startTimer: function (e) {
    let startTime = Date.now();
    let isRunning = this.data.isRunning;
    let completed = this.data.completed;

    if (this.data.hour === 0 && this.data.min === 0 && this.data.sec === 0) {
      wx.showToast({
        title: '请设置时间后再开始计时~',
        icon: 'none',
        duration: 1500
      })
      return;
    }

    if (!isRunning) { // 当时钟不处于运行状态
      this.timer = setInterval((() => {
        this.updateTimer();
        this.startNameAnimation();
      }).bind(this), 1000);
    } else { // 当时钟正在运行
      this.stopTimer();
      if (completed) { // 如果已经完成，点击的则是完成按钮，则返回首页
        wx.reLaunch({
          url: '../home/home',
        });
      }
    }

    let keepTime = (this.data.hour * 3600 + this.data.min * 60 + this.data.sec) * 1000;
    // console.log("StartTimer --- | " + this.data.remainTimeText);

    this.setData({
      isRunning: !isRunning,
      completed: false
    });

    // 每次按按钮才进行
    this.data.log = {
      startTime: startTime,
      keepTime: keepTime,
      remainingTime: keepTime,
      endTime: keepTime + startTime,
      progressStep: 180 * (1000) / (keepTime / 2)
    };
  },

  // 重置计时器
  stopTimer: function () {
    // 重设时间
    let workHour = util.tomatoClockFormatTime(this.data.hour, 'HH');
    let workMin = util.tomatoClockFormatTime(this.data.min, 'MM');
    let workSec = util.tomatoClockFormatTime(this.data.sec, 'SS');
    // 重设进度条
    this.setData({
      leftDegree: initDegree.left,
      rightDegree: initDegree.right,
      remainTimeText: (workHour === "00" ? "" : (workHour + ":")) + workMin + ":" + workSec,
    });
    // 清除计时器
    this.timer && clearInterval(this.timer);
  },

  // 更新时间进度
  updateTimer: function () {
    let log = this.data.log;
    let now = Date.now();
    let remainingTime = Math.round((log.endTime - now) / 1000);

    let HH = util.tomatoClockFormatTime(Math.floor(remainingTime / (60 * 60)) % 24, 'HH');
    let MM = util.tomatoClockFormatTime(Math.floor(remainingTime / (60)) % 60, 'MM');
    let SS = util.tomatoClockFormatTime(Math.floor(remainingTime) % 60, 'SS');

    // 更新时间显示文字
    if (remainingTime > 0) {
      let remainTimeText = (HH === "00" ? "" : (HH + ":")) + MM + ":" + SS;

      this.data.log.remainingTime = remainingTime * 1000;

      this.setData({
        remainTimeText: remainTimeText
      });

    } else if (remainingTime == 0) {
      this.setData({
        completed: true
      });
      this.stopTimer();
      console.log('计时完成');

      var t;
      //将记录上传到数据库

      if (this.data.type == 1) {
        console.log("Library.js", "sport-type");
        t = "exercise";
      }
      else {
        console.log("Library.js", "study-type");
        t = "study";
      }
      const db = wx.cloud.database();
      db.collection(t).add({
        data: {
          // openid: app.globalData.openid,
          event: this.data.event,
          finishtime: new Date(),
          time: this.data.time
        },
        success: res => {
          console.log("Library.js", "任务完成，插入成功")
          wx.showToast({
            title: '任务完成',
          })
        }
      })
      return;
    }

    // 更新时间进度条
    let halfTime = log.keepTime / 2;
    if ((remainingTime * 1000) > halfTime) {
      this.setData({
        leftDegree: this.data.leftDegree - log.progressStep
      });
      
    } else {
      this.setData({
        leftDegree: -135,
        rightDegree: this.data.rightDegree - log.progressStep
      });
    }
  },

  // 暂停计时器
  breakTimer: function() {
    // 重新启动或者执行暂停
    if (this.data.isBreaking) { // 正处于暂停状态
      // 取消暂停状态
      this.setData({
        isBreaking: false
      });

      this.data.log.startTime = Date.now();
      this.data.log.endTime = this.data.log.startTime + this.data.log.remainingTime;

      this.timer = setInterval((() => {
        this.updateTimer();
        this.startNameAnimation();
      }).bind(this), 1000);
    } else { // 正处于运行状态
      // 设定暂停状态
      this.setData({
        isBreaking: true
      });
      // 清除异步计时器
      this.timer && clearInterval(this.timer);
    }
  },

  // 启动动画
  startNameAnimation: function () {
    let animation = wx.createAnimation({
      duration: 450 // 持续时间
    });
    animation.opacity(0.2).step(); // 调整透明度
    animation.opacity(1).step();
    this.setData({
      startNameAnimation: animation.export() // 导出动画队列
    })
  }
})