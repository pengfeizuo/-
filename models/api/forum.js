import {
    HTTP
} from '../../utils/http.js'

class Forum extends HTTP {
    getData() {
        return this.request({
            url: "/forum/forumBannerList",
            method: "GET",
            data:{
                user_id: wx.getStorageSync('userid')
            }
        })
    };
    getInfo(data) {
        return this.request({
            url: "/forum/forumList",
            method: "POST",
            data:data
        })
    }

}
export {
    Forum
}
