'use client';

import { useEffect } from "react";
import { User } from "@/core/models";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks";

export const ClientRedirect = ({ user }: { user: User }) => {

    const { setUser } = useUser();
    const router = useRouter();

    useEffect(() => {
        setUser(user);
        router.push('/chat');
    }, [router, setUser, user])

    return null;

}