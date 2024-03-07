import Swal from "sweetalert2";
import { supabase } from "./index";

export const ShowDepartamentosConCentros = async () => {
  const { error, data } = await supabase.from("centros").select(`id,nombres,departamentos(id,nombre)`);
  if (data) {
    return data;
  }
  Swal.fire({
    icon: "error",
    title: " Error show tipos",
    text: "error en el show tipos crud " + error.message,
  });
};
