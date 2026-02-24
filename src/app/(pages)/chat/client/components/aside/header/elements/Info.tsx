type Props = React.HTMLAttributes<HTMLElement> & {
  name: string;
  bio: string;
};

export const Info = ({ name, bio, ...rest }: Props) => (
  <div className="w-55 flex flex-col gap-1" {...rest}>
    <p className="truncate font-semibold text-center text-indigo-200">{name}</p>
    <p title={bio} className="truncate text-center text-xs text-indigo-300">
      {bio}
    </p>
  </div>
);
