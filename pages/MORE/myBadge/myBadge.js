// pages/mybadge/mybadge.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl: 'https://7465-test1-f7f051-1255569511.tcb.qcloud.la/huizhang/1.png?sign=7a503f6250489057a568259805948206&t=1554477309',
    backgroundUrl: 'https://7465-test1-f7f051-1255569511.tcb.qcloud.la/huizhang/徽章背景.png?sign=cb41f5efb8d36157d3f7170fb5ec3cb6&t=1554468443',
    unown1: 'https://7465-test1-f7f051-1255569511.tcb.qcloud.la/huizhang/1灰.png?sign=8e7e157eab42c08ac0b19c4d1b27bffb&t=1554477220',
    unown2: 'https://7465-test1-f7f051-1255569511.tcb.qcloud.la/huizhang/2灰.png?sign=23a94e4f561721d2fc5c89e9c3e5bbde&t=1554477232',
    unown3: 'https://7465-test1-f7f051-1255569511.tcb.qcloud.la/huizhang/3灰.png?sign=8f97817fdf5abc70d0409087a990b3ee&t=1554477241',
    unown4: 'https://7465-test1-f7f051-1255569511.tcb.qcloud.la/huizhang/4灰.png?sign=634a6cbe3108641f62393c4b74442384&t=1554477251',
    unown5: 'https://7465-test1-f7f051-1255569511.tcb.qcloud.la/huizhang/5灰.png?sign=3a0ff7a74c02bc4934e660dcc635701c&t=1554477261',
    unown6: 'https://7465-test1-f7f051-1255569511.tcb.qcloud.la/huizhang/5灰.png?sign=3a0ff7a74c02bc4934e660dcc635701c&t=1554477261',
    own1: 'https://7465-test1-f7f051-1255569511.tcb.qcloud.la/huizhang/1.png?sign=b7b912b3020844724dfee554c4f9bcb3&t=1554479466',
    own2: 'https://7465-test1-f7f051-1255569511.tcb.qcloud.la/huizhang/2.png?sign=3594b0977f641ce027da3ee31670bda8&t=1554479485',
    own3: 'https://7465-test1-f7f051-1255569511.tcb.qcloud.la/huizhang/3.png?sign=a3fdb7163df4f8515ef91352ce7f7461&t=1554479500',
    own4: 'https://7465-test1-f7f051-1255569511.tcb.qcloud.la/huizhang/4.png?sign=a05455049345b48eee5935eabca63986&t=1554479517',
    own5: 'https://7465-test1-f7f051-1255569511.tcb.qcloud.la/huizhang/5.png?sign=5a03842a90feaa0512606c73ad717c14&t=1554479530',
    own6: 'https://7465-test1-f7f051-1255569511.tcb.qcloud.la/huizhang/5.png?sign=5a03842a90feaa0512606c73ad717c14&t=1554479530',

    first: false,
    second: false,
    third: false,
    forth: false,
    fifth: false,
    sixth: false,
    avatarUrl: '',
    nickname: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      avatarUrl: options.userurl,
      nickname: options.nickname
    });
    wx.showLoading({
      title: '正在载入',
    })
    this.getBadgesIndex();

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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //此方法用于获取用户有多少个徽章
  getBadgesIndex: function () {
    const db = wx.cloud.database();
    db.collection("badges").where({
      _openid: app.globalData.openid,
    }).get({
      success: res => {
        if (res.data.length == 0) {
          console.log("没有一条记录")
        }
        else {
          var obj = res.data[0]; //取出第一条记录
          this.setData({
            first: obj.first,
            second: obj.second,
            third: obj.third,
            forth: obj.forth,
            fifth: obj.fifth,
            sixth: obj.sixth,
          });
        }

        wx.hideLoading();

      },
      fail: err => {
        wx.hideLoading();
        console.log("没有记录")
      }
    })
  },

  //此方法用于创建一条绑定用户的徽章拥有记录
  insertIndex: function () {
    const db = wx.cloud.database();
    db.collection("badges").add({
      data: {
        _openid: app.globalData.openid,
        first: false,
        second: false,
        third: false,
        forth: false,
        fifth: false,
        sixth: false
      },
      success: res => {
        console.log("我插入了一条徽章记录呀")
      },
      fail: err => {

      }
    })
  },

  //此方法用于判断用户是否已经创建过徽章拥有记录
  checkhadIndex: function () {

  }
})