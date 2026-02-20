import { clsx } from 'clsx';
import { IconBrandGithub } from "@tabler/icons-react";
import Link from "next/link";

export default function Page() {
  return (
    <Link
      href={`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`}
      className={clsx(
        'group',
        'outline-none',
        'absolute top-1/2 left-1/2 -translate-1/2',
        'p-2 rounded-full border-4 border-indigo-50',
        'bg-transparent',
        'drop-shadow-[0_0_48px] drop-shadow-transparent',
        'transition-all duration-333 ease-linear',
        'hover:border-transparent hover:bg-indigo-50 hover:drop-shadow-indigo-50',
        'focus-visible:border-transparent focus-visible:bg-indigo-50 focus-visible:drop-shadow-indigo-50',
        'active:scale-85'
      )}
    >
      <IconBrandGithub
        size={48}
        className={clsx(
          'text-indigo-50',
          'drop-shadow-[0_0_1px] drop-shadow-transparent',
          'scale-75',
          'transition-all duration-333 ease-linear',
          'group-hover:text-indigo-600 group-hover:scale-100 group-hover:drop-shadow-indigo-400',
          'group-focus-visible:text-indigo-600 group-focus-visible:scale-100'
        )}
      />
    </Link>
  )
}