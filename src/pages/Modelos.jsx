import { useQuery } from "@tanstack/react-query";
import { SpinnerLoader } from "../components/molecules/index";
import { ModelosTemplate } from "../components/templates/index";
import { useMarcasStore, useModelosStore } from "../store";

export function Modelos() {
  const { mostrarModelos, dataModelos, searchModelos, buscador } = useModelosStore();
  const { dataMarcas } = useMarcasStore();

  const { isLoading, error } = useQuery({
    queryKey: ["mostrar Modelos", { id: dataMarcas?.id }],
    queryFn: () => mostrarModelos({ id: dataMarcas?.id }),
    enabled: !!dataMarcas?.id != null,
  });

  useQuery({
    queryKey: ["buscar Modelo", { id: dataMarcas.id, nombre: buscador }],
    queryFn: () => searchModelos({ id: dataMarcas.id, nombre: buscador }),
    enabled: !!dataMarcas?.id != null,
  });

  if (isLoading) {
    return <SpinnerLoader />;
  }
  if (error) {
    return <div>Error al cargar los datos</div>;
  }

  return <ModelosTemplate data={dataModelos} />;
}
