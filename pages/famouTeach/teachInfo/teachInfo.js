import {
    Forum
} from '../../../models/api/forum.js'
let ajax = new Forum()
import {
    Order
} from '../../../models/api/order.js'
let ajaxOrder = new Order()
import {
    Shares
} from '../../../models/api/shares.js'
let ajaxShares = new Shares()
const innerAudioContext = wx.createInnerAudioContext()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dataList: [],
        paly: false,
        jwidth:0,
        ispopup: false,
        ispopup2: false,
        dividend:''
    },
    mydata: {
        optionsId:'',
        id:'',
        page:0,
        dataList:[]
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.mydata.optionsId = options.id
        
    },
    getData(id) {
        this.mydata.page = this.mydata.page+1
        var data = {
            user_id: wx.getStorageSync('userid'),
            cateId: id,
            indexPage: this.mydata.page,
            startPage: 10,
        }
        ajax.getInfo(data).then(res => {
            var info = res.data.list
            info.forEach((item,index)=>{
                info[index].audio_pay=false
                info[index].jwidth = 0
                info[index].end_time = 0
            })
            this.mydata.dataList.push.apply(this.mydata.dataList, info)
            this.setData({
                dataList: this.mydata.dataList,
            })
            console.log(this.data.dataList)
        })
    },
    startaudio(e) {
        var index = e.currentTarget.dataset.index

        if (this.data.dataList[index].is_free == 1 || this.data.dataList[index].order_status==1){
            let paly = 'dataList[' + index + '].audio_pay'
            this.setData({
                [paly]: true
            })
            innerAudioContext.src = this.data.dataList[index].audio_path
            innerAudioContext.play()
            setTimeout(() => {
                innerAudioContext.currentTime
                innerAudioContext.onTimeUpdate(() => {
                    let vw = 'dataList[' + index + '].jwidth'
                    let time = 'dataList[' + index + '].end_time'
                    this.setData({
                        [time]:"-"+ parseInt(innerAudioContext.duration-innerAudioContext.currentTime),
                        [vw]: innerAudioContext.currentTime / innerAudioContext.duration * 100
                    })
                })
            }, 200)

            innerAudioContext.onPlay(() => {


            })


            innerAudioContext.onPause(() => {
                let paly = 'dataList[' + index + '].audio_pay'
                this.setData({
                    [paly]: false
                })
            })
        }else{
            this.mydata.id = this.data.dataList[index].id
            this.setData({
                dividend: this.data.dataList[index].dividend,
                ispopup: true
            })
        }
        
        
    },
    stopaudio(e){
        var index = e.currentTarget.dataset.index
        let paly = 'dataList[' + index + '].audio_pay'
        this.setData({
            [paly]: false
        })
        // innerAudioContext.src = 
       innerAudioContext.pause()
        innerAudioContext.onPause(() => {
            
        })
        
    },
    confirm() {
        var self = this
        var data = {
            user_id: wx.getStorageSync('userid'),
            product_id: this.mydata.id,
            source: 'forum',
            dividend: this.data.dividend,
        }
        ajaxOrder.createPay(data).then(res => {
            self.setData({
                ispopup: false
            })
            if (res.data) {
                this.getData(this.mydata.optionsId)
                wx.lin.showToast({
                    title: '支付成功',
                    icon: 'success',
                    iconStyle: 'color:#7ec699; size: 60',
                    success: (res) => {
                    },
                    complete: (res) => {
                    }
                })
                self.setData({
                    color: '#fff',
                    ismosick: false,
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
    cancel() {
        this.setData({
            ispopup: false
        })
    },
    getShares() {
        ajaxShares.userForward().then(res => {

        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        
        
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
		this.getData(this.mydata.optionsId)
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

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
        this.getData(this.mydata.optionsId)
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
        }
    },
})