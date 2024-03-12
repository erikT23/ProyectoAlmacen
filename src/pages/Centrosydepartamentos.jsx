import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { SpinnerLoader } from "../components/molecules";
import { CentrosydepartamentosTemplate } from "../components/templates";
import { useDepartamentosStore } from "../store";

export function Centrosydepartamentos() {
  const { mostrarDepartamentosyCentros, dataDepartamentosyCentros } = useDepartamentosStore();

  const { isLoading, error } = useQuery({
    queryKey: ["mostrar dataDepartamentosyCentros"],
    queryFn: () => mostrarDepartamentosyCentros(),
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
  return <CentrosydepartamentosTemplate data={dataDepartamentosyCentros} />;
}
