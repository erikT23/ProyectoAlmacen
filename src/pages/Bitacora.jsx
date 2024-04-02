import { useQuery } from "@tanstack/react-query";
import { SpinnerLoader } from "../components/molecules";
import { BitacoraTemplate } from "../components/templates/index";
import {
  useBitacoraStore,
  useCentrosStore,
  useDepartamentosStore,
  useEstadoStore,
  useMarcasStore,
  useModelosStore,
  useTiposStore,
} from "../store/index";

export function Bitacora() {
  const { bitacoraData, showBitacora } = useBitacoraStore();
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
    queryKey: ["mostrar bitacora"],
    queryFn: () => showBitacora(),
    enabled: !!tiposData.length,
  });

  if (isLoading) {
    return <SpinnerLoader />;
  }
  if (error) {
    return <div>Error al cargar los datos</div>;
  }

  return (
    <BitacoraTemplate
      data={bitacoraData}
      tipos={tiposData}
      modelos={modelosData}
      centros={centrosData}
      estados={estadosData}
      departamentos={departamentosData}
      marcas={marcasData}
    />
  );
}
