import { Chat } from "./client";
import { createMessageService, createUserService } from "@/core";

export default async function Page() {

    const { findUsers } = createUserService();
    const { findMessages } = createMessageService();

    const users = await findUsers();
    const messages = await findMessages();

    return <Chat users={users.data} messages={messages.data} />;

}