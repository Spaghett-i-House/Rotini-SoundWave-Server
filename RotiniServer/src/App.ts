import * as express from 'express'
import * as socketio from "socket.io"
import * as path from "path"

class App {
  public express;
  public http;
  public io;

  constructor () {
    this.express = express()
    this.http = require('http').Server(this.express);
    this.io = require("socket.io")(this.http);
    this.mountRoutes();
  }

  private mountRoutes (): void {
    const router = express.Router()
    router.get('/', (req, res) => {
      res.json({
        message: 'Hello Worldaaaaaaaa !'
      })
    })
    this.express.use('/', router);
  }
}

export default new App().http