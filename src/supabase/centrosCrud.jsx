import Swal from "sweetalert2";
import { supabase } from "./index";

export const ShowCentros = async () => {
  const { error, data } = await supabase
    .from("centros")
    .select("id,nombres,departamentos(id,nombre)");
  if (data) {
    return data;
  }
  Swal.fire({
    icon: "error",
    title: "Error",
    text: "Error al cargar los datos " + error.message,
  });
};

export const InsertCentros = async (p) => {
  const { error } = await supabase
    .from("centros")
    .insert([{ nombres: p.nombres }]);
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Error al insertar el centro " + error.message,
    });
  }
};

export const EditCentros = async (p) => {
  const { error } = await supabase.from("centros").update(p).eq("id", p.id);
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Error al editar el centro " + error.message,
    });
  }
};

export const DeleteCentros = async (p) => {
  const { error } = await supabase.from("centros").delete().eq("id", p.id);
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Error al eliminar el centro " + error.message,
    });
  }
};
