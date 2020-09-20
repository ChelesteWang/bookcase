// pages/book/add/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: "",
    name: '',
    author: '',
    pagecount: '',
    plan: '',
    fileIDs:'cloud://bookcase-srxkw.626f-bookcase-srxkw-1302883065/BOOK.png'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getName: function (e) {
    this.setData({
      name: e.detail
    })
  },
  getAuthor: function (e) {
    this.setData({
      author: e.detail
    })
  },
  getPage: function (e) {
    this.setData({
      pagecount: e.detail
    })
  },
  getPlan: function (e) {
    this.setData({
      plan: e.detail
    })
  },
  updateImage: function () {
    let promiseArr = [];
    for (let i = 0; i < 1; i++) {
      promiseArr.push(new Promise((resolve, reject) => {
        let item = this.data.images;
        let suffix = /\.\w+$/.exec(item)[0];
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + suffix,
          filePath: item,
          success: res => {
            this.setData({
              fileIDs: res.fileID
            });
            console.log(res.fileID)
          }
        })
      }))
    }
  },
  add: function (e) {
    this.saveToDiaryServer()
  },

  saveToDiaryServer: function (event) {
    var that = this;
    that.updateImage()
    wx.showLoading({
      title: '图片上传中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 500)
    setTimeout(() => {
      wx.showModal({
        title: "提示",
        content: "是否添加当前图书",
        success(res) {
          if (res.confirm) {
            console.log("用户点击成功");
            const db = wx.cloud.database();
            if(that.data.fileIDs==null){
              that.data.fileIDs = "cloud://bookcase-srxkw.626f-bookcase-srxkw-1302883065/BOOK.png"
            }
            db.collection("book").add({
              data: {
                name: that.data.name,
                author: that.data.author,
                pagecount: that.data.pagecount,
                plan: that.data.plan,
                url:that.data.fileIDs,
                schdule:0
              },
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
            });
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        },
      });
    }, 500);
  },

  chooseImage: function (e) {
    var index = e.currentTarget.dataset.index;
    var count = 1;
    var that = this;
    wx.chooseImage({
      count: count,
      success(res) {
        var tempFilePaths = res.tempFilePaths;
        var images = that.data.images;
        for (var i in tempFilePaths) {
          if (images.length < 1)
            that.data.images = tempFilePaths[i];
        }
        that.setData({
          images: that.data.images,
        }, () => {
          console.log(that.data.images)
        });

      },
    });
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