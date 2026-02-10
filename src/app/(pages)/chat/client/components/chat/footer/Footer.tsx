import { Button, Textarea, Typing } from "./elements";
import { createMessageData } from "@/core/schemas";
import { CreateMessageInput } from "@/core/schemas";
import { CreateMessageInput as Payload } from "@/core/dtos/in";
import { FormProvider, useForm } from "react-hook-form";
import { mockMessage } from "@/core/models";
import { normalize } from "@/utils";
import { useChat, useMessages, useTyping, useUser } from "@/hooks";
import { useEffect, useMemo, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

export const Footer = (props: React.HTMLAttributes<HTMLElement>) => {

    const createMessage = useForm<CreateMessageInput>({
        resolver: zodResolver(createMessageData)
    })

    const { trigger, getValues, setValue } = createMessage;

    const { user } = useUser();
    const { sendTyping, onTyping, sendMessage } = useChat();
    const { typing, setTyping } = useTyping();
    const { setMessages } = useMessages();

    const isTypingRef = useRef<boolean>(false);

    const typingUsers: string[] | null = useMemo(() => {
        if (typing) {
            if (user) return typing.filter(t => t.typing && t.user.id !== user.id).map(t => t.user.displayName);
            return typing.filter(t => t.typing).map(t => t.user.displayName);
        }
        return null;
    }, [typing, user])

    useEffect(() => {
        onTyping((output) => {
            setTyping(prev => prev
                ? prev.some(u => u.user.id === output.user.id)
                    ? prev.map(u => u.user.id === output.user.id ? output : u)
                    : [...prev, output]
                : [output]
            )
        })
    }, [onTyping, setTyping])

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = await trigger();
        if (user && isValid) {
            const data = getValues();
            const normalized = normalize.message(mockMessage(user, data.content), 'sending');
            const payload: Payload = { user, clientId: normalized.text.clientId, ...data }
            sendTyping({ user, typing: false });
            sendMessage(payload);
            setMessages(prev => prev ? [...prev, normalized] : [normalized]);
            setValue('content', '')
            isTypingRef.current = false;
            return;
        }
        return null;
    }

    return (
        <footer className="relative" {...props}>
            <Typing typing={typingUsers} />
            {user
                ? <FormProvider {...createMessage}>
                    <form
                        onSubmit={handleFormSubmit}
                        className="flex gap-3"
                    >
                        <Textarea name="content" ref={isTypingRef} user={user} />
                        <Button type="submit" />
                    </form>
                </FormProvider>
                : null
            }
        </footer>
    )

}