//
import axios from 'axios'

export default function (req, res, next) {
  // req is the Node.js http request object

  if (req.url === '/getComments') {
    axios.get('https://jsonplaceholder.typicode.com/comments')
      .then((response) => {
        res.end(JSON.stringify(response.data))
      })
    return
  }

  // next is a function to call to invoke the next middleware
  // Don't forget to call next at the end if your middleware is not an endpoint!
  next()
}
