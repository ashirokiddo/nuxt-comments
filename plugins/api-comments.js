export default (context, inject) => {
  inject('api', api)

  context.$api = api
}

const api = {
  getComments () {
    return fetch('/api/getComments')
  }
}