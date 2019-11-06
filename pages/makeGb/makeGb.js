import {
    MakeGb
} from '../../models/api/makeGb.js'
let ajax = new MakeGb()
import {
    IndexModel
} from '../../models/api/index.js'
let ajaxCheckin = new IndexModel()
import {
    Shares
} from '../../models/api/shares.js'
let ajaxShares = new Shares()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        ispopup:false,
        ispopup2: false,
        datalist:[],
        yaolist:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getData()
        this.getcurrencyList()
    },
    getcurrencyList(){
        ajax.getcurrencyList().then(res => {
            this.setData({
                yaolist: res.data
            })
        })
    },
    getData() {
        var data = {
            user_id: wx.getStorageSync("userid")
        }
        ajax.getData(data).then(res => {
            this.setData({
                datalist: res.data
            })
        })
    },
    cancel(){
        this.setData({
            ispopup: false,
        })
    },
    yaoqing(){
        this.setData({
            ispopup2: true,
        })
    },
    getGb(e){
        var index = e.currentTarget.dataset.index
        if(index==0){
            this.getCheckin()
        }
        if(index==2){
            this.setData({
                ispopup2:true
            })
        }
    },
    getGbok(){
        var data = {
            user_id: wx.getStorageSync("userid"),
            num: '5',
            list_id: this.data.datalist[1].id,
            identi: 'forward'
        }
        ajax.getReceive(data).then(res => {
            wx.showToast({
                title: '领取成功',
                icon: 'success',
                duration: 2000
            })
            this.getData()
        })
    },
    getReceive(){
        var data = {
            user_id: wx.getStorageSync("userid"),
            num: '500',
            list_id: this.data.datalist[2].id,
            identi: 'invitation'
        }
        ajax.getReceive(data).then(res => {
            wx.showToast({
                title: '领取成功',
                icon: 'success',
                duration: 2000
            })
            this.getcurrencyList()()
        })
    },
    getCheckin() {
        var self = this
        ajaxCheckin.checkIn().then(res => {
            if (res.data) {
                self.getData()
                self.setData({
                    ispopup: true
                })
            }
        })
    },
    getShares() {
        ajaxShares.userForward().then(res => {

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
    onShareAppMessage: function (res) {
        this.getShares()
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        } else {
            console.log(2)
        }
        return {
            title: '股顺宝',
            path: '/pages/index/index?prentid=' + wx.getStorageSync("userid"),
            imageUrl: '',
            success: function (res) {
                console.log('转发')
                
            }
        }
    },
})