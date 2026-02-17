import { ChatItem, formatDayLabel, groupMessagesByDay } from "@/utils";
import { clsx } from "clsx";
import { DaysSeparator, EditionBlur, Item, ScrollToBottom, UnreadsSeparator } from "./elements";
import { Message, User } from "@/core/models";
import { useLayoutEffect, useRef, useState } from "react";

type Props = React.HTMLAttributes<HTMLUListElement> & {
    user: User | null;
    messages: Message[];
    editing: Message | null;
    setEditing: React.Dispatch<React.SetStateAction<Message | null>>;
    firstUnreadId: string | null | undefined;
}

export const List = ({ user, messages, editing, setEditing, firstUnreadId, ...rest }: Props) => {

    const [isAtBottom, setIsAtBottom] = useState<boolean>(true);
    const listRef = useRef<HTMLUListElement | null>(null);
    const unreadsRef = useRef<HTMLLIElement | null>(null);
    const bottomRef = useRef<HTMLDivElement | null>(null);
    const isAtBottomRef = useRef<boolean>(true);

    useLayoutEffect(() => {
        if (firstUnreadId) {
            const unreads = unreadsRef.current;
            if (unreads) unreads.scrollIntoView({ behavior: "auto" });
        }
    }, [firstUnreadId])

    useLayoutEffect(() => {
        if (firstUnreadId) return;
        const list = listRef.current;
        if (list) {
            let hasResized: boolean = false;
            const scroll = () => list.scrollTop = list.scrollHeight;
            scroll();
            const observer = new ResizeObserver(() => {
                if (hasResized) return observer.disconnect();
                scroll();
                hasResized = true;
            });
            observer.observe(list);
            return () => observer.disconnect();
        }
    }, [firstUnreadId])

    useLayoutEffect(() => {
        const list = listRef.current;
        if (list) {
            const onScroll = () => {
                const threshold = 333;
                const isAtBottom = list.scrollTop + list.clientHeight >= list.scrollHeight - threshold;
                isAtBottomRef.current = isAtBottom;
                setIsAtBottom(isAtBottom);
            }
            list.addEventListener("scroll", onScroll);
            return () => list.removeEventListener("scroll", onScroll);
        }
    }, [])

    useLayoutEffect(() => {
        if (firstUnreadId) return;
        const bottom = bottomRef.current;
        if (isAtBottomRef.current && bottom) bottom.scrollIntoView({ behavior: "smooth" });
    }, [firstUnreadId, messages])

    const handleNavigation = () => {
        if (bottomRef.current) return bottomRef.current.scrollIntoView({ behavior: "auto" });
        return;
    }

    const items: ChatItem[] = groupMessagesByDay(messages, firstUnreadId ?? null);

    return (
        <>
            <ul
                ref={listRef}
                className={clsx(
                    'scrollbar-hidden',
                    'relative flex-1 flex flex-col gap-3',
                    editing ? 'overflow-y-hidden' : 'overflow-y-scroll'
                )}
                {...rest}
            >
                {items.map(item => {
                    if (item.type === 'day') return (
                        <DaysSeparator key={item.date}>
                            {formatDayLabel(item.date)}
                        </DaysSeparator>
                    )
                    if (item.type === 'unread') return (
                        <UnreadsSeparator ref={unreadsRef} key="unreads">
                            Não lidas
                        </UnreadsSeparator>
                    )
                    if (item.type === 'message') return (
                        <Item
                            key={item.message.text.id}
                            editing={editing}
                            setEditing={setEditing}
                            isAuthor={user ? user.id === item.message.user.id : false}
                            message={item.message}
                        />
                    )
                    return null;
                })}
                <EditionBlur aria-hidden="true" editing={editing} />
                <div aria-hidden="true" ref={bottomRef} />
            </ul>
            <ScrollToBottom
                isAtBottom={isAtBottom}
                editing={editing}
                onClick={handleNavigation}
            />
        </>
    )

}