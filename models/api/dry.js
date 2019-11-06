import {
    HTTP
} from '../../utils/http.js'

class Dry extends HTTP {
    getData(data) {
        return this.request({
            url: "/hard/hardList",
            method: "POST",
            data: data
        })
    };
    getInfo(data) {
        return this.request({
            url: "/hard/getHardOne",
            method: "POST",
            data: {hardId:data}
        })
    }

}
export {
    Dry
}
