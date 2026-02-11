import { Dropdown, MenuItem, MenuTrigger } from "./elements";
import { IconPencil, IconX } from "@tabler/icons-react";
import { useId, useRef, useState } from "react";

type Props = {
    isAuthor: boolean;
}

export const Menu = ({ isAuthor }: Props) => {

    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const menuTriggerId = useId();
    const menuId = useId();

    if (isAuthor) return (
        <div className="relative">
            <MenuTrigger
                ref={triggerRef}
                id={menuTriggerId}
                aria-controls={menuId}
                aria-haspopup="menu"
                aria-expanded={isDropdownOpen}
                isMenuOpen={isDropdownOpen}
                setIsMenuOpen={setIsDropdownOpen}
            />
            <Dropdown
                id={menuId}
                role="menu"
                aria-labelledby={menuTriggerId}
                aria-orientation="vertical"
                aria-hidden={!isDropdownOpen}
                triggerRef={triggerRef}
                isDropdownOpen={isDropdownOpen}
                setIsDropdownOpen={setIsDropdownOpen}
            >
                <MenuItem icon={IconPencil} action="Editar" />
                <MenuItem icon={IconX} action="Apagar" />
            </Dropdown>
        </div>
    )

    return null;

}