type Props = React.HTMLAttributes<HTMLElement> & {
  name: string;
  bio: string;
};

export const Info = ({ name, bio, ...rest }: Props) => (
  <div className="w-37 flex flex-col gap-1" {...rest}>
    <p className="truncate font-semibold text-sm text-indigo-200">{name}</p>
    <p title={bio} className="truncate text-xs text-indigo-300">
      {bio}
    </p>
  </div>
);
