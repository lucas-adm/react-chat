import { Content, DisplayName, Icon, SpeechBubble, SpeechBubbleTail, Status, Time } from "./elements";
import { Message as MessageModel } from "@/core/models";

type Props = React.HTMLAttributes<HTMLDivElement> & {
    msg: MessageModel;
}

export const Message = ({ msg, ...rest }: Props) => (
    <div className="p-2 flex-1 flex flex-col justify-end">
        <SpeechBubble {...rest}>
            <SpeechBubbleTail />
            <header className="flex items-center justify-between gap-3">
                <DisplayName>{msg.user.displayName}</DisplayName>
                <Icon />
            </header>
            <Content>{msg.text.content}</Content>
            <footer className="flex items-center justify-between gap-1">
                <Time msg={msg} />
                <Status msg={msg} />
            </footer>
        </SpeechBubble>
    </div>
)