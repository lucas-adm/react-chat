'use client';

import { normalize } from "@/utils";
import { useEffect } from "react";
import { User } from "@/core/models";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks";

export const ClientRedirect = ({ user }: { user: User }) => {

    const { setUser } = useUser();
    const router = useRouter();

    useEffect(() => {
        setUser(normalize.user(user, true));
        router.push('/chat');
    }, [router, setUser, user])

    return null;

}