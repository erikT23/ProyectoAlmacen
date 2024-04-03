import Swal from "sweetalert2";
import { supabase } from "./index";

// consulta para mostrar los equipos
export const ShowEquipos = async () => {
  const { error, data } = await supabase
    .from("equipos") // tabla de la base de datos
    .select(
      "*,tipos(nombre),modelos(nombre,marcas(nombre)),centros(nombre),estados(nombre),departamentos(nombre)"
    ); // campos a seleccionar, el * indica que se seleccionaran todos los campos de la tabla, lo demas son las tablas de las relaciones foraneas y entre parentesis se indica el campo a seleccionar en esa tabla
  if (data) {
    return data;
  }
  Swal.fire({
    icon: "error",
    title: " Error show equipos",
    text: "error en el show equipos crud " + error.message,
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
  ]); // parametros para insertar a la tabla equipos, los parametros tienen que ser iguales a los de la base de datos
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
    }) // parametros para actualizar la base de datos que tienen que ser iguales a los de la base de datos
    .eq("id", p.id); // funcion de filtro para supabase que indica que se actualizara el registro que tenga el id igual al id del parametro
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
  const { error } = await supabase
    .from("equipos")
    .delete() // funcion para eliminar un registro
    .eq("id", p.id); // funcion de filtro para supabase que indica que se eliminara el registro que tenga el id igual al id del parametro
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
    .neq("tipo_id", 3); // funcion de filtro para supabase que indica que se seleccionaran los registros que tengan el tipo_id diferente de 3 que es el id de PAR

  if (error) {
    Swal.fire({
      icon: "error",
      title: " Error show equipos by centro",
      text: "error en el show equipos by centro crud " + error.message,
    });
    return;
  }

  // consulta para mostrar los monitores
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

  // se hace un mapeo de los equipos para agregar el monitor correspondiente para los equipos con uno asignado
  const equiposConMonitores = equiposData.map((equipo) => {
    const monitor = monitoresData.find(
      (monitor) => monitor.id === equipo.monitor_id
    );
    return { ...equipo, monitor };
  });

  return equiposConMonitores;
};

// llama a los equipos que tengan un id de tipo 3 que es el id de monitor
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

// consultas para contar equipos por centro, filtra el centro y por el tipo de equipo para no devolver los monitores, el nombre de la funcion indica el centro y el tipo de equipo que se esta contando
export const CountEquiposComunes = async () => {
  const { count, error } = await supabase
    .from("equipos")
    .select("*", { count: "exact", head: true }) // se seleccionan todos los campos de la tabla equipos y se indica que se unicamente el conteo y no toda la informacion
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
    .in("centro_id", [4, 6]) // filtro que recibe un array, y busca valores que tenga los valores del array de la columna indicada
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

// funcion para buscar los equipos en la bodega de comunes
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

export const CountCelularesComunes = async () => {
  const { count, error } = await supabase
    .from("equipos")
    .select("*", { count: "exact", head: true })
    .eq("centro_id", 3)
    .eq("tipo_id", 16);
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

export const CountCelularesMB = async () => {
  const { count, error } = await supabase
    .from("equipos")
    .select("*", { count: "exact", head: true })
    .in("centro_id", [4, 6])
    .eq("tipo_id", 16);
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

export const CountCelularesBodegaPar = async () => {
  const { count, error } = await supabase
    .from("equipos")
    .select("*", { count: "exact", head: true })
    .eq("centro_id", 3)
    .eq("departamento_id", 79)
    .eq("tipo_id", 16);
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

export const CountCelularesImx = async () => {
  const { count, error } = await supabase
    .from("equipos")
    .select("*", { count: "exact", head: true })
    .eq("centro_id", 2)
    .eq("tipo_id", 16);
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

export const CountCelularesGhp = async () => {
  const { count, error } = await supabase
    .from("equipos")
    .select("*", { count: "exact", head: true })
    .eq("centro_id", 1)
    .eq("tipo_id", 16);
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

export const CountCelularesLm = async () => {
  const { count, error } = await supabase
    .from("equipos")
    .select("*", { count: "exact", head: true })
    .in("centro_id", [5, 7])
    .eq("tipo_id", 16);
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
