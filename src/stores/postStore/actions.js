export default {
  clear: function () {
    this.posts = []
  },
  searchedPosts: function (val) {
    this.clear()
    this.posts.push(...val)
  },
  getQuotes: function (val) {
    this.posts.push(val)
  }
}
