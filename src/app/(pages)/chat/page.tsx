import Image from "next/image";

const Page = () => {
    return (
        <main className="w-screen h-screen flex items-center justify-items-center bg-neutral-100 p-2 inmd:p-0">
            <section className="w-full max-w-222 h-full max-h-166.5 inmd:max-h-full mx-auto flex bg-neutral-100 rounded-2xl inmd:rounded-none overflow-hidden border border-neutral-200">
                <aside className="inmd:hidden bg-neutral-200/25 w-66 h-full border-r p-3 border-neutral-200 flex-none flex flex-col gap-3">
                    <header className="relative w-full p-2 rounded-xl flex items-center gap-2">
                        <div className="cursor-pointer absolute top-0 right-0 p-1 bg-neutral-200 rounded-md">
                            &#8942;
                        </div>
                        <figure className="select-none relative flex-none">
                            <Image src='https://placehold.co/64x64.png' alt="" width={64} height={0} className="pointer-events-none rounded-full border border-neutral-300" />
                            <div className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-emerald-500/25 rounded-full">
                                <div className="absolute top-1/2 left-1/2 -translate-1/2 w-3 h-3 bg-green-500/75 rounded-full">
                                </div>
                            </div>
                        </figure>
                        <div className="w-37 flex flex-col gap-1">
                            <p className="truncate font-semibold text-sm text-neutral-600">Lucas de Moraes</p>
                            <p title="Message" className="truncate text-xs text-neutral-500">Message</p>
                        </div>
                    </header>
                    <hr className="border-neutral-500/10" />
                    <div className="flex flex-col gap-3">
                        <div className="overflow-hidden w-full p-2 rounded-xl flex items-center gap-2 bg-neutral-200">
                            <figure className="select-none relative flex-none">
                                <Image src='https://placehold.co/64x64.png' alt="" width={64} height={0} className="pointer-events-none rounded-full border border-neutral-300" />
                                <div className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-emerald-500/25 rounded-full">
                                    <div className="absolute top-1/2 left-1/2 -translate-1/2 w-3 h-3 bg-green-500/75 rounded-full">
                                    </div>
                                </div>
                            </figure>
                            <div className="w-37 flex flex-col gap-1">
                                <p className="truncate font-semibold text-sm text-neutral-600">Saladino</p>
                                <p title="Message" className="truncate text-xs text-neutral-500">Message</p>
                            </div>
                        </div>
                        <div className="overflow-hidden w-full p-2 rounded-xl flex items-center gap-2 bg-neutral-200 grayscale-100">
                            <figure className="select-none  relative flex-none">
                                <Image src='https://placehold.co/64x64.png' alt="" width={64} height={0} className="pointer-events-none rounded-full border border-neutral-300" />
                                <div className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-emerald-500/25 rounded-full">
                                    <div className="absolute top-1/2 left-1/2 -translate-1/2 w-3 h-3 bg-green-500/75 rounded-full">
                                    </div>
                                </div>
                            </figure>
                            <div className="w-37 flex flex-col gap-1">
                                <p className="truncate font-semibold text-sm text-neutral-600">Bruno Aiub</p>
                                <p title="Sou mais louco que todos vocês!" className="truncate text-xs text-neutral-500">Sou mais louco que todos vocês!</p>
                            </div>
                        </div>
                    </div>
                </aside>
                <div className="w-full p-3 flex flex-col gap-3">
                    <header className="w-fit mx-auto p-2 rounded-xl flex items-center justify-center gap-6">
                        <figure className="select-none relative flex-none">
                            <Image src='https://placehold.co/64x64.png' alt="" width={64} height={0} className="pointer-events-none rounded-full" />
                        </figure>
                        <div className="w-full flex flex-col gap-1">
                            <p className="truncate font-semibold text-2xl inmd:text-xl text-neutral-600">chat dos campeões</p>
                        </div>
                    </header>
                    <hr className="border-neutral-500/10" />
                    <div className="flex-1 flex flex-col gap-3 overflow-y-scroll scrollbar-hidden">
                        <div className="overflow-hidden flex-none w-full p-2 flex items-center gap-2">
                            <figure className="select-none relative flex-none self-start">
                                <Image src='https://placehold.co/64x64.png' alt="" width={64} height={0} className="pointer-events-none rounded-full" />
                            </figure>
                            <div className="relative w-fit flex flex-col gap-2 bg-neutral-200 p-2 rounded-xl rounded-tl-none">
                                <div className="absolute top-0 -left-2 w-0 h-0 border-t-8 border-l-8 border-neutral-200 border-l-transparent" />
                                <div className="cursor-pointer absolute top-1 right-3 p-0.5 bg-neutral-300 rounded-md">
                                    &#8942;
                                </div>
                                <header>
                                    <p className="truncate font-semibold text-sm text-neutral-600">Bruno Aiub</p>
                                </header>
                                <p className="text-xs text-neutral-500 drop">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi consequatur est numquam labore, minus deserunt suscipit sequi similique ipsa, hic voluptate cupiditate perspiciatis vitae quo saepe amet, voluptatem perferendis molestiae.</p>
                                <footer className="flex items-center justify-between">
                                    <p className="text-2xs text-neutral-400">11:11 - (Editada 12:12)</p>
                                    <span className="pr-2 text-xs text-sky-600">✔</span>
                                </footer>
                            </div>
                        </div>
                        <div className="overflow-hidden flex-none w-full p-2 flex flex-row-reverse items-center gap-2">
                            <div className="relative w-fit flex flex-col gap-2 bg-indigo-100 p-2 rounded-xl rounded-tr-none">
                                <div className="absolute top-0 -right-2 w-0 h-0 border-t-8 border-r-8 border-indigo-100 border-r-transparent" />
                                <div className="cursor-pointer w-fit p-0.5 bg-indigo-200 rounded-md">&#8942;</div>
                                <p className="text-xs text-neutral-500 drop">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi consequatur est numquam labore, minus deserunt suscipit sequi similique ipsa, hic voluptate cupiditate perspiciatis vitae quo saepe amet, voluptatem perferendis molestiae.</p>
                                <footer className="flex flex-row-reverse items-center justify-between">
                                    <p className="text-2xs text-neutral-400">11:11</p>
                                    <span className="pr-2 text-xs text-neutral-400">✔</span>
                                </footer>
                            </div>
                        </div>
                        <div className="overflow-hidden flex-none w-full p-2 flex flex-row-reverse items-center gap-2">
                            <div className="relative w-fit flex flex-col gap-2 bg-indigo-100 p-2 rounded-xl rounded-tr-none">
                                <div className="absolute top-0 -right-2 w-0 h-0 border-t-8 border-r-8 border-indigo-100 border-r-transparent" />
                                <div className="cursor-pointer w-fit p-0.5 bg-indigo-200 rounded-md">&#8942;</div>
                                <p className="text-xs text-neutral-500 drop">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi consequatur est numquam labore, minus deserunt suscipit sequi similique ipsa, hic voluptate cupiditate perspiciatis vitae quo saepe amet, voluptatem perferendis molestiae.</p>
                                <footer className="flex flex-row-reverse items-center justify-between">
                                    <p className="text-2xs text-neutral-400">11:11</p>
                                    <span className="pr-2 text-xs text-neutral-400">◌</span>
                                </footer>
                            </div>
                        </div>
                        <div className="overflow-hidden flex-none w-full p-2 flex items-center gap-2">
                            <figure className="select-none relative flex-none self-start">
                                <Image src='https://placehold.co/64x64.png' alt="" width={64} height={0} className="pointer-events-none rounded-full" />
                            </figure>
                            <div className="relative w-fit flex flex-col gap-2 bg-neutral-200 p-2 rounded-xl rounded-tl-none">
                                <div className="absolute top-0 -left-2 w-0 h-0 border-t-8 border-l-8 border-neutral-200 border-l-transparent" />
                                <div className="cursor-pointer absolute top-1 right-3 p-0.5 bg-neutral-300 rounded-md">
                                    &#8942;
                                </div>
                                <header>
                                    <p className="truncate font-semibold text-sm text-neutral-600">Bruno Aiub</p>
                                </header>
                                <p className="text-xs text-neutral-500 drop">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi consequatur est numquam labore, minus deserunt suscipit sequi similique ipsa, hic voluptate cupiditate perspiciatis vitae quo saepe amet, voluptatem perferendis molestiae.</p>
                                <footer className="flex items-center justify-between">
                                    <p className="text-2xs text-neutral-400">11:11 - (Editada 12:12)</p>
                                    <span className="pr-2 text-xs text-sky-600">✔</span>
                                </footer>
                            </div>
                        </div>
                    </div>
                    <footer className="flex gap-3">
                        <textarea
                            placeholder="Escreva sua mensagem"
                            rows={1}
                            className="resize-none outline-none w-full px-4 py-2 rounded-full border border-neutral-200 text-sm"
                        />
                        <div className="p-1 bg-indigo-600 rounded-full flex items-center justify-center">
                            <figure className="text-white">
                                ➡
                            </figure>
                        </div>
                    </footer>
                </div>
            </section>
        </main>
    )
}

export default Page;