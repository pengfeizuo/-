// pages/gongg/gongg.js
let interval1, interval2;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        text: '这是一行文字水平滚动效果，在小程序中实现的', //滚动文字
        duration: 0, //水平滚动方法一中文字滚动总时间
        pace: 2,  //滚动速度
        posLeft1: 0,  //水平滚动方法二中left值
        posLeft2: 0,  //水平滚动方法三中left值
        marginLeft: 60   //水平滚动方法三中两条文本之间的间距
    },

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
    roll1: function (that, txtLength, windowWidth) {
        interval1 = setInterval(function () {
            if (-that.data.posLeft1 < txtLength) {
                that.setData({
                    posLeft1: that.data.posLeft1 - that.data.pace
                })
            } else {
                that.setData({
                    posLeft1: windowWidth
                })
            }
        }, 20)
    },
    roll2: function (that, txtLength, windowWidth) {
        interval2 = setInterval(function () {
            if (-that.data.posLeft2 < txtLength + that.data.marginLeft) {
                that.setData({
                    posLeft2: that.data.posLeft2 - that.data.pace
                })
            } else { // 第二段文字滚动到左边后重新滚动
                that.setData({
                    posLeft2: 0
                })
                clearInterval(interval2);
                that.roll2(that, txtLength, windowWidth);
            }
        }, 20)
    },
    onShow: function () {
        let that = this;
        let windowWidth = wx.getSystemInfoSync().windowWidth; //屏幕宽度
        wx.createSelectorQuery().select('#txt1').boundingClientRect(function (rect) {
            let duration = rect.width * 0.03;//滚动文字时间,滚动速度为0.03s/px
            that.setData({
                duration: duration
            })
        }).exec()

        wx.createSelectorQuery().select('#txt2').boundingClientRect(function (rect) {
            let txtLength = rect.width;//滚动文字长度
            that.roll1(that, txtLength, windowWidth);
        }).exec()

        wx.createSelectorQuery().select('#txt3').boundingClientRect(function (rect) {
            let txtLength = rect.width;//文字+图标长度
            that.setData({
                marginLeft: txtLength < windowWidth - that.data.marginLeft ? windowWidth - txtLength : that.data.marginLeft
            })
            that.roll2(that, txtLength, windowWidth);
        }).exec()
    },
    onHide: function () {
        clearInterval(interval1);
        clearInterval(interval2);
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