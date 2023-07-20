import { viewQuote } from '../../services'
export default {
  getQuote: async function (id) {
    const response = await viewQuote(id)
    this.quote = response.data
  }
}
