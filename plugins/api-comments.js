import axios from 'axios'

export default (context, inject) => {
  inject('api', api)

  context.$api = api
}

const api = {
  getComments () {
    return axios.get('https://jsonplaceholder.typicode.com/comments')
      .then((response) => {
        return response
      })
  }
}
