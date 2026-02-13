import { Dropdown, MenuItem, MenuTrigger } from "./elements";
import { IconPencil, IconX } from "@tabler/icons-react";
import { Message } from "@/core/models";
import { normalize } from "@/utils";
import { useChat, useMessages } from "@/hooks";
import { useId, useRef, useState } from "react";

type Props = {
    msg: Message;
    isAuthor: boolean;
    setEditing: React.Dispatch<React.SetStateAction<Message | null>>;
}

export const Menu = ({ msg, setEditing, isAuthor }: Props) => {

    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const menuTriggerId = useId();
    const menuId = useId();

    const { deleteMessage } = useChat();
    const { setMessages } = useMessages();

    const handleEditClick = () => {
        setEditing(msg);
    }

    const handleDeleteClick = () => {
        deleteMessage({ id: msg.text.id });
        setMessages(prev => prev
            ? prev.map(m => m.text.id === msg.text.id ? normalize.message(msg, 'deleting', null) : m)
            : prev
        )
    }

    if (msg.text.deleted) return null;

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
                <MenuItem icon={IconPencil} action="Editar" onClick={handleEditClick} />
                <MenuItem icon={IconX} action="Apagar" onClick={handleDeleteClick} />
            </Dropdown>
        </div>
    )

    return null;

}