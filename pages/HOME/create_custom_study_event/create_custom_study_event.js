var rpx;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tevent: "Running",
    mission_time_length: '00:01',
    hour: 0,
    min: 1,
    sec: 0,
    ttime: 60
  },
  timetext: function (ctx1) {
    ctx1.setFontSize(30 * rpx);
    ctx1.setShadow(0 * rpx, 0 * rpx, 0 * rpx, '#7a7878');
    ctx1.setFillStyle('#ffffff');
    ctx1.fill();
    ctx1.draw(true);
  },
  round: function (ctx1) {
    ctx1.beginPath();
    ctx1.setFillStyle('#5FBEA6');
    ctx1.setShadow(8 * rpx, 3 * rpx, 3 * rpx, '#DDDDDD');
    ctx1.arc(160 * rpx, 60 * rpx, 30 * rpx, 0 * rpx, Math.PI * 2, true);
    ctx1.fill();
    ctx1.closePath();
    ctx1.draw(true);
  },
  wround: function (ctx2) {
    ctx2.beginPath();
    ctx2.setFillStyle('#f3e527');
    ctx2.arc(40 * rpx, 60 * rpx, 10 * rpx, 0 * rpx, Math.PI * 2, true);
    ctx2.fill();
    ctx2.closePath();
    ctx2.draw(true);
  },
  wround1: function (ctx2) {
    ctx2.beginPath();
    ctx2.setFillStyle('#27c3f3');
    ctx2.setShadow(0 * rpx, 0 * rpx, 0 * rpx, '#DDDDDD');
    ctx2.arc(20 * rpx, 140 * rpx, 10 * rpx, 0 * rpx, Math.PI * 2, true);
    ctx2.fill();
    ctx2.closePath();
    ctx2.draw(true);
  },
  wround2: function (ctx2) {
    ctx2.beginPath();
    ctx2.setFillStyle('#f094b0');
    ctx2.setShadow(0 * rpx, 0 * rpx, 0 * rpx, '#DDDDDD');
    ctx2.arc(270 * rpx, 50 * rpx, 6 * rpx, 0 * rpx, Math.PI * 2, true);
    ctx2.fill();
    ctx2.closePath();
    ctx2.draw(true);
  },
  wround3: function (ctx2) {
    ctx2.beginPath();
    ctx2.setFillStyle('#db0f2a');
    ctx2.setShadow(0 * rpx, 0 * rpx, 0 * rpx, '#DDDDDD');
    ctx2.arc(80 * rpx, 120 * rpx, 6 * rpx, 0 * rpx, Math.PI * 2, true);
    ctx2.fill();
    ctx2.closePath();
    ctx2.draw(true);
  },
  wround4: function (ctx2) {
    ctx2.beginPath();
    ctx2.setStrokeStyle('#ffffff');
    ctx2.setShadow(0 * rpx, 0 * rpx, 0 * rpx, '#DDDDDD');
    ctx2.arc(160 * rpx, 60 * rpx, 25 * rpx, 0 * rpx, Math.PI * 2, true);
    ctx2.stroke(2 * rpx);
    ctx2.closePath();
    ctx2.draw(true);
  },
  wround5: function (ctx2) {
    ctx2.beginPath();
    ctx2.setFillStyle('#FFCE80');
    ctx2.setShadow(0 * rpx, 0 * rpx, 0 * rpx, '#DDDDDD');
    ctx2.arc(280 * rpx, 120 * rpx, 10 * rpx, 0 * rpx, Math.PI * 2, true);
    ctx2.fill();
    ctx2.closePath();
    ctx2.draw(true);
  },
  wround6: function (ctx2) {
    ctx2.beginPath();
    ctx2.setFillStyle('#DDDDDD');
    ctx2.setShadow(0 * rpx, 0 * rpx, 0 * rpx, '#DDDDDD');
    ctx2.arc(200 * rpx, 160 * rpx, 10 * rpx, 0 * rpx, Math.PI * 2, true);
    ctx2.fill();
    ctx2.closePath();
    ctx2.draw(true);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: function (res) {
        rpx = res.windowWidth / 315;
      },
    })
    const ctx = wx.createCanvasContext("mycanvas1");
    this.wround(ctx);
    this.round(ctx);
    this.wround1(ctx);
    this.wround2(ctx);
    this.wround3(ctx);
    this.wround4(ctx);
    this.wround5(ctx);
    this.wround6(ctx);
    this.timetext(ctx);

  },
  
  nameinput: function (e) {
    this.setData({
      tevent: e.detail.value
    })
  },
  
  bindTimeChange: function (e) {
    console.log("How Time Long ? ", e.detail.value + ":00");
    let H = e.detail.value.substr(0, 2);
    let M = e.detail.value.substr(-2);
    this.setData({
      mission_time_length: e.detail.value,
      hour: parseInt(H),
      min: parseInt(M)
    });

    this.setData({
      ttime: this.data.hour * 3600 + this.data.min * 60
    });
  },

  submit: function () {
    wx.navigateTo({
      url: '../library/library?event=' + this.data.tevent + '&time=' + this.data.ttime + '&type=1'
    });
  }
})