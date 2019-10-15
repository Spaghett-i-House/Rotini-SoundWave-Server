import {Socket, createSocket} from 'dgram';
import { AddressInfo } from 'net';


export class DeviceSocketServer{
    private serverSocket: Socket;
    
    constructor(port: number){
        this.serverSocket = createSocket('udp4');
        this.serverSocket.bind(port);
        this.setEventListeners();
    }

    private setEventListeners(){
        this.serverSocket.on("listening", () => {
            const sockaddr = this.serverSocket.address() as AddressInfo;
            console.log(`Device server listening on ${sockaddr.address}: ${sockaddr.port}`);
        })
    }
}