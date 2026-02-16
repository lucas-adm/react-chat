import { Item } from "./elements";
import { normalize } from "@/utils";
import { useChat, useUser } from "@/hooks";
import { useEffect, useMemo } from "react";
import { User } from "@/core/models";
import { useUsers } from "@/hooks/Users";

type Props = React.HTMLAttributes<HTMLUListElement> & {
    users: User[];
}

export const List = ({ users: usrs, ...rest }: Props) => {

    const { sendSnapshotReq, onSnapshot, onPresence } = useChat();
    const { user } = useUser();
    const { users, setUsers } = useUsers();

    const sorted = useMemo(() => {
        if (users) {
            return [...users].sort((a, b) => {
                if (a.online !== b.online) return a.online ? -1 : 1;
                return a.displayName.localeCompare(b.displayName);
            })
        }
        return null;
    }, [users])

    useEffect(() => {
        if (user) setUsers(usrs.filter(u => u.id !== user.id));
        else setUsers(usrs);
        sendSnapshotReq();
    }, [sendSnapshotReq, setUsers, user, usrs]);

    useEffect(() => {
        onSnapshot((output) => {
            setUsers(prev => prev
                ? prev.map(u => output.includes(u.id) ? normalize.user(u, true) : u)
                : prev
            )
        })
    }, [onSnapshot, setUsers])

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

    if (sorted) return (
        <ul className="overflow-scroll scrollbar-hidden flex flex-col gap-3" {...rest}>
            {sorted.map(u => <Item key={u.id} user={u} />)}
        </ul>
    )

    return null;

}