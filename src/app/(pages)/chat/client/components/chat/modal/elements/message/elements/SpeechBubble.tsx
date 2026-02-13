import { clsx } from "clsx";

export const SpeechBubble = (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={clsx(
            'relative w-fit ml-auto p-2 rounded-xl rounded-tr-none flex flex-col gap-2',
            'bg-sky-200'
        )}
        {...props}
    />
)