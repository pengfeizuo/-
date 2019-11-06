import {
    Assemble
} from '../../models/api/assemble.js'
let ajax = new Assemble()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        color: ['#000','#282B30'],
        model:0,
        dataList:{},
        dataList2:{},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getData()
        this.getmyAssemble()
    },
    getData(){
        var data = {
            user_id: wx.getStorageSync('userid'),
            page: 1,
            page_size: 10,
        }
        ajax.getData(data).then(res => {
            this.setData({
                dataList: res.data,
            })
        })
    },
    getmyAssemble(){
        var data = {
            user_id: wx.getStorageSync('userid'),
            page: 1,
            page_size: 10,
        }
        ajax.getmyAssemble(data).then(res => {
            this.setData({
                dataList2: res.data,
            })
        })
    },
    changelist() {
        this.setData({
            model: 0,
            color: ['#000', '#282B30']
        })
    },
    changelist2() {
        this.setData({
            model: 1,
            color: ['#282B30', '#000']
        })
    },
    getinfo(e){
        wx.navigateTo({
            url: '/pages/assemble/assembleInfo/assembleInfo?id=' + this.data.dataList.list[e.currentTarget.dataset.index].assemble_id
        })
    },
    getinfo2(e){
        wx.navigateTo({
            url: '/pages/assemble/assembleInfo/assembleInfo?id=' + this.data.dataList2.list[e.currentTarget.dataset.index].assemble_id
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