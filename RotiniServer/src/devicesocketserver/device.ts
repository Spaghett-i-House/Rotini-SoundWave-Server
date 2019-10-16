import { AddressInfo } from "net";
import { Socket, createSocket } from "dgram";

export class Device{
    private heartBeatTimeout: NodeJS.Timeout;
    private socket: Socket;
    private name: string;
    private address: AddressInfo;
    private audioDevices: Array<string>; //device names
    private onGoingStreams: Map<string, Int8Array>; //device name -> queue

    public onTimeout = () => null;

    constructor(address: AddressInfo, device_name: string){
        this.name = device_name;
        this.address = address;
        this.audioDevices = new Array<string>();
        this.onGoingStreams = new Map<string, Int8Array>();
        this.socket = createSocket('udp4');
        this.socket.bind(); // bind to a random socket

        this.heartBeatTimeout = setTimeout(() => {
            this.onTimeout();
        }, 5000);
    }

    private addEventListeners(){
        this.socket.on('error', (err) => this.onError(err));
        this.socket.on('listening', () => {console.log('new device socket opened')});
        this.socket.on('message', (message, address) => this.onMessage(message, address));
    }

    private onError(error: Error){
        console.log(`Device socket error ${error.stack}`);
        this.onTimeout();
        this.close();
    }

    private onMessage(message: Buffer, address: AddressInfo){

    }


    public getName(): String{
        return this.name;
    }

    public getAddress(): AddressInfo{
        return this.address;
    }

    public gotHeartbeat(){
        clearTimeout(this.heartBeatTimeout);
        this.heartBeatTimeout = setTimeout(() => {
            this.onTimeout();
        }, 5000);
    }

    public close(){

    }
}