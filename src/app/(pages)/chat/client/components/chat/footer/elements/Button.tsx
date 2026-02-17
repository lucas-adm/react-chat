import { clsx } from 'clsx';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    icon: React.ElementType;
}

export const Button = ({ icon: Icon, className, ...rest }: Props) => (
    <button
        className={clsx(
            'cursor-pointer',
            'mb-0.5 p-1.75 rounded-full',
            'self-end flex items-center justify-center',
            'text-white',
            'bg-indigo-600',
            'transition-colors',
            'hover:grayscale-15',
            className
        )}
        {...rest}
    >
        <figure>
            <Icon size={22} />
        </figure>
    </button>
)