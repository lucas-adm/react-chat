'use client';

import { Aside, Chat, Separator } from "./components";
import { clsx } from "clsx";
import { Message, User } from "@/core/models";
import { useChat, useMessages, useUser } from "@/hooks";
import { useEffect } from "react";

type Props = {
    users: User[],
    messages: Message[]
}

export const Client = ({ users, messages: msgs }: Props) => {

    const { onMessage } = useChat();
    const { user } = useUser();
    const { messages, setMessages } = useMessages();

    useEffect(() => setMessages(msgs), [msgs, setMessages]);

    useEffect(() => {
        onMessage(output => {
            setMessages(prev => prev ? prev.some(m => m.text.id === output.text.id)
                ? prev : [...prev, output]
                : [output]
            )
        })
    }, [onMessage, setMessages])

    const others = user ? users.filter(u => u.id !== user.id) : users;

    if (messages) return (
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
                    <Aside.List users={others} />
                </aside>
                <div className="w-full p-3 flex flex-col gap-3">
                    <Chat.Header />
                    <Separator />
                    <Chat.List user={user} messages={messages} />
                    <Chat.Footer />
                </div>
            </section>
        </main>
    )

}