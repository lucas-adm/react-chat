import { User } from "./User"

export type Message = {
    user: User,
    text: {
        id: string,
        clientId: string,
        creator: string,
        content: string,
        createdAt: string,
        updatedAt: string | null,
        read: boolean,
        updated: boolean,
        status: 'sending' | 'sent' | null
    }
}

export function mockMessage(user: User, content: string): Message {
    const id = crypto.randomUUID().toString();
    return {
        user: user,
        text: {
            id: id,
            clientId: id,
            creator: user.id,
            content: content,
            createdAt: new Date().toISOString(),
            updatedAt: null,
            read: false,
            updated: false,
            status: null
        }
    }
}

export function normalize(msg: Message, status: 'sending' | 'sent'): Message {
    return {
        ...msg,
        text: {
            ...msg.text,
            id: msg.text.id,
            createdAt: msg.text.createdAt,
            status: status
        }
    }
}