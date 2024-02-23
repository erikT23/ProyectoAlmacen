import { useQuery } from "@tanstack/react-query";
import { EquiposTemplate } from "../components/templates/index";
import { useEquiposStore, useMarcasStore } from "../store/index";
import { SpinnerLoader } from "../components/molecules";
import Swal from "sweetalert2";

export function Equipos() {
  const { buscador, dataEquipos, searchEquipos, mostrarEquipos } =
    useEquiposStore();

  const { showMarcas, dataMarcas } = useMarcasStore();

  useQuery({
    queryKey: ["data de marcas"],
    queryFn: () => showMarcas(),
  });

  const { isLoading, error } = useQuery({
    queryKey: ["mostrar Equipos", { id: dataMarcas?.id }],
    queryFn: () => mostrarEquipos({ id: dataMarcas?.id }),
    enabled: !!dataMarcas?.id != null,
  });

  useQuery({
    queryKey: ["buscar nombre equipo ", { nombre_equipo: buscador }],
    queryFn: () => searchEquipos({ nombre_equipo: buscador }) || [],
  });

  if (isLoading) {
    return <SpinnerLoader />;
  }
  if (error) {
    return Swal.fire({
      icon: "error",
      title: " Error",
      text: "Error al cargar los datos " + error,
    });
  }
  return <EquiposTemplate data={dataEquipos} />;
}
