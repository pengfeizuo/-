import {
    PastDetails
} from '../../../models/api/pastDetails.js'
let ajax = new PastDetails()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        datalist:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getData()
    },
    getData() {
        var data = {
            page: 1,
            page_size: 10
        }
        ajax.getPastList(data).then(res => {
            this.setData({
                datalist: res.data.list,
            })
        })
    },
    getInfo(e){
        wx.navigateTo({
            url: '/pages/realtime/realtime?id=' + this.data.datalist[e.currentTarget.dataset.index].id
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