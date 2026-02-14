import { clsx } from "clsx";
import { IconChevronDown } from "@tabler/icons-react";
import { Message } from "@/core/models";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    isAtBottom: boolean;
    editing: Message | null;
}

export const ScrollToBottom = ({ isAtBottom, editing, ...rest }: Props) => (
    <button
        className={clsx(
            'select-none cursor-pointer',
            'w-fit ml-auto px-3',
            'flex items-center',
            'transition-opacity',
            editing || isAtBottom ? 'pointer-events-none opacity-0' : 'opacity-100',
        )}
        {...rest}
    >
        <span>
            <IconChevronDown size={20} strokeWidth={3} className="text-indigo-400" />
        </span>
    </button>
)