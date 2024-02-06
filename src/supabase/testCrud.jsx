import Swal from "sweetalert2";
import { supabase } from "./index";

export const ShowTest = async () => {
  const { error, data } = await supabase
    .from("departamentos")
    .select(`departamentos_en_centros (*)`)
    .maybeSingle();
  if (data) {
    console.log("data en show test", data);
    return data;
  }
  Swal.fire({
    icon: "error",
    title: " Error show test",
    text: "error en el test crud " + error.message,
  });
};

export const CountTest = async () => {
  const { data, error } = await supabase
    .from("centros")
    .select(` departamentos_en_centros(count)`);

  if (data) {
    return data;
  }
  Swal.fire({
    icon: "error",
    title: " Error count test",
    text: "error en el test count " + error.message,
  });
};
