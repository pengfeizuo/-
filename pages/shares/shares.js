import {
    Shares
} from '../../models/api/shares.js'
let ajax = new Shares()
import {
    Order
} from '../../models/api/order.js'
let ajaxOrder = new Order()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        datainfo:{},
        ispopup:false,
        ispopup2: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getData()
    },
    getData() {
        var data = {
            user_id: wx.getStorageSync('userid')
        }
        ajax.getData(data).then(res => {
            this.setData({
                datainfo: res.data
            })
        })
    },
    getnew(){
        if (this.data.datainfo.bottom.status==1){
            wx.navigateTo({
                url: '/pages/shares/newShares/newShares?id=' + this.data.datainfo.bottom.one_vote_id,
            })
        }else{
            this.setData({
                ispopup:true
            })
        }
        
    },
    cancel() {
        this.setData({
            ispopup: false
        })
    },
    confirm() {
        var self = this
        var data = {
            user_id: wx.getStorageSync('userid'),
            product_id: this.data.datainfo.bottom.one_vote_id,
            source: 'one_vote',
            dividend: this.data.datainfo.bottom.currency_num
        }
        ajaxOrder.createPay(data).then(res => {
            self.setData({
                ispopup: false
            })
            if (res.data) {
                wx.lin.showToast({
                    title: '支付成功',
                    icon: 'success',
                    iconStyle: 'color:#7ec699; size: 60',
                    success: (res) => {
                    },
                    complete: (res) => {
                    }
                })
                wx.navigateTo({
                    url: '/pages/shares/newShares/newShares?id=' + self.data.datainfo.bottom.one_vote_id,
                })

            } else {
            	if(res.msg=='股币数量不足'){
            		self.setData({
		                ispopup2: true
		            })
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
            }
        })



    },
    getGb(){
    	wx.switchTab({  
			url:'/pages/makeGb/makeGb'  
    	});  
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