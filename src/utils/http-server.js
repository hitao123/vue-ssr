import axios from 'axios'

/**
 * 解析cookie
 * @param {Object} cookies
 */
export const parseCookie = cookies => {
  let cookie = ''
  Object.keys(cookies).forEach((item) => {
    cookie += item + '=' + cookies[item] + ';'
  })
  return cookie
}

export const fetchAPI = cookies => {
  return {
    cookies,
    getAPI: axios.create({
      baseURL: '',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        cookie: parseCookie(cookies)
      },
      timeout: 5000
    }),
    getCookies() {
      return this.cookies
    },
    post(url, data) {
      return this.getAPI({
        method: 'post',
        url,
        data: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      })
        .then(res => {
          return res && res.data
        })
    },
    get(url, params) {
      return this.getAPI({
        method: 'get',
        url,
        params
      })
        .then(res => {
          return res && res.data
        })
    }
  }
}
