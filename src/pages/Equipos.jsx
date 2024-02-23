import { useQuery } from "@tanstack/react-query";
import { EquiposTemplate } from "../components/templates/index";
import { useEquiposStore } from "../store/index";
import { SpinnerLoader } from "../components/molecules";
import Swal from "sweetalert2";

export function Equipos() {
  const { buscador, dataEquipos, searchEquipos, showEquipos } =
    useEquiposStore();

  const { isLoading, error } = useQuery({
    queryKey: ["mostrar Equipos"],
    queryFn: () => showEquipos(),
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
