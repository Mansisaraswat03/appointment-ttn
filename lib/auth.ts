import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';

const TOKEN_KEY = 'auth_token';

export const getToken = async() => {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_KEY)?.value;
};

export const isTokenExpired = (token: string) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp! * 1000 < Date.now();
  } catch {
    return true;
  }
};