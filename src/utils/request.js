import axios from 'axios'
import QS from 'qs'
import Vue from 'vue'

class HttpRequest {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
  }
  interceptors (instance) {
    // 添加respone拦截器
    instance.interceptors.response.use(
      response => {
        // if (response.data.code !== 0) {
        //         //   return Promise.reject(response)
        //         // }
        //         // return Promise.resolve(response.data.data)
        if (response) {
          return Promise.resolve(response)
        }
      },
      error => {
        if (error.response) {
          switch (error.response.status) {
          case 401:
            console.log(401)
            break
          case 403:
            console.log(403)
            break
          case 404:
            console.log(404)
            break
          case 500:
            console.log(500)
            break
          }
        }
        // Toast(error.data.message);
        return Promise.reject(error.response)
      }
    )
  }
  get (url, params = {}) {
    const getHttp = axios.create({
      baseURL: this.baseUrl,
      timeout: 30000
      // withCredentials:true
    })
    this.interceptors(getHttp)
    return getHttp({
      url,
      method: 'GET',
      headers: {
        'Accept': '*/*'
      },
      params
    })
  }
  post (url, data = {}) {
    const postHttp = axios.create({
      baseURL: this.baseUrl,
      timeout: 30000
      // withCredentials:true
    })
    data = QS.stringify(data, { arrayFormat: 'brackets' })
    this.interceptors(postHttp)
    return postHttp({
      url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        // 'Content-Type': 'application/json'
      },
      data
    })
  }
}

export default HttpRequest
