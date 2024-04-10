import { useQuery } from "@tanstack/react-query";
import { useBitacoraStore, useEquiposStore } from "../store";

export function ContarModelos() {
    const { showEquiposComunes } = useEquiposStore();
    const { showBitacora, bitacoraData } = useBitacoraStore();
  
    const { data: equiposData } = useQuery({
      queryKey: ["conteo Equipos"],
      queryFn: showEquiposComunes,
    });
  
    useQuery({
      queryKey: ["conteo bitacora"],
      queryFn: showBitacora,
    });
  
    const equiposCounts = equiposData
      ? equiposData.reduce((counts, item) => {
          const modelName = item.modelos.nombre;
          if (counts[modelName]) {
            counts[modelName]++;
          } else {
            counts[modelName] = 1;
          }
          return counts;
        }, {})
      : {};
  
    const bitacoraCounts = bitacoraData
      ? bitacoraData.reduce((counts, item) => {
          const modelName = item.modelos.nombre;
          if (counts[modelName]) {
            counts[modelName]++;
          } else {
            counts[modelName] = 1;
          }
          return counts;
        }, {})
      : {};
  
    const stock = {};
  
    for (const model in equiposCounts) {
      stock[model] = equiposCounts[model] - (bitacoraCounts[model] || 0);
      if (stock[model] < 0) {
        stock[model] = 0;
      }
    }
  
    return stock;
  }
