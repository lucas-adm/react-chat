import { Item } from "./elements";
import { Message, User } from "@/core";

type Props = React.HTMLAttributes<HTMLUListElement> & {
    user: User | null;
    messages: Message[];
}

export const List = ({ user, messages, ...rest }: Props) => (
    <ul
        className="overflow-y-scroll scrollbar-hidden flex-1 flex flex-col gap-3"
        {...rest}
    >
        {messages.map(msg => <Item key={msg.text.id} isAuthor={user === msg.user} message={msg} />)}
    </ul>
)