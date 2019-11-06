import {
    PastDetails
} from '../../models/api/pastDetails.js'
let ajax = new PastDetails()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        ispopup:false,
        datainfo:{},
        dataList:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getData(options.id)
    },
    getData(id){
        var data = {
            user_id: wx.getStorageSync('userid'),
            solution_id: id,
            page: 1,
            page_size: 10
        }
        ajax.getData(data).then(res => {
            var arr = res.data.list
            for(var i=0;i<arr.length;i++){
                arr[i].content = arr[i].content.replace(/\<img/gi, '<img class="rich-img" ')
                arr[i].content = arr[i].content.replace(/\<p/gi, '<P class="rich-p" ')
                arr[i].content = arr[i].content.replace(/\<div/gi, '<P class="rich-p" ')
            }
            this.setData({
                dataList:arr,
                datainfo: res.data,
            })
        })
    },
    getnew() {
        this.setData({
            ispopup: true
        })
    },
    cancel() {
        this.setData({
            ispopup: false
        })
    },
    getcatalog(){
        wx.navigateTo({
            url: '/pages/realtime/catalog/catalog',
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