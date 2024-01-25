import Swal from "sweetalert2";
import { supabase } from "./index";

export const ShowTest = async (p) => {
  const { error, data } = await supabase
    .from("permisos")
    .select(`users (nombre, rol )`)
    .eq("id_user", p.id_user)
    .maybeSingle();
  if (data) {
    return data;
  }
  Swal.fire({
    icon: "error",
    title: " Error",
    text: "error en el test crud " + error.message,
  });
};

export const CountTest = async (p) => {
  const { data, error } = await supabase
    .from("users")
    .select(` permisos(count)`)
    .eq("id", p.id_user);
  if (data) {
    return data;
  }
  Swal.fire({
    icon: "error",
    title: " Error",
    text: "error en el test count " + error.message,
  });
};
