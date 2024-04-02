import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { SpinnerLoader } from "../components/molecules";
import { EquiposTemplate } from "../components/templates/index";
import { useEquiposStore } from "../store/index";

// Page para mostrar los equipos, funcionamiento especifico en la page de bitacora
export function Equipos() {
  const { dataSinMonitor, showEquiposComunes } = useEquiposStore();

  const { isLoading, error } = useQuery({
    queryKey: ["mostrar Equipos"],
    queryFn: () => showEquiposComunes(),
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
  return <EquiposTemplate data={dataSinMonitor} />;
}
