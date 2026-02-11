import { clsx } from "clsx";

type Props = React.HTMLAttributes<HTMLDivElement> & {
    isAuthor: boolean;
}

export const SpeechBubble = ({ isAuthor, ...rest }: Props) => (
    <div
        className={clsx(
            'relative w-fit p-2 rounded-xl flex flex-col gap-2',
            isAuthor ? 'bg-sky-200/50 rounded-tr-none' : 'bg-neutral-200 rounded-tl-none'
        )}
        {...rest}
    />
)