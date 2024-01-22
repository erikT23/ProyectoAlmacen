import { supabase } from "../supabase/index";
import Swal from "sweetalert2";
import { GetIdAuthSupabase } from "./index";

export const InsertUser = async (p) => {
  const { data, error } = await supabase
    .from("users")
    .insert(p)
    .select()
    .maybeSingle();
  if (error) {
    Swal.fire({
      icon: "error",
      title: " Error",
      text: "error al insertar el usuario " + error.message,
    });
  }
  if (data) {
    return data;
  }
};
export const ShowUsers = async () => {
  const idAuthSupabase = await GetIdAuthSupabase();
  const { error, data } = await supabase
    .from("users")
    .select()
    .eq("idauth", idAuthSupabase)
    .maybeSingle();
  if (data) {
    return data;
  }
};
