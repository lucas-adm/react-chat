import { clsx } from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    icon: React.ElementType;
    action: string;
}

export const MenuItem = ({ icon: Icon, action, ...rest }: Props) => (
    <button
        type="button"
        className={clsx(
            'cursor-pointer',
            'p-2',
            'flex items-center justify-center gap-2',
            'hover:bg-neutral-200'
        )}
        {...rest}
    >
        <span aria-hidden="true"><Icon size={12} /></span>
        <span className="text-xs">{action}</span>
    </button>
)