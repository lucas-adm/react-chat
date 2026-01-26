import { IconArrowRight } from "@tabler/icons-react";

export const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
        className="cursor-pointer px-2 p-1 rounded-full flex items-center justify-center bg-indigo-600 transition-colors hover:grayscale-15"
        {...props}
    >
        <figure className="text-white">
            <IconArrowRight size={22} />
        </figure>
    </button>
)