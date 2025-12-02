const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8009/api/v1";

export interface CurrentUser {
  id: number;
  rut: string;
  nombres: string;
  apellidos: string;
  email: string;
  rol: string;
  activo: boolean;
  foto_url?: string | null;
  sancionado?: boolean;
}

const TOKEN_KEY = "auth_token";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.detail || "No se pudo iniciar sesión");
  }

  const data = await res.json();
  const token = data?.data?.token;
  if (token) setToken(token);
  return data;
}

export async function fetchCurrentUser(): Promise<CurrentUser | null> {
  const token = getToken();
  if (!token) return null;

  const res = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    if (res.status === 401) {
      clearToken();
      return null;
    }
    const err = await res.json().catch(() => null);
    throw new Error(err?.detail || "No se pudo obtener el usuario");
  }

  const data = await res.json();
  return data?.data as CurrentUser;
}
