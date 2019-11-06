import {
    Login
} from '../../models/api/login.js'
let ajax = new Login()
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    mydata:{
        code:'',
        isload:false
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var self = this
        if (wx.getStorageSync('userid') == undefined || wx.getStorageSync('userid') == 'undefined' || wx.getStorageSync('userid') == ''){
            this.setData({
                isload:false
            })
            wx.login({
                success: res => {
                    self.mydata.code = res.code
                    // 发送 res.code 到后台换取 openId, sessionKey, unionId
                }
            })
        }else{
            this.setData({
                isload: true
            })
        }
        
    },
    onGotUserInfo(e) {
        var data = {
            encrypted_data: e.detail.encryptedData,
            iv: e.detail.iv,
        }
        this.getOpenId(data)
    },
    getOpenId(info){
        var data= {
            code: this.mydata.code
        }
        var self = this
        ajax.getOpenId(data).then(res => {
            self.loading(info, res.data.session_key)
        })
    },
    loading(data,key){
        var data={
            session_key: key,
            encrypted_data: data.encrypted_data,
            iv: data.iv
        }
        var self = this
        ajax.login(data).then(res => {
            if (res.msg =="登录成功"){
                wx.showToast({
                    title: '登录成功',
                    icon: 'success',
                    duration: 2000
                })
                self.setData({
                    isload: true
                })
                wx.setStorageSync('userid', res.data.user_info.user_id)
                wx.setStorageSync('token', res.data.user_info.token)
                wx.setStorageSync('userInfo', res.data.user_info)
            }
        })
    },
    getorder(){
        wx.navigateTo({
            url: '/pages/order/order',
        })
    },
    getaccount(){
        wx.navigateTo({
            url: '/pages/Myaccount/Myaccount',
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