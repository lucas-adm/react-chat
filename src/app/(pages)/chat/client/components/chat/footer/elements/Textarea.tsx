import { ChangeEvent } from "react";
import { CreateMessageInput } from "@/core/schemas";
import { useChat } from "@/hooks";
import { useFormContext } from "react-hook-form";
import { User } from "@/core/models";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    name: keyof CreateMessageInput;
    ref: React.RefObject<boolean>;
    user: User;
}

export const Textarea = ({ name, ref, user, ...rest }: Props) => {

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
        handleTyping(e.target.value);
    }

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