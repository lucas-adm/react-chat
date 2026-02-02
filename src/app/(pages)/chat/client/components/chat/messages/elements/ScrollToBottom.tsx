import { clsx } from "clsx";
import { IconChevronDown } from "@tabler/icons-react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    isAtBottom: boolean;
}

export const ScrollToBottom = ({ isAtBottom, ...rest }: Props) => (
    <button
        className={clsx(
            'select-none cursor-pointer',
            'w-fit ml-auto -mt-3',
            'flex items-center',
            'transition-opacity',
            isAtBottom ? 'pointer-events-none opacity-0' : 'opacity-100',
        )}
        {...rest}
    >
        <span>
            <IconChevronDown size={20} strokeWidth={3} className="text-indigo-400" />
        </span>
    </button>
)