//index.js
const app = getApp();

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    myBadgeUrl: 'https://7465-test1-f7f051-1255569511.tcb.qcloud.la/icongrey/trophy.png?sign=4891c2a3aadba1515e7cc381d627c0f5&t=1554539492',
    myRecordUrl: 'https://7465-test1-f7f051-1255569511.tcb.qcloud.la/icongrey/activity.png?sign=614c0a0694a9e7e51815d20c0844f54e&t=1554539519',
    myStatisticsUrl: 'https://7465-test1-f7f051-1255569511.tcb.qcloud.la/icongrey/linechart.png?sign=d203c94ebcd85f0dd21420bddc21f3c8&t=1554539362',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  onLoad: function () {
    wx.showLoading({
      title: '正在载入...',
    });

    if (!wx.cloud) {
      wx.redirectTo({
        url: '../../_DEFAULT/chooseLib/chooseLib',
      })
      return;
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              });
              this.onGetOpenid();
              wx.hideLoading();
            }
          });
        }
      }
    })
  },

  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log(res);
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid;
      },
    })
  },

  // 获取微信步数
  getWeRunSteps: function () {
    wx.getSetting({ // 查看是否授权
      success: res => {
        //console.log(res);
        if (!res.authSetting['scope.werun']) { // 未授权
          wx.showModal({
            title: '提示',
            content: '获取微信运动步数，需要允许计步权限',
            success: res => {
              if (res.confirm) { // 用户点击了确定按钮
                wx.authorize({
                  scope: 'scope.werun',
                });
              }
            }
          });
        }
        else { // 已授权
          wx.login({ // 首先通过login获得的code获取本次会话的session_key
            success: res => {
              let appid = app.globalData.appid;
              let secret = app.globalData.secret;
              if (res.code) { // 如果返回的code不是空值
                wx.getWeRunData({ // 获取微信步数的非解密数据
                  success: res => {
                    this.setData({
                      encryptedData: res.encryptedData,
                      iv: res.iv
                    });
                  }
                });

                wx.cloud.callFunction({ // 调用云函数获取session_key和解密微信步数
                  name: 'werun',
                  data: {
                    appid: appid,
                    secret: secret,
                    js_code: res.code,
                    encryptedData: this.data.encryptedData,
                    iv: this.data.iv
                  },
                  success: res => {
                    console.log("以下是用户的微信步数：")
                    console.log(res);
                    this.setData({ // 存储数据
                      werunStepsArray: res.result.stepInfoList
                    });
                  }
                });
              }
            }
          });
        }
      }
    });
  },

  //跳转到我的记录页面
  show_myrecord: function () {
    wx.navigateTo({
      url: '../myRecord/myRecord',
    })
  },

  //跳转到我的徽章页面
  show_mybadge: function () {
    wx.navigateTo({
      url: '../myBadge/myBadge?userurl=' + this.data.avatarUrl + '&nickname=' + this.data.userInfo.nickName,
    })
  },

  //跳转到统计页面
  show_mystatistics: function () {
    wx.navigateTo({
      url: '../myStatistics/myStatistics',
    })
  }

})
