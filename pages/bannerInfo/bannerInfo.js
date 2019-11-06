import {
    Dry
} from '../../models/api/dry.js'
let ajax = new Dry()
import {
    Shares
} from '../../models/api/shares.js'
let ajaxShares = new Shares()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        nodes:'',
        datainfo:{},
        time1:'',
        time2:''
    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getData(options.id)
    },
    getData(id) {
        ajax.getInfo(id).then(res => {
            var tiem1 = res.data.update_time.substr(5, 5).replace('-','月')+'日'
            var tiem2 = res.data.update_time.substr(5, 11)
            this.setData({
                datainfo: res.data,
                tiem1: tiem1,
                tiem2: tiem2
            })
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
            path: '/pages/index/index',
            imageUrl: '',
            success: function (res) {
                console.log('转发')
                
            }
        }
    },
})