import Swal from "sweetalert2";
import { supabase } from "./index";

export const ShowMarcas = async () => {
  const { error, data } = await supabase.from("marcas").select(`id,nombre`);
  if (data) {
    return data;
  }
  Swal.fire({
    icon: "error",
    title: " Error show marcas",
    text: "error en el show marcas crud " + error.message,
  });
};

export const CountMarcas = async () => {
  const { data, error } = await supabase.from("marcas").select(`marcas(count)`);

  if (data) {
    return data;
  }
  Swal.fire({
    icon: "error",
    title: " Error count marcas",
    text: "error en el count marcas crud " + error.message,
  });
};

export const InsertMarcas = async (p) => {
  const { error } = await supabase
    .from("marcas")
    .insert([{ nombre: p.nombre }])
    .select();

  if (error) {
    Swal.fire({
      icon: "error",
      title: " Error insert marcas",
      text: "error en el insert marcas crud " + error.message,
    });
  }
};

export const EditMarcas = async (p) => {
  const { error } = await supabase.from("marcas").update(p).eq("id", p.id);
  if (error) {
    Swal.fire({
      icon: "error",
      title: " Error edit marcas",
      text: "error en el edit marcas crud" + error.message,
    });
  }
};

export const DetleMarcas = async (p) => {
  const { error } = await supabase.from("marcas").delete().eq("id", p.id);
  if (error) {
    Swal.fire({
      icon: "error",
      title: " Error delete marcas",
      text: "error en el delete marcas crud" + error.message,
    });
  }
};

export const SearchMarcas = async (p) => {
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
