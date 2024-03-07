export { useMarcasStore } from '../store/marcasStore';
export { ShowDepartamentosConCentros } from './centrosCrud';
export { CountEquipos, DeleteEquipos, EditEquipos, InsertEquipos, ShowDepartamentoByEquipo, ShowEquipos, ShowEquiposByEstado, ShowEquiposByMarca, ShowEquiposByTipo, ShowEquiposComunes } from './equiposCrud';
export { GetIdAuthSupabase } from './globalSupabase';
export { CountMarcas, DeleteMarcas, EditMarcas, InsertMarcas, SearchMarcas, ShowMarcas } from './marcasCrud';
export { CountModelos, DeleteModelos, EditModelos, InsertModelos, SearchModelos, ShowModelos, ShowModelosByMarca } from './modelosCrud';
export { ShowRoles } from './rolesCrud';
export { supabase } from './supabase.config';
export { CountTest, DeleteTest, EditTest, InsertTest, InsertWithIDTest, SearchTest, ShowTest } from './testCrud';
export { SearchTipos, ShowTipos } from './tiposCrud';
export { DeleteUser, EditUser, InsertUser, ShowAllUsers, ShowUsers } from './usersCrud';
