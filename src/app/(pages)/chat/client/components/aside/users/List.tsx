import { Item } from "./elements";
import { normalize } from "@/utils";
import { useChat, useUser } from "@/hooks";
import { useEffect } from "react";
import { User } from "@/core/models";
import { useUsers } from "@/hooks/Users";

type Props = React.HTMLAttributes<HTMLUListElement> & {
    users: User[];
}

export const List = ({ users: usrs, ...rest }: Props) => {

    const { onPresence } = useChat();
    const { user } = useUser();
    const { users, setUsers } = useUsers();

    useEffect(() => {
        if (user) setUsers(usrs.filter(u => u.id !== user.id));
        else setUsers(usrs);
    }, [setUsers, user, usrs]);

    useEffect(() => {
        onPresence((output) => {
            setUsers(prev => prev
                ? prev.some(u => u.id === output.user.id)
                    ? prev.map(u => u.id === output.user.id ? normalize.user(output.user, output.online) : u)
                    : [...prev, normalize.user(output.user, output.online)]
                : [normalize.user(output.user, output.online)]
            )
        })
    }, [onPresence, setUsers])

    if (users) return (
        <ul className="overflow-scroll scrollbar-hidden flex flex-col gap-3" {...rest}>
            {users.map(u => <Item key={u.id} user={u} />)}
        </ul>
    )

    return null;

}