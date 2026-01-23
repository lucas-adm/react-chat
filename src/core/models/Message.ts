import { User } from "./User"

export type Message = {
    user: User,
    text: {
        id: string,
        creator: string,
        content: string,
        createdAt: string,
        updatedAt: string | null,
        read: boolean,
        updated: boolean,
        status: 'sending' | 'sent' | 'read'
    }
}