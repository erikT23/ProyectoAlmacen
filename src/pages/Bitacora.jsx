import { useQuery } from "@tanstack/react-query";
import { SpinnerLoader } from "../components/molecules";
import { BitacoraTemplate } from "../components/templates/index";
import { useBitacoraStore } from "../store/index";

export function Bitacora() {
  const { bitacoraData, showBitacora } = useBitacoraStore();

  const { isLoading, error } = useQuery({
    queryKey: ["mostrar Modelos"],
    queryFn: () => showBitacora(),
  });

  if (isLoading) {
    return <SpinnerLoader />;
  }
  if (error) {
    return <div>Error al cargar los datos</div>;
  }

  return <BitacoraTemplate data={bitacoraData} />;
}
