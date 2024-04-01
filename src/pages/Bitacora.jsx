import { useQuery } from "@tanstack/react-query";
import { SpinnerLoader } from "../components/molecules";
import { BitacoraTemplate } from "../components/templates/index";
import { useBitacoraStore, useTiposStore } from "../store/index";

export function Bitacora() {
  const { bitacoraData, showBitacora } = useBitacoraStore();

  const { tiposData, showTipos } = useTiposStore();

  useQuery({
    queryKey: ["mostrar tipos"],
    queryFn: () => showTipos(),
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
    />
  );
}
