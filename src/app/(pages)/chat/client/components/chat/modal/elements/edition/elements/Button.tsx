type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    icon: React.ElementType;
}

export const Button = ({ icon: Icon, ...rest }: Props) => (
    <button
        className="cursor-pointer px-2 p-1 rounded-full flex items-center justify-center bg-indigo-600 transition-colors hover:grayscale-15"
        {...rest}
    >
        <figure className="text-white">
            <Icon size={22} />
        </figure>
    </button>
)