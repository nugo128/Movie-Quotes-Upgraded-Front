import axios from '@/config/axios/index.js'
export default {
  getPosts: async function () {
    const response = await axios.get('/api/post')
    this.posts.push(...response.data)
  }
}
