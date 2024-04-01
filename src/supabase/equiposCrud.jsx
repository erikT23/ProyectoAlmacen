import Swal from "sweetalert2";
import { supabase } from "./index";

export const ShowEquipos = async () => {
  const { error, data } = await supabase
    .from("equipos")
    .select(
      "*,tipos(nombre),modelos(nombre,marcas(nombre)),centros(nombre),estados(nombre),departamentos(nombre)"
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
      nombre: p.nombre,
      nombre_usuario: p.nombre_usuario,
      correo: p.correo,
      apellido_usuario: p.apellido_usuario,
      numserie: p.numserie,
      inicio_garantia: p.inicio_garantia,
      fin_garantia: p.fin_garantia,
      sistema_operativo: p.sistema_operativo,
      direccion_ip: p.direccion_ip,
      tipo_id: p.tipo_id,
      marca_id: p.marca_id,
      modelo_id: p.modelo_id,
      centro_id: p.centro_id,
      estado_id: p.estado_id,
      departamento_id: p.departamento_id,
      monitor_id: p.monitor_id,
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
      nombre: p.nombre,
      nombre_usuario: p.nombre_usuario,
      correo: p.correo,
      apellido_usuario: p.apellido_usuario,
      numserie: p.numserie,
      inicio_garantia: p.inicio_garantia,
      fin_garantia: p.fin_garantia,
      sistema_operativo: p.sistema_operativo,
      direccion_ip: p.direccion_ip,
      tipo_id: p.tipo_id,
      marca_id: p.marca_id,
      modelo_id: p.modelo_id,
      centro_id: p.centro_id,
      estado_id: p.estado_id,
      departamento_id: p.departamento_id,
      monitor_id: p.monitor_id,
    })
    .eq("id", p.id);
  if (error) {
    Swal.fire({
      icon: "error",
      title: " Error edit equipos",
      text: "error en el edit equipos crud" + error.message,
    });
    return error;
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

export const ShowEquiposComunes = async () => {
  const { error, data: equiposData } = await supabase
    .from("equipos")
    .select(
      "*,tipos(nombre),modelos(nombre,marcas(nombre)),centros(nombre),estados(nombre),departamentos(nombre)"
    )
    .neq("tipo_id", 3);

  if (error) {
    Swal.fire({
      icon: "error",
      title: " Error show equipos by centro",
      text: "error en el show equipos by centro crud " + error.message,
    });
    return;
  }

  const { error: monitorError, data: monitoresData } = await supabase
    .from("equipos")
    .select("id,numserie");

  if (monitorError) {
    Swal.fire({
      icon: "error",
      title: " Error show monitores",
      text: "error en el show monitores crud " + monitorError.message,
    });
    return;
  }

  const equiposConMonitores = equiposData.map((equipo) => {
    const monitor = monitoresData.find(
      (monitor) => monitor.id === equipo.monitor_id
    );
    return { ...equipo, monitor };
  });

  return equiposConMonitores;
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
      "*,tipos(nombre),marcas(nombre),centros(nombre),estados(nombre),departamentos(nombre)"
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

export const ShowMonitores = async () => {
  const { error, data } = await supabase
    .from("equipos")
    .select(
      "*,tipos(nombre),modelos(nombre,marcas(nombre)),centros(nombre),estados(nombre),departamentos(nombre)"
    )
    .eq("tipo_id", 3);

  if (data) {
    return data;
  }
  Swal.fire({
    icon: "error",
    title: " Error show equipos by centro",
    text: "error en el show equipos by centro crud " + error.message,
  });
};

export const ShowMonitoresByEquipo = async (p) => {
  const { error, data } = await supabase
    .from("equipos")
    .select("id,numserie")
    .eq("monitor_id", p.monitor_id);
  if (data) {
    return data;
  }
  Swal.fire({
    icon: "error",
    title: " Error show equipos by monitor",
    text: "error en el show equipos by monitor crud " + error.message,
  });
};

export const CountEquiposComunes = async () => {
  const { count, error } = await supabase
    .from("equipos")
    .select("*", { count: "exact", head: true })
    .eq("centro_id", 3)
    .neq("tipo_id", 3);
  if (error) {
    Swal.fire({
      icon: "error",
      title: " Error count equipos",
      text: "error contando equipos" + error.message,
    });
    return;
  }

  return count;
};
export const CountMonitoresComunes = async () => {
  const { count, error } = await supabase
    .from("equipos")
    .select("*", { count: "exact", head: true })
    .eq("centro_id", 3)
    .eq("tipo_id", 3);
  if (error) {
    Swal.fire({
      icon: "error",
      title: " Error count equipos",
      text: "error contando equipos" + error.message,
    });
    return;
  }

  return count;
};

export const CountEquiposMB = async () => {
  const { count, error } = await supabase
    .from("equipos")
    .select("*", { count: "exact", head: true })
    .in("centro_id", [4, 6])
    .neq("tipo_id", 3);
  if (error) {
    Swal.fire({
      icon: "error",
      title: " Error count equipos",
      text: "error contando equipos" + error.message,
    });
    return;
  }

  return count;
};

export const CountMonitoresMb = async () => {
  const { count, error } = await supabase
    .from("equipos")
    .select("*", { count: "exact", head: true })
    .in("centro_id", [4, 6])
    .eq("tipo_id", 3);
  if (error) {
    Swal.fire({
      icon: "error",
      title: " Error count equipos",
      text: "error contando equipos" + error.message,
    });
    return;
  }

  return count;
};

export const CountEquiposLm = async () => {
  const { count, error } = await supabase
    .from("equipos")
    .select("*", { count: "exact", head: true })
    .in("centro_id", [5, 7])
    .neq("tipo_id", 3);
  if (error) {
    Swal.fire({
      icon: "error",
      title: " Error count equipos",
      text: "error contando equipos" + error.message,
    });
    return;
  }

  return count;
};

export const CountMonitoresLm = async () => {
  const { count, error } = await supabase
    .from("equipos")
    .select("*", { count: "exact", head: true })
    .in("centro_id", [5, 7])
    .eq("tipo_id", 3);
  if (error) {
    Swal.fire({
      icon: "error",
      title: " Error count equipos",
      text: "error contando equipos" + error.message,
    });
    return;
  }

  return count;
};

export const CountMonitoresGhp = async () => {
  const { count, error } = await supabase
    .from("equipos")
    .select("*", { count: "exact", head: true })
    .eq("centro_id", 1)
    .eq("tipo_id", 3);
  if (error) {
    Swal.fire({
      icon: "error",
      title: " Error count equipos",
      text: "error contando equipos" + error.message,
    });
    return;
  }

  return count;
};
export const CountEquiposGhp = async () => {
  const { count, error } = await supabase
    .from("equipos")
    .select("*", { count: "exact", head: true })
    .eq("centro_id", 1)
    .neq("tipo_id", 3);
  if (error) {
    Swal.fire({
      icon: "error",
      title: " Error count equipos",
      text: "error contando equipos" + error.message,
    });
    return;
  }

  return count;
};

export const CountEquiposImx = async () => {
  const { count, error } = await supabase
    .from("equipos")
    .select("*", { count: "exact", head: true })
    .eq("centro_id", 2)
    .neq("tipo_id", 3);
  if (error) {
    Swal.fire({
      icon: "error",
      title: " Error count equipos",
      text: "error contando equipos" + error.message,
    });
    return;
  }

  return count;
};

export const CountMonitoresImx = async () => {
  const { count, error } = await supabase
    .from("equipos")
    .select("*", { count: "exact", head: true })
    .eq("centro_id", 2)
    .eq("tipo_id", 3);
  if (error) {
    Swal.fire({
      icon: "error",
      title: " Error count equipos",
      text: "error contando equipos" + error.message,
    });
    return;
  }

  return count;
};

export const CountEquiposBodega = async () => {
  const { count, error } = await supabase
    .from("equipos")
    .select("*", { count: "exact", head: true })
    .eq("centro_id", 3)
    .eq("departamento_id", 79)
    .neq("tipo_id", 3);
  if (error) {
    Swal.fire({
      icon: "error",
      title: " Error count equipos",
      text: "error contando equipos" + error.message,
    });
    return;
  }

  return count;
};

export const CountMonitoresBodega = async () => {
  const { count, error } = await supabase
    .from("equipos")
    .select("*", { count: "exact", head: true })
    .eq("centro_id", 3)
    .eq("departamento_id", 79)
    .eq("tipo_id", 3);
  if (error) {
    Swal.fire({
      icon: "error",
      title: " Error count equipos",
      text: "error contando equipos" + error.message,
    });
    return;
  }

  return count;
};
