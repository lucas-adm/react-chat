import { Button, Textarea } from "./elements";
import { FormProvider, useForm } from "react-hook-form";
import { IconCheck, IconX } from "@tabler/icons-react";
import { Message } from "@/core/models";
import { normalize } from "@/utils";
import { updateMessageData, UpdateMessageInput } from "@/core/schemas";
import { useChat, useMessages } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = React.HTMLAttributes<HTMLElement> & {
    msg: Message;
    setEditing: React.Dispatch<React.SetStateAction<Message | null>>;
}

export const Input = ({ msg, setEditing, ...rest }: Props) => {

    const { updateMessage: sendUpdate } = useChat();
    const { setMessages } = useMessages();

    const updateMessage = useForm<UpdateMessageInput>({
        resolver: zodResolver(updateMessageData)
    })

    const { setValue, handleSubmit } = updateMessage;

    const cancel = () => setEditing(null);

    const submit = (data: UpdateMessageInput) => {
        const payload = { id: msg.text.id, ...data };
        sendUpdate(payload);
        setValue('content', '');
        setEditing(null);
        setMessages(prev => prev
            ? prev.some(m => m.text.id === msg.text.id)
                ? prev.map(m => m.text.id === msg.text.id
                    ? normalize.message(msg, 'sending', data.content)
                    : m)
                : [...prev, normalize.message(msg, 'sending', data.content)]
            : [normalize.message(msg, 'sending', data.content)]
        )
    }

    return (
        <FormProvider {...updateMessage}>
            <form
                onSubmit={handleSubmit(submit)}
                className="flex gap-3"
                {...rest}
            >
                <Textarea name="content" defaultValue={msg.text.content!} />
                <Button type="button" aria-label="Cancelar" icon={IconX} onClick={cancel} />
                <Button type="submit" aria-label="Salvar" icon={IconCheck} />
            </form>
        </FormProvider>
    )

}