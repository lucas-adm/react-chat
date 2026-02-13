import { UpdateMessageInput } from "@/core/schemas";
import { useFormContext } from "react-hook-form";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    name: keyof UpdateMessageInput;
}

export const Textarea = ({ name, ...rest }: Props) => {
    const { register } = useFormContext<UpdateMessageInput>();
    return (
        <textarea
            {...register(name)}
            placeholder="Edite sua mensagem"
            rows={1}
            className="resize-none outline-none w-full px-4 py-2 rounded-full border border-neutral-200 text-sm bg-neutral-100"
            {...rest}
        />
    )
}