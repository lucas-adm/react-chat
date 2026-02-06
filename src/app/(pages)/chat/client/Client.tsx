'use client';

import { Aside, Chat, Separator } from "./components";
import { clsx } from "clsx";
import { Message, User } from "@/core/models";
import { normalize } from "@/utils";
import { useChat, useMessages, useUser } from "@/hooks";
import { useEffect, useMemo, useState } from "react";

type Props = {
    users: User[],
    messages: Message[]
}

export const Client = ({ users, messages: msgs }: Props) => {

    const { onMessage, onRead } = useChat();
    const { user } = useUser();
    const { messages, setMessages } = useMessages();
    const [firstUnreadId, setFirstUnreadId] = useState<string | null | undefined>(undefined);

    useEffect(() => setMessages(msgs.map(m => normalize.message(m, 'sent'))), [msgs, setMessages]);

    const unreads: number = useMemo(() => {
        if (messages) return messages
            .filter(m => !user || m.user.id !== user.id)
            .filter(m => !m.text.read).length;
        return 0;
    }, [messages, user])

    useEffect(() => {
        document.title = unreads > 0 ? `Chat (${unreads})` : 'Chat';
    }, [unreads])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (unreads === 0) return setFirstUnreadId(null);
            if (firstUnreadId) return;
            if (messages) {
                const firstUnread = messages.find(m => !m.text.read && (user ? m.user.id !== user.id : true))
                if (firstUnread) return setFirstUnreadId(firstUnread.text.id);
            }
        }, 666)
        return () => clearTimeout(timer);
    }, [firstUnreadId, messages, unreads, user])

    useEffect(() => {
        onMessage(output => {
            setMessages(prev => prev ? prev.some(m => m.text.id === output.text.id)
                ? prev : user && user.id === output.user.id
                    ? prev.map(m => m.text.clientId === output.text.clientId ? normalize.message(output, 'sent') : m)
                    : [...prev, normalize.message(output, 'sent')]
                : [normalize.message(output, 'sent')]
            )
        })
    }, [onMessage, setMessages, user])

    useEffect(() => {
        onRead(output => {
            setMessages(prev => prev
                ? prev.map(m => m.text.id === output.text.id ? normalize.message(output, 'sent') : m)
                : prev
            )
        })
    }, [onRead, setMessages])

    if (messages && (firstUnreadId !== undefined)) return (
        <main className="w-screen h-screen flex items-center justify-items-center bg-neutral-100 p-2 inmd:p-0">
            <section className={clsx(
                'overflow-hidden',
                'w-full max-w-222 h-full max-h-166.5 inmd:max-h-full',
                'mx-auto rounded-2xl inmd:rounded-none border border-neutral-200',
                'flex',
                'bg-neutral-100'
            )}>
                <aside className="inmd:hidden bg-neutral-200/25 w-66 h-full border-r p-3 border-neutral-200 flex-none flex flex-col gap-3">
                    <Aside.Header user={user} />
                    <Aside.List users={users} />
                </aside>
                <div className="w-full p-3 flex flex-col gap-3">
                    <Chat.Header />
                    <Separator />
                    <Chat.List
                        user={user}
                        messages={messages}
                        firstUnreadId={firstUnreadId}
                    />
                    <Chat.Footer />
                </div>
            </section>
        </main>
    )

}