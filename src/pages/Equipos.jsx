import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { SpinnerLoader } from "../components/molecules";
import { EquiposTemplate } from "../components/templates/index";
import {
  useCentrosStore,
  useDepartamentosStore,
  useEquiposStore,
  useEstadoStore,
  useMarcasStore,
  useModelosStore,
  useTiposStore,
} from "../store/index";

// Page para mostrar los equipos, funcionamiento especifico en la page de bitacora
export function Equipos() {
  const { dataSinMonitor, showEquiposComunes } = useEquiposStore();
  const { showModelos, modelosData } = useModelosStore();
  const { tiposData, showTipos } = useTiposStore();
  const { centrosData, showCentros } = useCentrosStore();
  const { estadosData, showEstados } = useEstadoStore();
  const { departamentosData, showDepartamentos } = useDepartamentosStore();
  const { marcasData, showMarcas } = useMarcasStore();

  useQuery({
    queryKey: ["mostrar tipos"],
    queryFn: () => showTipos(),
  });
  useQuery({
    queryKey: ["modelos"],
    queryFn: () => showModelos(),
  });
  useQuery({
    queryKey: ["centros"],
    queryFn: () => showCentros(),
  });
  useQuery({
    queryKey: ["estados"],
    queryFn: () => showEstados(),
  });
  useQuery({
    queryKey: ["departamentos"],
    queryFn: () => showDepartamentos(),
  });
  useQuery({
    queryKey: ["marcas"],
    queryFn: () => showMarcas(),
  });

  const { isLoading, error } = useQuery({
    queryKey: ["conteo Equipos"],
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
  return (
    <EquiposTemplate
      data={dataSinMonitor}
      tipos={tiposData}
      modelos={modelosData}
      centros={centrosData}
      estados={estadosData}
      departamentos={departamentosData}
      marcas={marcasData}
    />
  );
}
