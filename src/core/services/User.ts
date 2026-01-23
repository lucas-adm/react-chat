import { createHttpClient } from "../http";
import { User } from "../models";

export function createUserService() {

    const url: string = process.env.API!;
    const api = createHttpClient(url);

    async function authViaGitHub(code: string) {
        return api.post<User>('/users/auth', { code });
    }

    async function findUsers() {
        return api.get<User[]>('/users', undefined);
    }

    return { authViaGitHub, findUsers };

}