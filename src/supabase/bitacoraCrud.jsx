import Swal from "sweetalert2";
import { supabase } from "./index";

// consultas para la base de datos funcinamiento especifico en equiposCrud
export const ShowBitacora = async () => {
  const { error, data } = await supabase.from("bitacoras").select(`*`);
  if (data) {
    return data;
  }
  Swal.fire({
    icon: "error",
    title: " Error show tipos",
    text: "error al obtener bitacoras " + error.message,
  });
};
