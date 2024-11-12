import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios
const api = axios.create({ baseURL: 'http://127.0.0.1:8000' })
Vue.prototype.$api = api

  api.interceptors.request.use(function (config) {

  if (Vue.prototype.$q.localStorage.getItem('user') != null) {
    const token = Vue.prototype.$q.localStorage.getItem('user').token
    config.headers.Authorization = token ? `Bearer ${token}` : ''
  }
  return config
})

export default ({ app, route, Vue }) => {
  api.interceptors.response.use(
    undefined,
    function axiosRetryInterceptor (err) {
      if (
        err.response.status === 401 ||
        err.response.data.message === '401 Unauthorized'
      ) {
        app.router.push({ name: 'login' })
      }
      return Promise.reject(err)
    }
  )
}

export { axios, api }