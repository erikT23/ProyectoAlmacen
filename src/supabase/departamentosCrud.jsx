import Swal from "sweetalert2";
import { supabase } from "./index";

export const ShowDepartamentos = async () => {
  const { error, data } = await supabase.from("departamentos").select("*");
  if (data) {
    return data;
  }
  Swal.fire({
    icon: "error",
    title: "Error",
    text: "Error al cargar los datos " + error.message,
  });
};

export const ShowDepartamentosyCentros = async () => {
  const { error, data } = await supabase
    .from("departamentos_en_centros")
    .select("id,departamentos(id,nombre),centros(id,nombres)");
  if (data) {
    return data;
  }
  Swal.fire({
    icon: "error",
    title: "Error",
    text: "Error al cargar los datos " + error.message,
  });
};

export const InsertDepartamentosyCentros = async (p) => {
  const { error } = await supabase.from("departamentos_en_centros").insert(p);
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Error al insertar el centro " + error.message,
    });
  }
};

export const EditDepartamentosyCentros = async (p) => {
  const { error } = await supabase
    .from("departamentos_en_centros")
    .update(p)
    .eq("id", p.id);
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Error al editar el centro " + error.message,
    });
  }
};

export const DeleteDepartamentoyCentros = async (p) => {
  const { error } = await supabase
    .from("departamentos_en_centros")
    .delete()
    .eq("id", p.id);
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Error al eliminar el centro " + error.message,
    });
  }
};

export const InsertDepartamentos = async (p) => {
  const { error } = await supabase.from("departamentos").insert(p);
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Error al insertar el centro " + error.message,
    });
  }
};

export const EditDepartamentos = async (p) => {
  const { error } = await supabase
    .from("departamentos")
    .update(p)
    .eq("id", p.id);
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Error al editar el centro " + error.message,
    });
  }
};

export const DeleteDepartamentos = async (p) => {
  const { error } = await supabase
    .from("departamentos")
    .delete()
    .eq("id", p.id);
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Error al eliminar el centro " + error.message,
    });
  }
};