import { Item, Title } from './elements';
import { normalize } from '@/utils';
import { Separator } from '../../utils';
import { useChat, useUser } from '@/hooks';
import { useEffect, useMemo } from 'react';
import { User } from '@/core/models';
import { useUsers } from '@/hooks/Users';

type Props = React.HTMLAttributes<HTMLUListElement> & {
  users: User[];
};

export const List = ({ users: usrs, ...rest }: Props) => {
  const { sendSnapshotReq, onSnapshot, onPresence } = useChat();
  const { user } = useUser();
  const { users, setUsers } = useUsers();

  const { online, offline } = useMemo(() => {
    if (users) {
      const online = users
        .filter((u) => u.online)
        .sort((a, b) => a.displayName.localeCompare(b.displayName));
      const offline = users
        .filter((u) => !u.online)
        .sort((a, b) => a.displayName.localeCompare(b.displayName));
      return { online, offline };
    }
    return { online: [], offline: [] };
  }, [users]);

  useEffect(() => {
    if (user) setUsers(usrs.filter((u) => u.id !== user.id));
    else setUsers(usrs);
    sendSnapshotReq();
  }, [sendSnapshotReq, setUsers, user, usrs]);

  useEffect(() => {
    onSnapshot((output) => {
      setUsers((prev) =>
        prev
          ? prev.map((u) =>
              output.includes(u.id) ? normalize.user(u, true) : u,
            )
          : prev,
      );
    });
  }, [onSnapshot, setUsers]);

  useEffect(() => {
    onPresence((output) => {
      setUsers((prev) =>
        prev
          ? prev.some((u) => u.id === output.user.id)
            ? prev.map((u) =>
                u.id === output.user.id
                  ? normalize.user(output.user, output.online)
                  : u,
              )
            : [...prev, normalize.user(output.user, output.online)]
          : [normalize.user(output.user, output.online)],
      );
    });
  }, [onPresence, setUsers]);

  if (users)
    return (
      <ul
        className="overflow-scroll scrollbar-hidden flex flex-col gap-3"
        {...rest}
      >
        <Title users={online} title="Online" />
        {online.map((u) => (
          <Item key={u.id} user={u} />
        ))}
        {online.length > 0 ? <Separator /> : null}
        <Title users={offline} title="Offline" className="saturate-50" />
        {offline.map((u) => (
          <Item key={u.id} user={u} />
        ))}
      </ul>
    );
  return null;
};
