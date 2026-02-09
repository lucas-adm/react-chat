import { Avatar } from "@/components";
import { clsx } from "clsx";
import { formatTime } from "@/utils";
import { IconCheck, IconCircleDotted, IconDotsVertical } from "@tabler/icons-react";
import { Message } from "@/core/models";
import { useChat } from "@/hooks";
import { useEffect, useRef } from "react";

type Props = React.LiHTMLAttributes<HTMLLIElement> & {
    isAuthor: boolean;
    message: Message;
}

export const Item = ({ isAuthor, message, ...rest }: Props) => {

    const { readMessage } = useChat();

    const ref = useRef<HTMLLIElement | null>(null);

    useEffect(() => {
        if (isAuthor) return;
        if (message.text.read) return;
        const el = ref.current;
        if (el) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        readMessage({ id: message.text.id });
                        observer.disconnect();
                    }
                },
                { threshold: 0.6 }
            )
            observer.observe(el);
            return () => observer.disconnect();
        }
    }, [isAuthor, message.text.id, message.text.read, readMessage])

    return (
        <li
            ref={ref}
            className={clsx(
                'overflow-hidden flex-none w-full p-2 flex items-center gap-2',
                isAuthor ? 'justify-end' : 'justify-start'
            )}
            {...rest}
        >
            {isAuthor ? null : <Avatar src={message.user.avatar} />}
            <div className={clsx(
                'relative w-fit p-2 rounded-xl flex flex-col gap-2',
                isAuthor ? 'bg-sky-200/50 rounded-tr-none' : 'bg-neutral-200 rounded-tl-none',
            )}>
                <div className={clsx(
                    'absolute top-0 w-0 h-0 border-neutral-200',
                    isAuthor
                        ? 'border-sky-200/50 -right-2 border-t-8 border-r-8 border-r-transparent'
                        : 'border-neutral-200 -left-2 border-t-8 border-l-8 border-l-transparent'
                )} />
                <header className="flex items-center justify-between gap-3">
                    <p className="truncate font-semibold text-sm text-neutral-600">
                        {message.user.displayName}
                    </p>
                    {isAuthor &&
                        <button className="cursor-pointer w-fit p-0.5 rounded-full transition-colors hover:bg-sky-300/50">
                            <IconDotsVertical size={18} className="text-neutral-600" />
                        </button>
                    }
                </header>
                <p className="text-xs text-neutral-500">{message.text.content}</p>
                <footer className="flex items-center justify-between gap-1">
                    <p className="text-2xs text-neutral-400">
                        {message.text.updated && message.text.updatedAt
                            ? `{${formatTime(message.text.createdAt)} (Editada ${formatTime(message.text.updatedAt)})`
                            : formatTime(message.text.createdAt)
                        }
                    </p>
                    <span>
                        {message.text.status === 'sending'
                            ?
                            <figure className="text-neutral-400">
                                <IconCircleDotted size={18} />
                            </figure>
                            : message.text.status === 'sent'
                                ?
                                <figure className={clsx(message.text.read ? 'text-sky-600' : 'text-neutral-400')}>
                                    <IconCheck size={18} />
                                </figure>
                                :
                                null
                        }
                    </span>
                </footer>
            </div>
        </li>
    )

}