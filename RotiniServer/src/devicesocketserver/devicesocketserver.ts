import {Socket, createSocket} from 'dgram';
import { AddressInfo } from 'net';
import {Device} from './device';

export class DeviceSocketServer{
    private serverSocket: Socket;
    private devices: Map<AddressInfo, Device>;

    constructor(port: number){ //listens for device broadcasts
        this.devices = new Map<AddressInfo, Device>();
        this.serverSocket = createSocket('udp4');
        this.serverSocket.bind(port, "0.0.0.0");
        this.setEventListeners();
    }

    private setEventListeners(){
        this.serverSocket.on("listening", () => {
            const sockaddr = this.serverSocket.address() as AddressInfo;
            console.log(`Device server listening for broadcasts on: ${sockaddr.port}`);
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
        if(message.readUIntBE(0,2) == 0){
            const message_length = message.readUIntBE(2,2);
            const device_name = message.slice(4,message_length+4).toString();
            console.log(`Received device name ${device_name}`);
            if(this.devices.has(recvAddr)){
                this.devices.get(recvAddr).gotHeartbeat();
            }
            else{
                const newDevice = new Device(recvAddr, device_name);
                newDevice.onTimeout = () => this.onDeviceTimeout(newDevice);
                this.devices.set(recvAddr, new Device(recvAddr, device_name));
            }
        }
    }

    private onDeviceTimeout(device: Device){
        this.devices.delete(device.getAddress());
        console.log(`${device.getName()} has timed out`);
        device.close();
    }
}