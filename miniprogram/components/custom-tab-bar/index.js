// components/custom-tab-bar/index.js
Component({
  properties: {
    current: {
      type: Number,
      value: 0,
    },
  },
  data: {
    selected: 0,
    color: "#666",
    selectedColor: "#E5BA72",
    list: [
      {
        pagePath: "/pages/index/index",
        iconPath: "/static/images/index.png",
        selectedIconPath: "/static/images/index-selected.png",
        text: "首页",
      },
      {
        pagePath: "/pages/video/index",
        iconPath: "/static/images/bussinessIndex.png",
        selectedIconPath: "/static/images/bussinessIndex-selected.png",
        text: "视频",
      },
      {
        pagePath: "/pages/shop/index",
        iconPath: "/static/images/shop.png",
        selectedIconPath: "/static/images/shop-selected.png",
        text: "店铺",
      },
      {
        pagePath: "/pages/mine/index",
        iconPath: "/static/images/mine.png",
        selectedIconPath: "/static/images/mine-selected.png",
        text: "我的",
      },
    ],
  },
  attached() {},
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      wx.switchTab({
        url,
        success(res) {
          console.log("success", res);
        },
        fail(error) {
          console.log("fail", error);
        },
      });
      this.setData({
        selected: data.index,
      });
    },
  },
});
