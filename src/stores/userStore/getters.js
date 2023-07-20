import axios from '@/config/axios/index.js'
export default {
  getAuthUser: async function () {
    const response = await axios.get('/api/user')
    this.authUser.push(response.data)
  }
}
