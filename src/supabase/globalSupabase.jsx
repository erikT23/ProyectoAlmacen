import { supabase } from "../index";

export const GetIdAuthSupabase = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session != null) {
    console.log("info en session", session);
    const { user } = session;
    const idAuthSupabase = user.id;
    return idAuthSupabase;
  }
};
