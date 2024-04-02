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

// Page para mostrar la bitacora de los equipos, los componentes page llaman a las consultas de la base de datos para pasar los datos a los templates que contienen la estructura de la pagina y manejan la informacion que les llega

export function Bitacora() {
  //importacion de los store para la bitacora y la informacion de las llaves foraneas de los equipos, esta informacion se usa para tomar el id y usarlo para recuperar el nombre
  const { bitacoraData, showBitacora } = useBitacoraStore();
  const { showModelos, modelosData } = useModelosStore();
  const { tiposData, showTipos } = useTiposStore();
  const { centrosData, showCentros } = useCentrosStore();
  const { estadosData, showEstados } = useEstadoStore();
  const { departamentosData, showDepartamentos } = useDepartamentosStore();
  const { marcasData, showMarcas } = useMarcasStore();

  // querys para traer la informacion de la base de datos, hace uso de la libreria tanstack query para hacer las consultas a la base de datos https://tanstack.com/query/latest
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

  // esta query se encarga de traer la informacion de la bitacora, se activa cuando ya se han cargado los datos de las llaves foraneas y mientras este cargando mostrara un spinner de carga
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
