import { ChatItem, formatDayLabel, groupMessagesByDay } from "@/utils";
import { Item, ScrollToBottom, Separator } from "./elements";
import { Message, User } from "@/core/models";
import { useLayoutEffect, useRef, useState } from "react";

type Props = React.HTMLAttributes<HTMLUListElement> & {
    user: User | null;
    messages: Message[];
    firstUnreadId: string | null;
}

export const List = ({ user, messages, firstUnreadId, ...rest }: Props) => {

    const [isAtBottom, setIsAtBottom] = useState<boolean>(true);
    const listRef = useRef<HTMLUListElement | null>(null);
    const bottomRef = useRef<HTMLDivElement | null>(null);
    const isAtBottomRef = useRef(true);

    useLayoutEffect(() => {
        const list = listRef.current;
        if (list) {
            const scroll = () => list.scrollTop = list.scrollHeight;
            scroll();
            const observer = new ResizeObserver(scroll);
            observer.observe(list);
            return () => observer.disconnect();
        }
    }, [])

    useLayoutEffect(() => {
        const list = listRef.current;
        if (list) {
            const onScroll = () => {
                const threshold = 10;
                const isAtBottom = list.scrollTop + list.clientHeight >= list.scrollHeight - threshold;
                isAtBottomRef.current = isAtBottom;
                setIsAtBottom(isAtBottom);
            }
            list.addEventListener("scroll", onScroll);
            return () => list.removeEventListener("scroll", onScroll);
        }
    }, [])

    useLayoutEffect(() => {
        const bottom = bottomRef.current;
        if (isAtBottomRef.current && bottom) bottom.scrollIntoView({ behavior: "smooth" });
    }, [messages])

    const handleNavigation = () => {
        if (bottomRef.current) return bottomRef.current.scrollIntoView({ behavior: "auto" })
        return;
    }

    const items: ChatItem[] = groupMessagesByDay(messages, firstUnreadId ?? null);

    return (
        <>
            <ul
                ref={listRef}
                className="overflow-y-scroll scrollbar-hidden flex-1 flex flex-col gap-3"
                {...rest}
            >
                {items.map(item => {
                    if (item.type === 'day') return (
                        <Separator key={item.date}>
                            {formatDayLabel(item.date)}
                        </Separator>
                    )
                    if (item.type === 'unread') return (
                        <Separator key="unreads">
                            Não lidas
                        </Separator>
                    )
                    if (item.type === 'message') return (
                        <Item
                            key={item.message.text.id}
                            isAuthor={user ? user.id === item.message.user.id : false}
                            message={item.message}
                        />
                    )
                    return null;
                })}
                <div aria-hidden ref={bottomRef} />
            </ul>
            <ScrollToBottom isAtBottom={isAtBottom} onClick={handleNavigation} />
        </>
    )

}