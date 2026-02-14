import { ChangeEvent, useEffect } from "react";
import { CreateMessageInput, UpdateMessageInput } from "@/core/schemas";
import { Message, User } from "@/core/models";
import { useChat } from "@/hooks";
import { useFormContext } from "react-hook-form";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    name: keyof (CreateMessageInput | UpdateMessageInput);
    ref: React.RefObject<boolean>;
    user: User;
    editing: Message | null;
}

export const Textarea = ({ name, ref, user, editing, ...rest }: Props) => {

    const { register } = useFormContext<CreateMessageInput>();
    const { onChange, ...registerRest } = register(name);

    const { sendTyping } = useChat();

    const handleTyping = (value: string) => {
        const hasText = value.trim().length > 0;
        if (hasText && !ref.current) {
            sendTyping({ user, typing: true });
            ref.current = true;
        }
        if (!hasText && ref.current) {
            sendTyping({ user, typing: false });
            ref.current = false;
        }
    }

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e);
        if (!editing) handleTyping(e.target.value);
    }

    useEffect(() => {
        if (editing) {
            sendTyping({ user, typing: false });
            ref.current = false;
        }
    }, [editing, ref, sendTyping, user])

    return (
        <textarea
            {...registerRest}
            onChange={handleChange}
            placeholder="Escreva sua mensagem"
            rows={1}
            className="resize-none outline-none w-full px-4 py-2 rounded-full border border-neutral-200 text-sm"
            {...rest}
        />
    )

}