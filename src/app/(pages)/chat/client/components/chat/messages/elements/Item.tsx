import { Avatar } from "@/components";
import { clsx } from "clsx";
import { IconCheck, IconDotsVertical } from "@tabler/icons-react";
import { Message } from "@/core/models";

type Props = React.LiHTMLAttributes<HTMLLIElement> & {
    isAuthor: boolean;
    message: Message;
}

export const Item = ({ isAuthor, message, ...rest }: Props) => (
    <li
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
                    {message.text.updated
                        ? `{${message.text.createdAt} (Editada ${message.text.updatedAt})`
                        : message.text.createdAt
                    }
                </p>
                <span className={clsx(message.text.read ? 'text-sky-600' : 'text-neutral-400')}>
                    <IconCheck size={18} />
                </span>
            </footer>
        </div>
    </li>
)