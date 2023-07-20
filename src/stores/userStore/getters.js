import axios from '@/config/axios/index.js'
export default {
  getAuthUsers: async function () {
    const response = await axios.get('/api/user')
    return response.data
  }
}
