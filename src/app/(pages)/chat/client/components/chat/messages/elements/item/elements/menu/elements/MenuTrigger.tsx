import { forwardRef, SetStateAction } from "react";
import { IconDotsVertical } from "@tabler/icons-react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    isMenuOpen: boolean;
    setIsMenuOpen: React.Dispatch<SetStateAction<boolean>>;
}

export const MenuTrigger = forwardRef<HTMLButtonElement, Props>(({ isMenuOpen, setIsMenuOpen, ...rest }, ref) => (
    <button
        ref={ref}
        aria-label="Opções"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="cursor-pointer relative w-fit p-0.5 rounded-full transition-colors hover:bg-neutral-100 focus:bg-neutral-100"
        {...rest}
    >
        <IconDotsVertical size={18} className="text-neutral-600" />
    </button>
))

MenuTrigger.displayName = 'MenuTrigger';