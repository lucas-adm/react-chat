import { CreateMessageInput, ReadMessageInput } from "../dtos/in";
import { CreateMessageOutput, PresenceOutput, ReadMessageOutput, SnapshotOutput } from "../dtos/out";
import { createWebSocketClient } from "../ws";
import { User } from "../models";

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

    function subscribeWhenConnected<T>(topic: string, callback: (output: T) => void) {
        const subscribe = () => socket.subscribe<T>(topic, callback);
        if (isConnected) return subscribe();
        return pendingSubscriptions.push(subscribe);
    }

    const createListener = <T>(topic: string) => (callback: (output: T) => void) => subscribeWhenConnected<T>(topic, callback);
    const createSender = <T = void>(destination: string) => (payload?: T) => socket.send(destination, payload);

    const sendSnapshotReq = createSender<object>('/app/snapshot');
    const sendMessage = createSender<CreateMessageInput>('/app/msg');
    const readMessage = createSender<ReadMessageInput>('/app/read');

    const onSnapshot = createListener<SnapshotOutput>('/user/queue/snapshot');
    const onPresence = createListener<PresenceOutput>('/topics/presence');
    const onMessage = createListener<CreateMessageOutput>('/topics/msg');
    const onRead = createListener<ReadMessageOutput>('/topics/read');

    return {
        connect,
        disconnect,
        sendSnapshotReq,
        sendMessage,
        readMessage,
        onSnapshot,
        onPresence,
        onMessage,
        onRead
    }

}