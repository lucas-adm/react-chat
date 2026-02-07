import { CreateMessageInput, CreateMessageOutput } from "../dtos";
import { User } from "../models";
import { createWebSocketClient } from "../ws";

export function createChatService() {

    const url = process.env.NEXT_PUBLIC_WEBSOCKET!;
    const socket = createWebSocketClient(url);
    const pendingSubscriptions: (() => void)[] = [];
    let isConnected = false;

    function connect(user: User | null, onConnected?: () => void) {
        socket.connect(user, () => {
            isConnected = true;
            pendingSubscriptions.forEach(fn => fn());
            pendingSubscriptions.length = 0;
            onConnected?.();
        })
    }

    function disconnect() {
        isConnected = false;
        socket.disconnect();
    }

    function sendSnapshotReq() {
        socket.send('/app/snapshot', {});
    }

    function onSnapshot(callback: (output: string[]) => void) {
        const subscribe = () => socket.subscribe<string[]>('/user/queue/snapshot', callback);
        if (isConnected) return subscribe();
        return pendingSubscriptions.push(subscribe);
    }

    function onPresence(callback: (output: { user: User; online: boolean; }) => void) {
        const subscribe = () => socket.subscribe<{ user: User; online: boolean; }>('/topics/presence', callback);
        if (isConnected) return subscribe();
        return pendingSubscriptions.push(subscribe);
    }

    function onMessage(callback: (output: CreateMessageOutput) => void) {
        const subscribe = () => socket.subscribe<CreateMessageOutput>('/topics/msg', callback);
        if (isConnected) return subscribe();
        return pendingSubscriptions.push(subscribe);
    }

    function sendMessage(input: CreateMessageInput) {
        socket.send('/app/msg', input);
    }

    function onRead(callback: (output: CreateMessageOutput) => void) {
        const subscribe = () => socket.subscribe<CreateMessageOutput>('/topics/read', callback);
        if (isConnected) return subscribe();
        return pendingSubscriptions.push(subscribe);
    }

    function readMessage(id: string) {
        socket.send('/app/read', { id: id });
    }

    return {
        connect,
        disconnect,
        sendSnapshotReq,
        onSnapshot,
        onPresence,
        onMessage,
        sendMessage,
        onRead,
        readMessage
    }

}