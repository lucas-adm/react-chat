import { Button, Input } from "./elements";
import { createMessageData } from "@/core/schemas";
import { CreateMessageInput } from "@/core/dtos";
import { FormProvider, useForm } from "react-hook-form";
import { useChat, useUser } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";

export const Footer = (props: React.HTMLAttributes<HTMLElement>) => {

    const createMessage = useForm<CreateMessageInput>({
        resolver: zodResolver(createMessageData)
    })

    const { handleSubmit, setValue } = createMessage;

    const { sendMessage } = useChat();
    const { user } = useUser();

    const submit = (data: CreateMessageInput) => {
        if (user) {
            sendMessage(user, data);
            return setValue('content', '');
        }
        return null;
    }

    if (user) return (
        <footer {...props}>
            <FormProvider {...createMessage}>
                <form onSubmit={handleSubmit(submit)} className="flex gap-3">
                    <Input name="content" />
                    <Button type="submit" />
                </form>
            </FormProvider>
        </footer>
    )

    return null;

}