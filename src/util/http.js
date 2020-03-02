import axios from '@/util/request'

export default {
  get(url, data) {
    return axios.get(url, {
      params: data
    })
  },
  post(url, data) {
    return axios.post(url, data)
  },
  put(url, data) {
    return axios.put(url, data)
  },
  delete(url, data) {
    return axios.delete(url, {
      params: data
    })
  },
  // excel导出
  arraybuffer(url, data) {
    return axios.post(url, data, {
      responseType: 'arraybuffer'
    })
  },
}