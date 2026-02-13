import { Input, Message } from "./elements";
import { Message as MessageModel } from "@/core/models";
import { useCallback, useEffect } from "react";

type Props = React.HTMLAttributes<HTMLElement> & {
    message: MessageModel | null;
    setEditing: React.Dispatch<React.SetStateAction<MessageModel | null>>;
}

export const Modal = ({ message, setEditing, ...rest }: Props) => {

    const handleEscKeyKeydown = useCallback((e: KeyboardEvent) => {
        if (message) if (e.key === 'Escape') setEditing(null);
    }, [message, setEditing])

    useEffect(() => {
        window.addEventListener('keydown', handleEscKeyKeydown);
        return () => {
            window.removeEventListener('keydown', handleEscKeyKeydown)
        }
    }, [handleEscKeyKeydown])

    if (message) return (
        (
            <div
                className="z-1 absolute inset-0 p-3 flex flex-col gap-15 bg-neutral-100/50 backdrop-blur-sm"
                {...rest}
            >
                <Message msg={message} />
                <Input msg={message} setEditing={setEditing} />
            </div>
        )
    )

    return null;

}