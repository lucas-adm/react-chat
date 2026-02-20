import { Client } from './client';
import { createMessageService, createUserService } from '@/core/services';

export default async function Page() {
  const { findUsers } = createUserService();
  const { findMessages } = createMessageService();

  const users = await findUsers();
  const messages = await findMessages();

  return <Client users={users.data} messages={messages.data} />;
}
