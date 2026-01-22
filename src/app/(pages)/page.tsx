import { IconBrandGithubFilled } from "@tabler/icons-react";
import Link from "next/link";

export default function Page() {

  const authUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`;

  return (
    <main className="w-screen h-screen flex items-center justify-center bg-neutral-100">
      <Link
        href={authUrl}
        className="select-none relative p-2 rounded bg-black flex items-center justify-center gap-3 drop-shadow-custom transition-transform hover:translate-y-0.5"
      >
        <figure className="p-0.5 bg-white rounded-full">
          <IconBrandGithubFilled
            size={32}
            className="fill-black"
          />
        </figure>
        <span className="font-semibold text-xl text-white">
          GitHub
        </span>
      </Link>
    </main>
  )

}