import { clsx } from "clsx";

export const SpeechBubbleTail = (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        aria-hidden="true"
        className={clsx(
            'absolute top-0 -right-2 w-0 h-0',
            'border-t-8 border-r-8 border-neutral-200 border-r-transparent',
            'border-sky-200'
        )}
        {...props}
    />
)