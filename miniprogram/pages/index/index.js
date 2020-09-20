// miniprogram/pages/index/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bookcase: "一只书匣",
    day: "15",
    minute: "45",
    level: "40%",
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBookList()
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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
    this.getBookList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  // 跳转到图书详情
  navigateToBook: function (event) {
    wx.navigateTo({
      url: "../book/content/index?id=" + event.currentTarget.dataset.id,
      success: function () {
        console.log("跳转成功");
      },
    });
  },
  // 跳转到添加图书页
  navigateToAddBook: function () {
    wx.navigateTo({
      url: "../book/add/index?id=1",
      success: function () {
        console.log("跳转成功");
      },
    });
  },
  getBookList: function () {
    var that = this
    wx.cloud.callFunction({
      name:"login"
    }).then((res)=>{
      console.log(res.result.openid)
      wx.cloud.callFunction({
        name: "getBook",
        data:{
          _openid:res.result.openid
        }
      }).then((res)=>{
        console.log("success")
        console.log(res.result.data)
        that.setData({
          BookList:res.result.data
        })
      })
    })
    
  }
});