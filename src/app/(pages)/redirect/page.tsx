import { ClientRedirect } from "./client/ClientRedirect";
import { createUserService } from "@/core/services";

type Props = {
    searchParams: Promise<{ code: string | undefined }>
}

export default async function Page({ searchParams }: Props) {

    const { code } = await searchParams;

    if (code) {
        const { authViaGitHub } = createUserService();
        const response = await authViaGitHub(code);
        return <ClientRedirect user={response.data} />
    }

    return null;

}