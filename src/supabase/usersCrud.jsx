import { supabase } from "./supabase.config";
import Swal from "sweetalert2";

export const InsertUser = async (p) => {
  const { data, error } = await supabase
    .from("users")
    .insert(p)
    .select()
    .maybeSingle();
  if (error) {
    Swal.fire({
      title: "Error!",
      text: "Ocurrio un error al insertar el usuario" + error.message,
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  }
  if (data) {
    return data;
  }
};
