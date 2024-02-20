import { useQuery } from "@tanstack/react-query";
import { SpinnerLoader } from "../components/molecules/index";
import { ModelosTemplate } from "../components/templates/index";
import { useModelosStore } from "../store";

export function Modelos() {
  const { mostrarModelos, data, searchModelos, modelosData, buscador } =
    useModelosStore();
  const { isLoading, error } = useQuery({
    queryKey: ["mostrar Modelos", { id: modelosData?.id }],
    queryFn: () => mostrarModelos({ id: modelosData?.id }),
  
  });

  const { data: buscarData } = useQuery({
    queryKey: ["buscar Modelo", { id: modelosData.id, nombre: buscador }],
    queryFn: () => searchModelos({ id: modelosData.id, nombre: buscador }),
    
  });

  if (isLoading) {
    return <SpinnerLoader />;
  }
  if (error) {
    return <div>Error al cargar los datos</div>;
  }

  return <ModelosTemplate data={data} />;
}
