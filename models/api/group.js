import {
    HTTP
} from '../../utils/http.js'

class Group extends HTTP {
    getData(data) {
        return this.request({
            url: "/combination/combinationList",
            method: "POST",
            data: data
        })
    };
    getData2(data) {
        return this.request({
            url: "/combination/fullEdition",
            method: "POST",
            data: data
        })
    }

}
export {
    Group
}
