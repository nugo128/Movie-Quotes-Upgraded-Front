import axios from '@/config/axios/index.js'
export default {
  clearUser: function () {
    this.authUser = []
  },
  getUrl: function (url) {
    if (url?.substring(0, 6) === 'images') {
      return this.link + url
    } else {
      return url
    }
  },
  setUser: function (data) {
    this.authUser.push(data)
  },
  getAuthUser: async function () {
    try {
      const response = await axios.get('/api/user')
      this.authUser.push(response.data)
    } catch (error) {
      console.log(error)
    }
  }
}
