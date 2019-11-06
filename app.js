//app.js
// import {
// 	SearchModel
// } from './models/search/search.js'
// let searchModel = new SearchModel()
App({
	onLaunch: function() {
        // wx.showShareMenu({
        //     withShareTicket: false //设置为false即可
        // })
        wx.login({
            success: res => {
                this.globalData.loginCode = res.code
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
		const updateManager = wx.getUpdateManager()
		updateManager.onCheckForUpdate(function(res) {
			// 请求完新版本信息的回调
			//			console.log(res.hasUpdate)
		})
		updateManager.onUpdateReady(function() {
			wx.showModal({
				title: '更新提示',
				content: '新版本已经准备好，是否马上重启小程序？',
				success: function(res) {
					if (res.confirm) {
						// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
						updateManager.applyUpdate()
					}
				}
			})
		})
		updateManager.onUpdateFailed(function() {
			// 新的版本下载失败
		})
	},
	globalData: {
		userInfo: null,
        loginCode:''
		//  garbageList: null,
	},
})
