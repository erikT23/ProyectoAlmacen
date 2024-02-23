import { useQuery } from "@tanstack/react-query";
import { SpinnerLoader } from "../components/molecules/index";
import { MarcasTemplate } from "../components/templates/index";
import { useMarcasStore } from "../store";
import Swal from "sweetalert2";

export function Marcas() {
  const { mostrarMarcas, dataMarcas, searchMarcas, marcasTest, buscador } =
    useMarcasStore();
  const { isLoading, error } = useQuery({
    queryKey: ["mostrar Marcassss", { id: marcasTest?.id }],
    queryFn: () => mostrarMarcas({ id: marcasTest?.id }),
  });

  useQuery({
    queryKey: ["buscar marcas", { nombre: buscador }],
    queryFn: () => searchMarcas({ nombre: buscador }) || [], // Devuelve un array vacío si searchMarcas no devuelve nada
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

  return <MarcasTemplate data={dataMarcas} />;
}
