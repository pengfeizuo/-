import {
    HTTP
} from '../../utils/http.js'

class Assemble extends HTTP {
    getData(data) {
        return this.request({
            url: "/assemble/getAssemble",
            method: "POST",
            data: data
        })
    };
    getMyAssemble(data){
        return this.request({
            url: "/assemble/assembleDetails",
            method: "POST",
            data: data
        })
    };
    getmyAssemble(data){
        return this.request({
            url: "/assemble/myAssemble",
            method: "POST",
            data: data
        })
    };
    startAssemble(data){
        return this.request({
            url: "/assemble/startAssemble",
            method: "POST",
            data: data
        })
    }
}
export {
    Assemble
}
