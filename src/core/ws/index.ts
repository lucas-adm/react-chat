import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export function createWebSocketClient(url: string) {

    const client = new Client({
        webSocketFactory: () => new SockJS(`${url}/livechat`),
        reconnectDelay: 5000
    })

    function connect(onConnect: () => void) {
        client.onConnect = () => onConnect();
        client.activate();
    }

    function disconnect() {
        client.deactivate();
    }

    function subscribe<T>(topic: string, callback: (data: T) => void) {
        return client.subscribe(topic, (message) => {
            callback(JSON.parse(message.body) as T);
        })
    }

    function send(destination: string, body: unknown) {
        client.publish({
            destination,
            body: JSON.stringify(body)
        })
    }

    return {
        connect,
        disconnect,
        subscribe,
        send,
    }

}