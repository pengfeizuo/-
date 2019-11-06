import {
    HTTP
} from '../../utils/http.js'

class MakeGb extends HTTP {
    getData(data) {
        return this.request({
            url: "/user/earnCurrencyList",
            method: "POST",
            data: data
        })
    };
    getcurrencyList(){
        return this.request({
            url: "/user/currencyList",
            method: "POST",
            data: {
                user_id: wx.getStorageSync('userid')
            }
        })
    };
    getReceive(data){
        return this.request({
            url: "/user/Receive",
            method: "POST",
            data:data
        })
    }

}
export {
    MakeGb
}
