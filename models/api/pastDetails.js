import {
    HTTP
} from '../../utils/http.js'

class PastDetails extends HTTP {
    getData(data) {
        return this.request({
            url: "/broadcast/pastDetails",
            method: "POST",
            data: data
        })
    };
    getPastList(data) {
        return this.request({
            url: "/broadcast/pastList",
            method: "POST",
            data: data
        })
    };

}
export {
    PastDetails
}
