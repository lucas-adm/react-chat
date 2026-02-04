import { CreateMessageInput } from "@/core/schemas";
import { useFormContext } from "react-hook-form";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    name: keyof CreateMessageInput;
}

export const Textarea = ({ name, ...rest }: Props) => {

    const { register } = useFormContext<CreateMessageInput>();

    return (
        <textarea
            id={name}
            {...register(name)}
            placeholder="Escreva sua mensagem"
            rows={1}
            className="resize-none outline-none w-full px-4 py-2 rounded-full border border-neutral-200 text-sm"
            {...rest}
        />
    )

}