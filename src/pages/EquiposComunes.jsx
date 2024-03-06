import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { SpinnerLoader } from "../components/molecules";
import { EquiposComunesTemplate } from "../components/templates/index";
import { useEquiposStore, useMarcasStore } from "../store/index";

export function EquiposComunes() {
  const { dataEquipos, showEquiposComunes } = useEquiposStore();

  const { showMarcas, dataMarcas } = useMarcasStore();

  useQuery({
    queryKey: ["data de marcas"],
    queryFn: () => showMarcas(),
  });

  const { isLoading, error } = useQuery({
    queryKey: ["mostrar Equipos en comunes"],
    queryFn: () => showEquiposComunes(),
    enabled: !!dataMarcas?.id != null,
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
  return <EquiposComunesTemplate data={dataEquipos} />;
}
