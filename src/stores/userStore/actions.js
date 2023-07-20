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
  }
}
