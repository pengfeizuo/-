import {
	HTTP
} from '../../utils/http.js'

class IndexModel extends HTTP {
	getData() {
		return this.request({
            url: "/index/index",
			method: "GET"
		})
	};
    getNewSolution(){
        return this.request({
            url: "/solution/getNewSolution",
            method: "GET"
        })
    };
    getPastSolution(data){
        return this.request({
            url: "/solution/getPastSolution",
            method: "POST",
            data: data,
        })
    };
    checkIn(){
        return this.request({
            url: "/user/checkIn",
            method: "POST",
            data:{
                user_id: wx.getStorageSync('userid'),
                currency:20
            },
        })
    };
}
export {
	IndexModel
}
