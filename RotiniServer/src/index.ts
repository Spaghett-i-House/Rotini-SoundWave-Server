import {App} from './App'

const port = process.env.PORT || 3000
const app = new App(9588);
/*app.listen(port, (err) => {
  if (err) {
    return console.log(err)
  }

  return console.log(`server is listening on ${port}`)
})*/