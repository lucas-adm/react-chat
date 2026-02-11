import { clsx } from "clsx";
import { IconCheck, IconCircleDotted } from "@tabler/icons-react";
import { Message } from "@/core/models";

type Props = React.HTMLAttributes<HTMLSpanElement> & {
    msg: Message;
}

export const Status = ({ msg, ...rest }: Props) => (
    <span {...rest}>
        {msg.text.status === 'sending'
            ?
            <figure className="text-neutral-400">
                <IconCircleDotted size={18} />
            </figure>
            : msg.text.status === 'sent'
                ?
                <figure
                    className={clsx(msg.text.read ? 'text-sky-600' : 'text-neutral-400')}
                >
                    <IconCheck size={18} />
                </figure>
                :
                null
        }
    </span>
)