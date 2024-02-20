import { useQuery } from "@tanstack/react-query";
import { SpinnerLoader } from "../components/molecules/index";
import { MarcasTemplate } from "../components/templates/index";
import { useMarcasStore } from "../store";

export function Marcas() {
  const { mostrarMarcas, data, searchMarcas, marcasTest, buscador } =
    useMarcasStore();
  const { isLoading, error } = useQuery({
    queryKey: ["mostrar Marcassss", { id: marcasTest?.id }],
    queryFn: () => mostrarMarcas({ id: marcasTest?.id }),
  });

  const { data: buscarData } = useQuery({
    queryKey: ["buscar marcas", { nombre: buscador }],
    queryFn: () => searchMarcas({  nombre: buscador }) || [],  // Devuelve un array vacío si searchMarcas no devuelve nada
  });


  if (isLoading) {
    return <SpinnerLoader />;
  }
  if (error) {
    return <div>Error al cargar los datos</div>;
  }

  return <MarcasTemplate data={data} />;
}
