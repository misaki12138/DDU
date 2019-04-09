// pages/all/all.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 10,
    imageurl1: "https://7465-test1-f7f051-1255569511.tcb.qcloud.la/hobit_icon/运动粉色.png?sign=f1dd1e305fb9fb6d6f550c76f1bf0e37&t=1554468053"
  },
  changeTabbar(e) {
    this.setData({ index: e.currentTarget.dataset.id })
  },/*动态设置进度条*/

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

  }
})