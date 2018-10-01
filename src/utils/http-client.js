import axios from 'axios'

function checkStatus(res) {
  if (res.status === 200 || res.status === 304) {
    return res
  }
  return {
    data: {
      code: -1000,
      message: res.statusText,
      data: ''
    }
  }
}

/**
 * 全局请求拦截
 */
axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * 全局响应拦截
 */
axios.interceptors.response.use(
  res => {
    return res
  },
  error => {
    return Promise.resolve(error.response)
  }
)

export default {
  get(url, params) {
    return axios({
      method: 'get',
      url,
      params,
      timeout: 5000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
      .then(checkStatus)
  },
  post(url, data) {
    return axios({
      method: 'post',
      url,
      data,
      timeout: 5000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
      .then(checkStatus)
  }
}
