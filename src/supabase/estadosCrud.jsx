import Swal from "sweetalert2";
import { supabase } from "./index";

export const ShowEstados = async () => {
  const { error, data } = await supabase.from("estados").select(`id,nombre`);
  if (data) {
    return data;
  }
  Swal.fire({
    icon: "error",
    title: " Error show tipos",
    text: "error al traer los estados " + error.message,
  });
};
