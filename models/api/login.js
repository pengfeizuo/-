import {
    HTTP
} from '../../utils/http.js'

class Login extends HTTP {
    login(data) {
        return this.request({
            url: "/user/login",
            method: "POST",
            data: data
        })
    };
    getOpenId(data){
        return this.request({
            url: "/user/getUserOpenId",
            method: "POST",
            data: data
        })
    }
}
export {
    Login
}