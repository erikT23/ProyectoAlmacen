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

