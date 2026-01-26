import { clsx } from "clsx";

export const Separator = ({ className, ...rest }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className={clsx('border-neutral-500/10', className)} {...rest} />
)