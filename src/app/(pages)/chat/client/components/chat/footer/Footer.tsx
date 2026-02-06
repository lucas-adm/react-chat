import { Button, Textarea } from "./elements";
import { createMessageData } from "@/core/schemas";
import { CreateMessageInput } from "@/core/schemas";
import { CreateMessageInput as Payload } from "@/core/dtos";
import { FormProvider, useForm } from "react-hook-form";
import { mockMessage } from "@/core/models";
import { normalize } from "@/utils";
import { useChat, useMessages, useUser } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";

export const Footer = (props: React.HTMLAttributes<HTMLElement>) => {

    const createMessage = useForm<CreateMessageInput>({
        resolver: zodResolver(createMessageData)
    })

    const { handleSubmit, setValue } = createMessage;

    const { sendMessage } = useChat();
    const { user } = useUser();
    const { setMessages } = useMessages();

    const submit = (data: CreateMessageInput) => {
        if (user) {
            const normalized = normalize.message(mockMessage(user, data.content), 'sending');
            const payload: Payload = { user, clientId: normalized.text.clientId, ...data }
            sendMessage(payload);
            setMessages(prev => prev ? [...prev, normalized] : [normalized]);
            setValue('content', '');
            return;
        }
        return null;
    }

    if (user) return (
        <footer {...props}>
            <FormProvider {...createMessage}>
                <form onSubmit={handleSubmit(submit, (e => console.log(e)))} className="flex gap-3">
                    <Textarea name="content" />
                    <Button type="submit" />
                </form>
            </FormProvider>
        </footer>
    )

    return null;

}