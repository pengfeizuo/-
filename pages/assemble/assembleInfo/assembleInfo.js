import {
    Assemble
} from '../../../models/api/assemble.js'
let ajax = new Assemble()
import {
    Login
} from '../../../models/api/login.js'
let ajaxLofin = new Login()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        datainfo:{},
        ispopup:false,
        rem_dd:'',
        rem_hh: '',
        rem_mm: '',
        isload: false,
        twoid:''
    },
    myData:{
        userid:'',
        id:'',
        info_id:'',
        twoid:''
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      
        // this.getData(options.id)
        if (wx.getStorageSync('userid') == undefined || wx.getStorageSync('userid') == 'undefined' || wx.getStorageSync('userid') == '') {
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
            this.myData.userid = wx.getStorageSync('userid')
            this.setData({
                isload: false
            })
            
        }
        if (options.twoid == undefined || options.twoid == 'undefined') {
            this.getData(options.id, '')
        } else {
            this.myData.twoid = options.twoid
            this.setData({
                twoid: options.twoid
            })
            this.getData(options.id, options.twoid)
        }
        this.myData.id = options.id
    },
    getData(id,prentid){
        var data = {
            assemble_id: id,
            user_id: this.myData.userid,
            prent_id: prentid
        }
        ajax.getMyAssemble(data).then(res => {
            // var rem_time = 1565975220000
            var timestamp = Date.parse(new Date())/1000;
            console.log(timestamp);//1565875220000
            var ts = res.data.list_title.rem_time - timestamp;//计算剩余的毫秒数
            console.log(ts);
            var dd = parseInt(ts / 60 / 60 / 24, 10);//计算剩余的天数
            var hh = parseInt(ts / 60 / 60 % 24, 10);//计算剩余的小时数
            var mm = parseInt(ts / 60 % 60, 10);//计算剩余的分钟数
            var ss = parseInt(ts % 60, 10);//计算剩余的秒数
            dd = this.checkTime(dd);
            hh = this.checkTime(hh);
            mm = this.checkTime(mm);
            ss = this.checkTime(ss);
            console.log(dd + "天" + hh + "时" + mm + "分" + ss + "秒")
            this.setData({
                datainfo: res.data,
                rem_dd: dd,
                rem_hh: hh,
                rem_mm: mm,
            })
            // setInterval(function () {
               
            //     if (ts > 0) {
            //         document.getElementById("timer").innerHTML = dd + "天" + hh + "时" + mm + "分" + ss + "秒";
            //         startTime++;
            //     } else if (ts < 0) {
            //         document.getElementById("timer").innerHTML = "00:00:00";
            //         　　　　　　　location.reload();
            //     }
            // }, 60000);
            
        })
    },
    checkTime(i) {
        if (i <= 10) {
            i = "0" + i;
        }
        return i;
    },
    gettese(){
        this.setData({
            ispopup: true
        })
    },
    cancel(){
        this.setData({
            ispopup: false
        })
    },
    moreinfo(){
        wx.navigateTo({
            url: '/pages/assemble/assembleInfo/assembleInfo?id=' + this.data.datainfo.more[0].assemble_id
        })
    },
    moreinfo2() {
        wx.navigateTo({
            url: '/pages/assemble/assembleInfo/assembleInfo?id=' + this.data.datainfo.more[1].assemble_id
        })
    },
    startAssemble(){
        if(this.myData.twoid==''){
            var data = {
                assemble_id: this.myData.id,
                user_id: wx.getStorageSync('userid'),
                prent_id: this.data.datainfo.assemble_num.prent_id
            }
            ajax.startAssemble(data).then(res => {
                if (res.data) {
                    wx.lin.showToast({
                        title: '开团成功',
                        icon: 'success',
                        iconStyle: 'color:#7ec699; size: 60',
                        success: (res) => {
                        },
                        complete: (res) => {
                        }
                    })
                    this.getData(this.myData.id, wx.getStorageSync('userid'))
                } else {
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
        }else{
            var data = {
                assemble_id: this.myData.id,
                user_id: wx.getStorageSync('userid'),
                prent_id: this.myData.twoid
            }
            ajax.startAssemble(data).then(res => {
                if (res.data) {
                    this.myData.twoid=''
                    this.getData(this.myData.id, wx.getStorageSync('userid'))
                } else {
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
        }
        
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
            is_share:2,
            prent_id:''
        }
        var self = this
        ajaxLofin.login(data).then(res => {
            if (res.code == 1) {
                wx.showToast({
                    title: '登录成功',
                    icon: 'success',
                    duration: 2000
                })
                self.setData({
                    isload: false
                })
                self.myData.userid = wx.getStorageSync('userid')
                wx.setStorageSync('userid', res.data.user_info.user_id)
                wx.setStorageSync('token', res.data.user_info.token)
                wx.setStorageSync('userInfo', res.data.user_info)
                self.getData(options.id, self.myData.twoid)
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
    getassemInfo(){
        wx.navigateTo({
            url: '/pages/bannerInfo/bannerInfo?id=' + this.myData.id,
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
        var user_info = wx.getStorageSync('userInfo')
        var path = '/pages/assemble/assembleInfo/assembleInfo?id=' + this.myData.id + '&twoid=' + this.data.datainfo.assemble_num.prent_id 
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        } else {
            console.log(2)
        }
        return {
            title: user_info.nickname+'邀请您加入拼团',
            path: path,
            imageUrl: '',
        }
    }
})