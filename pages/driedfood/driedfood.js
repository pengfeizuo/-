import {
    Dry
} from '../../models/api/dry.js'
let ajax = new Dry()
import {
    Order
} from '../../models/api/order.js'
let ajaxOrder = new Order()
import {
    Shares
} from '../../models/api/shares.js'
let ajaxShares = new Shares()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isnav:0,
        dataList:[],
        dataList2: [],
        ispopup:false,
        ispopup2:false,
        price:''
    },
    mydata:{
        id:"",
        dividend:'',
        page1:0,
        page2: 0,
        dataList:[],
        dataList2: []
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
    },
    getData(id) {
      wx.showLoading({
        title: '加载中',
      })
        this.mydata.page1 = this.mydata.page1+1
        var data = {
            user_id: wx.getStorageSync('userid'),
            cateId: 1,
            indexPage: this.mydata.page1,
            startPage: 10,
        }
        ajax.getData(data).then(res => {
            this.mydata.dataList.push.apply(this.mydata.dataList, res.data.list)
            console.log(this.mydata.dataList)
            this.setData({
                dataList: this.mydata.dataList,
            })
          wx.hideLoading()
        })
    },
    getData2(id) {
      wx.showLoading({
        title: '加载中',
      })
        this.mydata.page2 = this.mydata.page2 + 1
        var data = {
            user_id: wx.getStorageSync('userid'),
            cateId: 2,
            indexPage: this.mydata.page2,
            startPage: 10,
        }
        ajax.getData(data).then(res => {
            this.mydata.dataList2.push.apply(this.mydata.dataList2, res.data.list)
            this.setData({
                dataList2: this.mydata.dataList2,
            })
          wx.hideLoading()
        })
    },
    getInfo(e){
        var index = e.currentTarget.dataset.index
        if (this.data.dataList[index].is_free == 1 || this.data.dataList[index].order_status == 1){
            wx.navigateTo({
                url: '/pages/bannerInfo/bannerInfo?id=' + this.data.dataList[index].id,
            })
        }else{
            this.setData({
                price: this.data.dataList[index].dividend,
                ispopup:true
            })
            this.mydata.id = this.data.dataList[index].id
            this.mydata.dividend = this.data.dataList[index].dividend
        }
    },
    getInfo2(e) {
        var index = e.currentTarget.dataset.index
       
        if (this.data.dataList2[index].is_free == 1 || this.data.dataList2[index].order_status == 1) {
            wx.navigateTo({
                url: '/pages/bannerInfo/bannerInfo?id=' + this.data.dataList2[index].id,
            })
        } else {
            this.setData({
                price: this.data.dataList2[index].dividend,
                ispopup: true
            })
            this.mydata.id = this.data.dataList2[index].id
            this.mydata.dividend = this.data.dataList2[index].dividend
        }
    },
    confirm(){
        var self = this
        var data = {
            user_id: wx.getStorageSync('userid'),
            product_id: this.mydata.id,
            source: 'hard',
            dividend: this.mydata.dividend
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
                setTimeout(()=>{
                    wx.navigateTo({
                        url: '/pages/bannerInfo/bannerInfo?id=' + self.mydata.id,
                    })
                },2000)
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
    cancel() {
        this.setData({
            ispopup: false
        })
    },
    changelist(){
        // this.getData()
        this.setData({
            isnav: 0
        })
    },
    changelist2() {
        // this.getData2()
        this.setData({
            isnav: 1
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
    	this.mydata.page1 = 0
    	this.mydata.page2 = 0
    	this.mydata.dataList = []
    	this.mydata.dataList2 = []
		this.getData()
        this.getData2()
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
    gundong(){
        console.log('触底')
        if (this.data.isnav == 0) {
            this.getData()
        } else {
            this.getData2()
        }
    },
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