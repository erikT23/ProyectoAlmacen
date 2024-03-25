export { useMarcasStore } from '../store/marcasStore';
export { DeleteCentros, EditCentros, InsertCentros, ShowCentros } from './centrosCrud';
export { DeleteDepartamentos, DeleteDepartamentoyCentros, EditDepartamentos, EditDepartamentosyCentros, InsertDepartamentos, InsertDepartamentosyCentros, ShowDepartamentos, ShowDepartamentosyCentros } from './departamentosCrud';
export { CountEquipos, CountEquiposBodega, CountEquiposComunes, CountEquiposGhp, CountEquiposImx, CountEquiposLm, CountEquiposMB, DeleteEquipos, EditEquipos, InsertEquipos, ShowDepartamentoByEquipo, ShowEquipos, ShowEquiposByEstado, ShowEquiposByMarca, ShowEquiposByTipo, ShowEquiposComunes, ShowMonitores, ShowMonitoresByEquipo } from './equiposCrud';
export { ShowEstados } from './estadosCrud';
export { GetIdAuthSupabase } from './globalSupabase';
export { CountMarcas, DeleteMarcas, EditMarcas, InsertMarcas, SearchMarcas, ShowMarcas } from './marcasCrud';
export { CountModelos, DeleteModelos, EditModelos, InsertModelos, SearchModelos, ShowModelos, ShowModelosByMarca } from './modelosCrud';
export { ShowRoles } from './rolesCrud';
export { supabase } from './supabase.config';
export { CountTest, DeleteTest, EditTest, InsertTest, InsertWithIDTest, SearchTest, ShowTest } from './testCrud';
export { ShowTipos } from './tiposCrud';
export { DeleteUser, EditUser, InsertUser, ShowAllUsers, ShowUsers } from './usersCrud';
