import { CreateMessageInput, CreateMessageOutput } from "../dtos";
import { createWebSocketClient } from "../ws";
import { User } from "../models";

export function createChatService() {

    const url = process.env.NEXT_PUBLIC_WEBSOCKET!;
    const socket = createWebSocketClient(url);
    const pendingSubscriptions: (() => void)[] = [];
    let isConnected = false;

    function connect(onConnected?: () => void) {
        socket.connect(() => {
            isConnected = true;
            pendingSubscriptions.forEach(fn => fn());
            pendingSubscriptions.length = 0;
            onConnected?.();
        })
    }

    function onMessage(callback: (msg: CreateMessageOutput) => void) {
        const subscribe = () => socket.subscribe<CreateMessageOutput>('/topics/msg', callback);
        if (isConnected) return subscribe();
        return pendingSubscriptions.push(subscribe);
    }

    function disconnect() {
        isConnected = false;
        socket.disconnect();
    }

    function sendMessage(user: User, input: CreateMessageInput) {
        socket.send('/app/msg', { user, content: input.content });
    }

    return {
        connect,
        disconnect,
        sendMessage,
        onMessage,
    }

}