import axios from 'axios'
import { Loading, Message } from 'element-ui'
import router from '../router'
const BASEURL = '/api'
const http = axios.create({
  baseURL: BASEURL,
  timeout: 1000
})
let loadingInstance
http.interceptors.request.use(
  (config) => {
    let token = sessionStorage.getItem('token')
    token && (config.headers['token'] = token)
    loadingInstance = Loading.service({
      lock: true,
      text: 'loading...'
    })
    return config
  },
  (error) => Promise.reject(error)
)
http.interceptors.response.use(
  (response) => {
    response.data.token && sessionStorage.setItem('token', response.data.token)
    loadingInstance.close()
    return response.data
  },
  (error) => {
    loadingInstance.close()
    const msg = error.message !== undefined ? error.message : ''
    Message({
      message: '网络错误' + msg,
      type: 'error',
      duration: 1000
    })
    let res = error.response
    switch (res.code) {
      case 401:
        sessionStorage.removeItem('token')
        return router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default http
