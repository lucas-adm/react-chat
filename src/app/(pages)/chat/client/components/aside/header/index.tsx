import { Avatar } from "@/components";
import { Info, Options } from "./elements";
import { Separator } from "../../utils";
import { User } from "@/core/models";

type Props = React.HTMLAttributes<HTMLElement> & {
    user: User | null;
}

export const Header = ({ user, ...rest }: Props) => {

    if (user) return (
        <>
            <header className="relative w-full p-2 rounded-xl flex items-center gap-2" {...rest}>
                <Options hidden />
                <Avatar src={user.avatar} useStatus isOnline={user.online} />
                <Info name={user.displayName} bio={user.bio} />
            </header>
            <Separator />
        </>
    )

    return null;

}