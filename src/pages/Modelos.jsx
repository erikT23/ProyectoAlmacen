import { useQuery } from "@tanstack/react-query";
import { SpinnerLoader } from "../components/molecules/index";
import { ModelosTemplate } from "../components/templates/index";
import { useMarcasStore, useModelosStore, useTiposStore } from "../store/index";

export function Modelos() {
  const { mostrarModelos, dataModelos } = useModelosStore();
  const { dataMarcas, showMarcas } = useMarcasStore();
  const { showTipos } = useTiposStore();

  useQuery({
    queryKey: ["data de marcas"],
    queryFn: () => showMarcas(),
  });

  useQuery({
    queryKey: ["data de tipos"],
    queryFn: () => showTipos(),
  });

  const { isLoading, error } = useQuery({
    queryKey: ["mostrar Modelos", { id: dataMarcas?.id }],
    queryFn: () => mostrarModelos({ id: dataMarcas?.id }),
    enabled: !!dataMarcas?.id != null,
  });

  if (isLoading) {
    return <SpinnerLoader />;
  }
  if (error) {
    return <div>Error al cargar los datos</div>;
  }

  return <ModelosTemplate data={dataModelos} />; // Pasa los datos de las marcas y los tipos a ModelosTemplate
}
