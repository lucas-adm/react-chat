import { clsx } from "clsx";
import { Message } from "@/core/models"

type Props = React.HTMLAttributes<HTMLDivElement> & {
    editing: Message | null;
}

export const EditionBlur = ({ editing, ...rest }: Props) => (
    <div
        className={clsx(
            'pointer-events-none select-none',
            'fixed w-full h-full',
            'transition-all duration-333 ease-linear',
            editing
                ? 'bg-neutral-100/50 backdrop-blur-xs'
                : 'bg-transparent backdrop-blur-none'
        )}
        {...rest}
    />
)