import Swal from "sweetalert2";
import { supabase } from "./index";

export const ShowEquipos = async () => {
  const { error, data } = await supabase
    .from("equipos")
    .select(
      "*,tipos(nombres),marcas(nombre),centros(nombres),estados(nombre),departamentos(nombre)"
    );
  if (data) {
    return data;
  }
  Swal.fire({
    icon: "error",
    title: " Error show equipos",
    text: "error en el show equipos crud " + error.message,
  });
};

export const CountEquipos = async () => {
  const { data, error } = await supabase
    .from("equipos")
    .select(`equipos(count)`);

  if (data) {
    return data;
  }
  Swal.fire({
    icon: "error",
    title: " Error count equipos",
    text: "error en el count equipos crud " + error.message,
  });
};

export const InsertEquipos = async (p) => {
  const { error } = await supabase.from("equipos").insert([
    {
      nombre_equipo: p.nombre_equipo,
      nombre_usuario: p.nombre_usuario,
      apellido_usuario: p.apellido_usuario,
      numSerie: p.numSerie,
      inicio_garantia: p.inicio_garantia,
      fin_garantia: p.fin_garantia,
      sistema_operativo: p.sistema_operativo,
      direccion_ip: p.direccion_ip,
      tipo_id: p.tipo_id,
      marca_id: p.marca_id,
      centro_id: p.centro_id,
      estado_id: p.estado_id,
    },
  ]);
  if (error) {
    Swal.fire({
      icon: "error",
      title: " Error insert marcas",
      text: "error en el insert marcas crud " + error.message,
    });
  }
};

export const EditEquipos = async (p) => {
  const { error } = await supabase
    .from("equipos")
    .update({
      nombre_equipo: p.nombre_equipo,
      nombre_usuario: p.nombre_usuario,
      apellido_usuario: p.apellido_usuario,
      numSerie: p.numSerie,
      inicio_garantia: p.inicio_garantia,
      fin_garantia: p.fin_garantia,
      sistema_operativo: p.sistema_operativo,
      direccion_ip: p.direccion_ip,
      tipo_id: p.tipo_id,
      marca_id: p.marca_id,
      centro_id: p.centro_id,
      estado_id: p.estado_id,
    })
    .eq("id", p.id);
  if (error) {
    Swal.fire({
      icon: "error",
      title: " Error edit equipos",
      text: "error en el edit equipos crud" + error.message,
    });
  }
};

export const DeleteEquipos = async (p) => {
  const { error } = await supabase.from("equipos").delete().eq("id", p.id);
  if (error) {
    Swal.fire({
      icon: "error",
      title: " Error delete equipos",
      text: "error en el delete equipos crud" + error.message,
    });
  }
};

export const ShowEquiposByCentro = async (p) => {
  const { error, data } = await supabase
    .from("equipos")
    .select("*")
    .eq("centro_id", p.centro_id);
  if (data) {
    return data;
  }
  Swal.fire({
    icon: "error",
    title: " Error show equipos by centro",
    text: "error en el show equipos by centro crud " + error.message,
  });
};

export const SearchEquipos = async (p) => {
  const { error, data } = await supabase
    .from("equipos")
    .select("*")
    .ilike("nombre_equipo", `%${p.nombre_equipo}%`);
  if (data) {
    return data;
  }
  Swal.fire({
    icon: "error",
    title: " Error search equipos",
    text: "error en el search equipos crud " + error.message,
  });
};

export const ShowEquiposByEstado = async (p) => {
  const { error, data } = await supabase
    .from("equipos")
    .select("*")
    .eq("estado_id", p.estado_id);
  if (data) {
    return data;
  }
  Swal.fire({
    icon: "error",
    title: " Error show equipos by estado",
    text: "error en el show equipos by estado crud " + error.message,
  });
};

export const ShowEquiposByTipo = async (p) => {
  const { error, data } = await supabase
    .from("equipos")
    .select("*")
    .eq("tipo_id", p.tipo_id);
  if (data) {
    return data;
  }
  Swal.fire({
    icon: "error",
    title: " Error show equipos by tipo",
    text: "error en el show equipos by tipo crud " + error.message,
  });
};

export const ShowEquiposByMarca = async (p) => {
  const { error, data } = await supabase
    .from("equipos")
    .select(
      "*,tipos(nombres),marcas(nombre),centros(nombres),estados(nombre),departamentos(nombre)"
    )
    .eq("marca_id", p.marca_id);
  if (data) {
    return data;
  }
  Swal.fire({
    icon: "error",
    title: " Error show equipos by marca",
    text: "error en el show equipos by marca crud " + error.message,
  });
};

export const ShowDepartamentoByEquipo = async (p) => {
  const { error, data } = await supabase
    .from("equipos")
    .select("departamento_id")
    .eq("id", p.id);
  if (data) {
    return data;
  }
  Swal.fire({
    icon: "error",
    title: " Error show equipos by departamento",
    text: "error en el show equipos by departamento crud " + error.message,
  });
};
