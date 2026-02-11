import { clsx } from "clsx";

type Props = {
    isAuthor: boolean;
}

export const SpeechBubbleTail = ({ isAuthor, ...rest }: Props) => (
    <div
        aria-hidden="true"
        className={clsx(
            'absolute top-0 w-0 h-0 border-neutral-200',
            isAuthor
                ? 'border-sky-200/50 -right-2 border-t-8 border-r-8 border-r-transparent'
                : 'border-neutral-200 -left-2 border-t-8 border-l-8 border-l-transparent'
        )}
        {...rest}
    />
)