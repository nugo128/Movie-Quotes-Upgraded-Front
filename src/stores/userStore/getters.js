import axios from '@/config/axios/index.js'
export default {
  getAuthUser: async function () {
    try {
      const response = await axios.get('/api/user')
      this.authUser.push(response.data)
    } catch (error) {
      console.log(error)
    }
  }
}
