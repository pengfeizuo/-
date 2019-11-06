import {
    HTTP
} from '../../utils/http.js'
class Shares extends HTTP {
    getData(data) {
        return this.request({
            url: "/combination/oneVoteList",
            method: "POST",
            data: data
        })
    };
    getNew(data){
        return this.request({
            url: "/combination/getVoteNew",
            method: "POST",
            data: data
        })
    }
    userForward(){
        return this.request({
            url: "/user/userForward",
            method: "POST",
            data: {
                user_id: wx.getStorageSync('userid')
            }
        })
    }

}
export {
    Shares
}
