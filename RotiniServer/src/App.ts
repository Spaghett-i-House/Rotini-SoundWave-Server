import * as express from 'express'
import * as socketio from "socket.io"
import * as path from "path"
import {DeviceSocketServer} from "./devicesocketserver/devicesocketserver";

export class App {
  /*public express;
  public http;
  public io;*/
  private deviceServer: DeviceSocketServer;

  constructor (devicePort: number) {
    this.deviceServer = new DeviceSocketServer(devicePort);
    /*this.express = express()
    this.mountRoutes();*/
  }

  /*private mountRoutes (): void {
    const router = express.Router()
    router.get('/', (req, res) => {
      res.json({
        message: 'Hello Worldaaaaaaaa !'
      })
    })
    this.express.use('/', router)
  }*/
}

//export default new App().http