import { useQuery } from "@tanstack/react-query";
import { MarcaTemplate } from "../components/templates/index";
import { useTestStore } from "../store";
import { SpinnerLoader } from "../components/molecules/index";

export function Marca() {
  const { mostrarTest, data, searchTest, datatest, buscador } = useTestStore();
  const { isLoading, error } = useQuery({
    queryKey: ["mostrar Testssss", { id: datatest[0]?.id }],
    queryFn: () => mostrarTest({ id: datatest[0]?.id }),
    enabled: datatest[0]?.id != null,
  });

  const { data: buscarData } = useQuery({
    queryKey: ["buscar Test", { id: datatest.id, descripcion: buscador }],
    queryFn: () => searchTest({ id: datatest.id, descripcion: buscador }),
    enabled: datatest.id != null,
  });

  if (isLoading) {
    return <SpinnerLoader />;
  }
  if (error) {
    return <div>Error al cargar los datos</div>;
  }

  return <MarcaTemplate data={data} />;
}
