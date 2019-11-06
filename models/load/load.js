import { HTTP } from '../../utils/http.js'

class LoadModel extends HTTP {
  getList(data) {
    return this.request({
      url: "/oauth/tokens",
      method: "POST",
      data:data
    })
  }
}

export { LoadModel }