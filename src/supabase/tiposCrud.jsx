import Swal from "sweetalert2";
import { supabase } from "./index";

export const ShowTipos = async () => {
  const { error, data } = await supabase.from("tipos").select(`*`);
  if (data) {
    return data;
  }
  Swal.fire({
    icon: "error",
    title: " Error show tipos",
    text: "error en el show tipos crud " + error.message,
  });
};

export const SearchTipos = async (p) => {
    const { error, data } = await supabase
      .from("marcas")
      .select()
      .ilike("nombre", "%" + p.nombre + "%");
    if (error) {
      Swal.fire({
        icon: "error",
        title: " Error search marcas",
        text: "error en el search marcas crud" + error.message,
      });
     
    }
  
    return data;
  };