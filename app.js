//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    };

    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (!res.authSetting['scope.userInfo']) { // 未授权
    //       wx.showModal({
    //         title: '提示',
    //         content: '需要微信用户登录哟~',
    //         success: res => {
    //           if (res.confirm) { // 用户点击了确定按钮
    //             wx.authorize({
    //               scope: 'scope.userInfo',
    //             });
    //           }

    //           // 拥有权限之后调用云函数获取openid
    //           wx.cloud.callFunction({
    //             name: 'login',
    //             data: {},
    //             success: res => {
    //               console.log(res);
    //               console.log('App.js', res.result.openid)
    //               this.globalData.openid = res.result.openid;
    //             },
    //           });
    //         },
    //         fail: err => {
    //           console.log("-------------------------------------")
    //           console.log(err);
    //           console.log("-------------------------------------")
    //         }
    //       });
    //     }
    //     else { // 已授权
    //       // 拥有权限之后调用云函数获取openid
    //       wx.cloud.callFunction({
    //         name: 'login',
    //         data: {},
    //         success: res => {
    //           console.log(res);
    //           console.log('App.js', res.result.openid)
    //           this.globalData.openid = res.result.openid;
    //         },
    //         fail: err => {
    //           console.log("-------------------------------------")
    //           console.log(err);
    //           console.log("-------------------------------------")
    //         }
    //       });
    //     }
    //   }
    // });

    this.globalData = {
      create_new_habit: false
    }
  }

})
