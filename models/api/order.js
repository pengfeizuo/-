import {
    HTTP
} from '../../utils/http.js'

class Order extends HTTP {
    getData(data) {
        return this.request({
            url: "/user/myOrder",
            method: "POST",
            data:data
        })
    };
    getInfo(data) {
        return this.request({
            url: "/user/myOrderDetails",
            method: "POST",
            data: data
        })
    };
    createPay(data){
        return this.request({
            url: "/user/createPay",
            method: "POST",
            data: data
        })
    }

}
export {
    Order
}
