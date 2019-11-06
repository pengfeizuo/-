import {
    HTTP
} from '../../utils/http.js'

class Balance extends HTTP {
    getBalance() {
        return this.request({
            url: "/user/myStockCurrency",
            method: "POST",
            data: {
                user_id:wx.getStorageSync('userid')
            }
        })
    };
}
export {
    Balance
}