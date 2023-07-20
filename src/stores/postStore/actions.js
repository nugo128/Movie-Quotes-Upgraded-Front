export default {
  clear: function () {
    this.posts = []
  },
  searchedPosts: function (val) {
    this.clear()
    this.posts.push(...val)
  }
}
