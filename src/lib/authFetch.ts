import { supabase } from "@/lib/supabase";

/**
 * fetch wrapper that attaches the current Supabase session's access token
 * as a Bearer Authorization header. Needed for protected /api/admin routes.
 */
export async function authFetch(input: RequestInfo | URL, init: RequestInit = {}) {
  const { data: { session } } = await supabase.auth.getSession();
  const headers = new Headers(init.headers);
  if (session?.access_token) {
    headers.set("Authorization", `Bearer ${session.access_token}`);
  }
  return fetch(input, { ...init, headers });
}
