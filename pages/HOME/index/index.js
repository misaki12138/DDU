const app = getApp()

Page({
  data: {
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imageUrl: "https://7465-test1-f7f051-1255569511.tcb.qcloud.la/bg.png?sign=d1d4f57e05ae4531e491c48317e7d1b2&t=1554560567"
  },

  // 获取用户信息
  getUserInfo: function (e) {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) { // 已经授权
          wx.getUserInfo({
            success: res => {
              app.globalData.userInfo = res.userInfo;
              app.globalData.hasUserInfo = true;
              
              this.setData({
                hasUserInfo: true
              });

              // 调用云函数
              wx.cloud.callFunction({
                name: 'login',
                data: {},
                success: res => {
                  console.log('Index.js [login] user openid: ', res.result.openid)
                  app.globalData.openid = res.result.openid;
                }
              })

              wx.switchTab({
                url: '../home/home'
              });
            }
          });
        }
        else { // 未授权

        }
      }
    });
  }

})
