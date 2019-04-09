// component/popup/popup.js
Component({
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '选择类别'
    },
    btn_study: {
      type: String,
      value: '学习'
    },
    btn_sport: {
      type: String,
      value: '运动'
    },
    btn_cancel: {
      type: String,
      value: '取消'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    flag: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hidePopup: function () {
      this.setData({
        flag: !this.data.flag
      })
    },
    showPopup() {
      this.setData({
        flag: !this.data.flag
      })
    },
    _error() {
      this.triggerEvent("error")
    },
    _success() {
      this.tryggerEvent("success");
    },
    btnsport() {
      wx.navigateTo({
        url: '../create_sport_event/create_sport_event',
      })
    },
    btnstudy() {
      wx.navigateTo({
        url: '../create_study_event/create_study_event',
      })
    },
  }
})
