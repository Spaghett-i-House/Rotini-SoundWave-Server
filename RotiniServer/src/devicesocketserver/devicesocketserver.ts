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
        });
        this.serverSocket.on('error', (err) => this.onError(err));
        this.serverSocket.on('message', (message, addrinfo) => this.onMessage(message, addrinfo));
    }

    private onError(error: Error){
        console.log(`There was a server error:\n ${error.stack}`);
        this.serverSocket.close();
    }

    private onMessage(message: Buffer, recvAddr: AddressInfo){
        console.log(`Received message ${message} from ${recvAddr.address}:${recvAddr.port}`);
        const opcodeChunk = message.slice(0,2);
        const opcode = opcodeChunk.readUInt16BE(0);
        console.log(`received opcode ${opcode}`);
    }

    public getConnectedDeviceNames(){
        
    }

    public getDevice(deviceName: String){

    }
}