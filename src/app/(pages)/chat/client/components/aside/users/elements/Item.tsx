import { Avatar } from "@/components"
import { User } from "@/core";

type Props = React.LiHTMLAttributes<HTMLLIElement> & {
    user: User
}

export const Item = ({ user, ...rest }: Props) => (
    <li
        className="overflow-hidden flex-none w-full p-2 rounded-xl flex items-center gap-2 bg-neutral-200"
        {...rest}
    >
        <Avatar src={user.avatar} useStatus isOnline={false} />
        <div className="w-37 flex flex-col gap-1">
            <p className="truncate font-semibold text-sm text-neutral-600">{user.displayName}</p>
            <p title="Message" className="truncate text-xs text-neutral-500">{user.bio}</p>
        </div>
    </li>
)