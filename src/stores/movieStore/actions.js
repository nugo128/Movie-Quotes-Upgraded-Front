export default {
  addFile: function (img) {
    this.upload = 'Image Uploaded'
    this.file = img
  },
  clear: function () {
    this.userMovies = []
  },

  searchedMovies: function (val) {
    this.clear()
    this.userMovies.push(...val)
  },
  getDesctiption: async function (data) {
    this.movieDescription = data
  }
}
