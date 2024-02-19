import Swal from "sweetalert2";
import { supabase } from "./index";

export const ShowModelos = async () => {
  const { data, error } = await supabase
    .from("modelos")
    .select("nombre,marcas(nombre),tipos(nombre)");
  if (data) {
    return data;
  }
  Swal.fire({
    icon: "error",
    title: " Error show modelos",
    text: "error en el show modelos crud " + error.message,
  });
};

export const CountModelos = async () => {
  const { data, error } = await supabase
    .from("modelos")
    .select(`modelos(count)`);

  if (data) {
    return data;
  }

  Swal.fire({
    icon: "error",
    title: " Error count modelos",
    text: "error en el count modelos crud " + error.message,
  });
};

export const InsertModelos = async (p) => {
  const { error } = await supabase
    .from("modelos")
    .insert([
      { nombre: p.nombre, marcas_id: p.marcas_id, tipos_id: p.tipos_id },
    ])
    .select();

  if (error) {
    Swal.fire({
      icon: "error",
      title: " Error insert modelos",
      text: "error en el insert modelos crud " + error.message,
    });
  }
};

export const EditModelos = async (p) => {
  const { error } = await supabase
    .from("modelos")
    .update({ nombre: p.nombre, marcas_id: p.marcas_id, tipos_id: p.tipos_id })
    .eq("id", p.id);
  if (error) {
    Swal.fire({
      icon: "error",
      title: " Error edit modelos",
      text: "error en el edit modelos crud" + error.message,
    });
  }
};

export const DeleteModelos = async (p) => {
  const { error } = await supabase.from("modelos").delete().eq("id", p.id);
  if (error) {
    Swal.fire({
      icon: "error",
      title: " Error delete modelos",
      text: "error en el delete modelos crud " + error.message,
    });
  }
};

export const SearchModelos = async (p) => {
  const { error, data } = await supabase
    .from("modelos")
    .select()
    .ilike("nombre", "%" + p.nombre + "%");
  if (error) {
    Swal.fire({
      icon: "error",
      title: " Error search marcas",
      text: "error en el search modelos crud" + error.message,
    });
  }

  return data;
};
