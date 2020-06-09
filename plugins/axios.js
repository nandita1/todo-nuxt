export default function ({
  $axios
}) {
  $axios.onError(error => {
    if (error.response.status === 500) {
      this.$store.dispatch('setError')
    }
  })
}
