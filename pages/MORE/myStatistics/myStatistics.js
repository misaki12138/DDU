// pages/mystatistics/mystatistics.js
import * as echarts from '../../../component/ec-canvas/echarts.js'
var xList = ["4-2","4-3","4-4","4-5","4-6","4-7","4-8"];
var yList = [5,8,10,6,2,4,7];
var objArray = [];
var Chart = null


Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      lazyLoad: true // 延迟加载
    },

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //绑定样式
    this.echartsComponnet = this.selectComponent('#mychart');

    // this.getSevenHabits();
    //绑定数据
    this.getData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log(this.data.ec.onInit.option)

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  getData: function () {

  	/**
  	 * 此处的操作：
  	 * 获取数据json
  	 */
    // console.log("123");
    // console.log(objArray)
    // xList = [];
    // yList = [];
    // for (var i = objArray.length - 1; i >= 0; i--) {
    //   var date = objArray[i].month + "-" + objArray[i].day;
    //   var count = objArray[i].count;
    //   xList.push(date);
    //   yList.push(count);
    // }
    // console.log(xList);
    // console.log(yList);



    //如果是第一次绘制
    if (!Chart) {
      this.init_echarts(); //初始化图表
    } else {
      this.init_echarts(); //初始化图表
    }
    
  },
  //初始化图表
  init_echarts: function () {
    this.echartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      // Chart.setOption(this.getOption());
      this.setOption(Chart);
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
  },
  setOption: function (Chart) {
    Chart.clear();  // 清除
    Chart.setOption(this.getOption());  //获取新数据
  },
  getOption: function () {
    // 指定图表的配置项和数据
    var colors = ['#5793f3', '#d14a61', '#675bba'];

    var option = {

      //颜色
      color: colors,


    

      legend: {
        data: ['蒸发量', '降水量', '平均温度']
      },
      xAxis: [
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '蒸发量',
          min: 0,
          max: 250,
          position: 'left',
          axisLine: {
            lineStyle: {
              color: colors[0]
            }
          },
          axisLabel: {
            formatter: '{value} ml'
          }
        },

      ],
      series: [
        {
          name: '蒸发量',
          type: 'line',
          data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },

      
      ]
    }
    return option;
  },




  //获取月份的天数
  getCurrentMonthDayNum: function (month) {
    let today = new Date();
    let dayAllThisMonth = 31;
    if (month + 1 != 12) {
      let currentMonthStartDate = new Date(today.getFullYear() + "/" + (month + 1) + "/01"); // 本月1号的日期
      let nextMonthStartDate = new Date(today.getFullYear() + "/" + (month + 2) + "/01"); // 下个月1号的日期
      dayAllThisMonth = (nextMonthStartDate - currentMonthStartDate) / (24 * 3600 * 1000);
    }

    return dayAllThisMonth;
  },
  //获取之前7天的打卡数据
  getSevenHabits: function () {
    const db = wx.cloud.database();
    const _ = db.command;
    var now = new Date();
    var nowday = now.getDate();
    var leftday = 1;
    var leftmonth = now.getMonth();
    //计算上个月有几天
    var lastmonthday = this.getCurrentMonthDayNum(now.getMonth() - 1);

    //计算往前推7天是几月几号
    if (nowday <= 7) {
      leftday = lastmonthday - 7 + nowday;
      leftmonth = leftmonth - 1;
    } else {
      leftday = nowday - 7
    }

    // console.log(leftmonth+" "+leftday+"   "+nowday);
    //构建7天前的日期
    var lefttime = now.getFullYear() + "-" + (leftmonth + 1) + "-" + leftday;
    var leftdate = new Date(lefttime);
    var leftstemp = leftdate.getTime();
    // console.log(leftdate.getTime());

    //使用时间戳进行比较
    db.collection("day_of_habits").where({
      timestemp: _.gt(leftstemp),
    }).get({
      success: res => {
        console.log("成功取到");
        // console.log(res);

        //清空obj数组
        objArray = [];


        //用循环取出7天的数据
        for (var i = 0; i < res.data.length; i++) {
          var obj = {
            count: res.data[i].count,
            month: res.data[i].month + 1,
            day: res.data[i].day
          }
          objArray.push(obj);
        }
        console.log("刚刚处理完")
        console.log(objArray)
        this.getData(); //获取数据
      }
    });

    // console.log(this.getCurrentMonthDayNum(0));  
    // console.log(this.getCurrentMonthDayNum(1));  
    // console.log(this.getCurrentMonthDayNum(2));  
    // console.log(this.getCurrentMonthDayNum(3));  
    // console.log(this.getCurrentMonthDayNum(4));  
    // console.log(this.getCurrentMonthDayNum(5));  
  },

  //插入一条数据
  insert: function () {
    const db = wx.cloud.database();
    var now = new Date();
    var lefttime = 2019 + "-" + 3 + "-" + 29;
    var leftdate = new Date(lefttime);
    var leftstemp = leftdate.getTime();

    db.collection("day_of_habits").add({
      data: {
        count: 0,
        date: leftdate,
        month: leftdate.getMonth(),
        day: leftdate.getDate(),
        timestemp: leftstemp
      },
      success: res => {
        console.log("c成功插入")
      }
    })
  },

  //获取今天打卡记录项目的id
  getTodayLogID: function () {
    const db = wx.cloud.database();
    var now = new Date();
    db.collection("day_of_habits").where({
      _openid: app.globalData.openid,
      month: now.getMonth(),
      day: now.getDate()
    }).get({
      success: res => {
        console.log("成功取出一条今天的打卡项目记录")
        console.log(res);

        db.collection("day_of_habits").doc(res.data[0]._id).update({
          data: {
            count: res.data[0].count + 1
          },
          success: res => {
            console.log("修改数据成功");
          },
          fail: err => {

            console.error('[数据库] [更新记录] 失败：', err)
          }
        })
      }
    })
  }



})