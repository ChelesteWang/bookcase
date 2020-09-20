// pages/book/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: "",
    name: "暂无",
    author: "暂无",


    PageCount: 0,
    progress: 1,

  },

  navigateToContinue: function (event) {
    wx.navigateTo({
      url: '../continue/index?id=' + event.currentTarget.dataset.id
    })
  },
  navigateToUpdate: function (event) {
    wx.navigateTo({
      url: '../update/index?id=' + event.currentTarget.dataset.id
    })
  },
  delete: function () {
    var that=this
    wx.showModal({
      title: "提示",
      content: "是否删除当前图书",
      success(res) {
        if (res.confirm) {
          console.log("用户点击成功");
          const db = wx.cloud.database();
          db.collection('book').where({
            _id: that.data._id
          }).remove({
            success: function () {
              // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
              console.log(res);
              wx.showToast({
                title: "发送成功",
                icon: "success",
                duration: 2000,
              });
              setTimeout(function () {
                wx.navigateTo({
                  url: '../../index/index',
                })
              }, 500);
            },
            fail: function (res) {
              wx.showToast({
                title: "发送失败",
                icon: "fail",
                duration: 2000,
              });
            },
          })

        } else if (res.cancel) {
          console.log("用户点击取消");
        }
      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      _id: options.id
    })
    const db = wx.cloud.database();
    db.collection('book').where({
      _id: options.id
    }).get({
      success(res) {
        var schdule = parseFloat(res.data[0].schdule / res.data[0].pagecount)
        that.setData({
          book: res.data[0],
          schdule: schdule
        }, )
      }
    })

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