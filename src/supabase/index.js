export { useMarcasStore } from '../store/marcasStore';
export { CountEquipos, DeleteEquipos, EditEquipos, InsertEquipos, SearchEquipos, ShowEquipos, ShowEquiposByCentro, ShowEquiposByEstado, ShowEquiposByMarca, ShowEquiposByTipo } from './equiposCrud';
export { GetIdAuthSupabase } from './globalSupabase';
export { CountMarcas, DeleteMarcas, EditMarcas, InsertMarcas, SearchMarcas, ShowMarcas } from './marcasCrud';
export { CountModelos, DeleteModelos, EditModelos, InsertModelos, SearchModelos, ShowModelos } from './modelosCrud';
export { supabase } from './supabase.config';
export { CountTest, DeleteTest, EditTest, InsertTest, InsertWithIDTest, SearchTest, ShowTest } from './testCrud';
export { SearchTipos, ShowTipos } from './tiposCrud';
export { InsertUser, ShowUsers } from './usersCrud';
