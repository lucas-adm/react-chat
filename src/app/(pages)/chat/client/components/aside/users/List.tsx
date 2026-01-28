import { Item } from "./elements";
import { User } from "@/core/models";

type Props = React.HTMLAttributes<HTMLUListElement> & {
    users: User[];
}

export const List = ({ users, ...rest }: Props) => (
    <ul className="overflow-scroll scrollbar-hidden flex flex-col gap-3" {...rest}>
        {users.map(u => <Item key={u.id} user={u} />)}
    </ul>
)