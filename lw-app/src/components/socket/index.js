'use strict';

import io from 'react-native-socket.io-client';

import {
	Strings,
} from '../../constants';

const initSocket = async () => {

    if (global.socketIo !== undefined) {
        global.socketIo.disconnect();
    }

	const connectionOptions = {
        jsonp: false,
        secure: true,
        transports: ['websocket', 'polling', 'polling-xhr', 'polling-jsonp'],
        pingTimeout: 30000,
        pingInterval: 30000,
        reconnection: true,
    }

    global.socketIo = io(Strings.urlSocket, connectionOptions);
    global.socketIo.connect();

    const syncDevice = async () => {
        
        const syncState = {
            GUID: ["1be06df1-8d95-46bd-ba0b-2ab90464fba7"],
            SERIAL: "",
            IP: "192.168.0.107",
            CORE: "ESP8266",
            VERSION: "1.0.0"
        }

        await global.socketIo.emit('SYNC', syncState);
    }

    await global.socketIo.on('connect', (response) => {
    	console.log("Socket connected!!!");
        syncDevice();
    });

    await global.socketIo.on('STT', (response) => {
        console.log('STT data', response);
    });

    await global.socketIo.on('disconnect', (response) => {
        console.log("Socket disconnected!!!");
    });
}

export {
	initSocket,
}