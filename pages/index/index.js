import {
    IndexModel
} from '../../models/api/index.js'

let ajax = new IndexModel()
import {
    Login
} from '../../models/api/login.js'
let ajaxLofin = new Login()
import {
    Shares
} from '../../models/api/shares.js'
let ajaxShares = new Shares()
let interval1, interval2;
var app = getApp();     // 取得全局App
Page({

    /**
     * 页面的初始数据
     */
    data: {
        datainfo:{},
        newSolution:{},
        imgUrls: [{
            url: '../../images/bg01.png'
        }, {
                url: '../../images/bgpin.png'
            }],
        color:'#fff',        
        text: '这是一条公告', //滚动文字
        duration: 0, //水平滚动方法一中文字滚动总时间
        pace: 1, //滚动速度
        posLeft1: 0, //水平滚动方法二中left值
        posLeft2: 0, //水平滚动方法三中left值
        marginLeft: 60, //水平滚动方法三中两条文本之间的间距
        ispopup:false,
        ispopup2:false,
        isload:false,
        pastSolution:[]
    },
    myData: {
        code:'',
        page: 0,
        list: [],
        address: '',
        order: {
            phone: '',
            name: '',
            time: '',
            address: ''
        },
        operate: '',
        pastSolution:[],
        is_share:2,
        prent_id:''
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        if (options.share == undefined || options.share == 'undefined'){
            this.is_share = 2
        }else{
            this.is_share = 1
        }
        this.getData()
        this.getNewSolution()
        this.getPastSolution()
//      wx.showShareMenu({
//          withShareTicket: true
//      })
        
        if (wx.getStorageSync('userid') == undefined || wx.getStorageSync('userid') == 'undefined' || wx.getStorageSync('userid') == '') {
            wx.hideTabBar()
            this.setData({
                isload: true
            })
            wx.login({
                success: res => {
                    this.myData.code = res.code
                    // 发送 res.code 到后台换取 openId, sessionKey, unionId
                }
            })
        } else {
            this.setData({
                isload: false
            })
        }
        if (options.prentid == undefined || options.prentid == 'undefined'){
            
        }else{
            this.myData.prent_id == options.prentid
        }
    },
    
    getData(){
        ajax.getData().then(res => {
            this.setData({
                datainfo: res.data,
            })
        })
    },
    getNewSolution(){
        ajax.getNewSolution().then(res => {
            this.setData({
                newSolution: res.data,
            })
        })
    },
    getPastSolution(){
        this.myData.page = this.myData.page+1
        var data = {
            page:this.myData.page,
            page_size:10
        }
        ajax.getPastSolution(data).then(res => {
            this.myData.pastSolution.push.apply(this.myData.pastSolution, res.data.list)
            this.setData({
                pastSolution: this.myData.pastSolution,
            })
        })
    },
    goShoping(e) {
        var id = e.currentTarget.dataset.index
        wx.navigateTo({
            url: '/pages/shop/index?id=' + this.myData.list[id].id
        })
    },
    getshares() {
        wx.navigateTo({
            url: '/pages/shares/shares'
        })
    },
   
    getGroup() {
        wx.navigateTo({
            url: '/pages/group/group'
        })
    },
    getrealtime() {
        wx.navigateTo({
            url: '/pages/realtime/realtime?id=' + this.data.newSolution.id
        })
    },
    addForm(e) {

        if (e.currentTarget.dataset.index == 0) {
            wx.navigateTo({
                url: '/pages/famouTeach/famouTeach'
            })
        }
        if (e.currentTarget.dataset.index == 1) {
            wx.navigateTo({
                url: '/pages/driedfood/driedfood'
            })
        }
        if (e.currentTarget.dataset.index == 2) {
            wx.navigateTo({
                url: '/pages/assemble/assemble'
            })
        }
    },
    getCheckin(){
        ajax.checkIn().then(res => {
           if(res.data){
               this.setData({
                   ispopup:true
               })
           }
        })
    },
    
    cancel() {
        this.setData({
            ispopup: false,
            ispopup2: false
        })
    },
    getbanner(e){
        wx.navigateTo({
            url: '/pages/bannerInfo/bannerInfo?id=' + this.data.datainfo.bannerList[e.currentTarget.dataset.index].id,
        })
    },
    getlistinfo(e){
        // wx.navigateTo({
        //     url: '/pages/bannerInfo/bannerInfo?id=' + this.data.pastSolution[e.currentTarget.dataset.index].id,
        // })
        wx.navigateTo({
            url: '/pages/bannerInfo/bannerInfo?id=' + this.data.pastSolution[e.currentTarget.dataset.index].id
        })
    },
    getPhoneNumber(e) {//获取手机号
        console.log(e.detail.errMsg)
        console.log(e.detail.iv)
        console.log(e.detail.encryptedData)
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },
    roll1: function (that, txtLength, windowWidth) {
        interval1 = setInterval(function () {
            if (that.data.posLeft1 < txtLength) {
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
   
    
    onShow: function() {
        let that = this;
        let windowWidth = wx.getSystemInfoSync().windowWidth; //屏幕宽度
        

        wx.createSelectorQuery().select('#txt2').boundingClientRect(function(rect) {
            let txtLength = rect.width; //滚动文字长度
            that.roll1(that, txtLength, windowWidth);
        }).exec()

       
    },
    onHide: function() {
        clearInterval(interval1);
    },
    preventTouchMove() { 
        //防止滚动穿透
    },
    onGotUserInfo(e) {
        var data = {
            encrypted_data: e.detail.encryptedData,
            iv: e.detail.iv,
        }
        this.getOpenId(data)
    },
    getOpenId(info) {
        var data = {
            code: this.myData.code
        }
        var self = this
        ajaxLofin.getOpenId(data).then(res => {
            self.loading(info, res.data.session_key)
        })
    },
    loading(data, key) {
        var data = {
            session_key: key,
            encrypted_data: data.encrypted_data,
            iv: data.iv,
            is_share: this.myData.is_share,
            prent_id: this.myData.prent_id
        }
        var self = this
        ajaxLofin.login(data).then(res => {
            if (res.code == 1) {
                wx.showToast({
                    title: '登录成功',
                    icon: 'success',
                    duration: 2000
                })
                wx.showTabBar()
                self.setData({
                    isload: false
                })
                wx.setStorageSync('userid', res.data.user_info.user_id)
                wx.setStorageSync('token', res.data.user_info.token)
                wx.setStorageSync('userInfo', res.data.user_info)
            }else{
                wx.lin.showToast({
                    title: res.msg,
                    icon: 'error',
                    iconStyle: 'color:red; size: 60',
                    success: (res) => {
                    },
                    complete: (res) => {
                    }
                })
            }
        })
    },
    getShares(){
        ajaxShares.userForward().then(res => {
            
        })
    },
    /**
     * 生命周期函数--监听页面隐藏
     */


    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        this.getPastSolution()
        // if (!this.data.nodata) {
        // 	this.getList()
        // }
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

    /**
     * 自定义函数
     */
   
    
})