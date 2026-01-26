import { clsx } from "clsx";
import Image from "next/image";

type Props = React.HTMLAttributes<HTMLElement> & {
    src: string;
    size?: number;
    useStatus?: boolean;
    isOnline?: boolean;
}

export const Avatar = ({ src, size = 64, useStatus, isOnline, className, ...rest }: Props) => (
    <figure className="select-none relative flex-none" {...rest}>
        <Image
            src={src}
            alt=""
            width={size}
            height={0}
            className={clsx('pointer-events-none rounded-full border border-neutral-300', className)}
        />
        {useStatus && (
            <div className={clsx(
                'absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full bg-emerald-500/25',
                isOnline ? 'grayscale-0' : 'grayscale-100'
            )}>
                <div className="absolute top-1/2 left-1/2 -translate-1/2 w-3 h-3 rounded-full bg-green-500/75" />
            </div>
        )}
    </figure>
)