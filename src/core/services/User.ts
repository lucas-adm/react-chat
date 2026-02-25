import { createHttpClient } from '../http';
import { User } from '../models';

export function createUserService() {
  const url: string = process.env.API!;
  const api = createHttpClient(url);

  async function authViaRandomUser() {
    return api.get<User>('/users/random', undefined);
  }

  async function authViaGitHub(code: string) {
    return api.post<User>('/users/github', { code });
  }

  async function findUsers() {
    return api.get<User[]>('/users', undefined);
  }

  return { authViaRandomUser, authViaGitHub, findUsers };
}
