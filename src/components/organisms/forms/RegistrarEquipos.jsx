import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RiLockPasswordLine } from "react-icons/ri";
import styled from "styled-components";
import Swal from "sweetalert2";
import {
  useCentrosStore,
  useDepartamentosStore,
  useEquiposStore,
  useEstadoStore,
  useModelosStore,
  useTiposStore,
  useUserStore,
} from "../../../store/index";
import { v } from "../../../styles/variables";
import { Capitalize } from "../../../utils/Conversiones";
import { Btnsave } from "../../molecules/index";
import { InputText } from "./index";

// Componente para registrar un nuevo equipo
// al ser el mas complicado aqui se detalla el funcionamiento de los demas componentes de registro

export function RegistrarEquipos({ onClose, dataSelect, accion }) {
  // seccion de importaciones de los Store de zustand, estos son los hooks que se usan para hacer las peticiones a la base de datos
  // las variables show llama a las funciones que realizan la consulta a la base de datos y las variables data son las que contienen la informacion

  const { insertarEquipos, editEquipos, showMonitores, dataMonitores } =
    useEquiposStore();
  const { showModelos, modelosData } = useModelosStore();
  const { showTipos } = useTiposStore();
  const { mostrarDepartamentosyCentros } = useDepartamentosStore();
  const { showCentros, centrosData } = useCentrosStore();
  const { showEstados, estadosData } = useEstadoStore();
  const [departamentos, setDepartamentos] = useState([]);
  const [marcaId, setMarcaId] = useState(null);
  const [tipoId, setTipoId] = useState(null);

  // inicializacion de los hooks de react-hook-form para el formulario
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // seccion de peticiones a la base de datos para obtener la informacion necesaria para el formulario
  // se hace uso de tanstack Query para hacer las peticiones a la base de datos
  // queryKey es el nombre de la peticion y es de libre eleccion y queryFn es la funcion que se ejecuta al hacer la peticion
  useQuery({
    queryKey: ["mostrar departamentos"],
    queryFn: () => mostrarDepartamentosyCentros(),
  });

  useQuery({
    queryKey: ["mostrar estados"],
    queryFn: () => showEstados(),
  });
  useQuery({
    queryKey: ["mostrar centros"],
    queryFn: () => showCentros(),
  });
  useQuery({
    queryKey: ["mostrar monitores"],
    queryFn: () => showMonitores(),
  });
  useQuery({
    queryKey: ["mostrar modelos"],
    queryFn: () => showModelos(),
  });

  useQuery({
    queryKey: ["mostrar tipos"],
    queryFn: () => showTipos(),
  });
  // esta seccion llama al usuario con sesion iniciada para verificar si tiene permisos para insertar un equipo en el centro seleccionado

  const { activeUser } = useUserStore();
  // Roles permitidos para insertar equipos en cada centro
  const rolesACentros = {
    4: [5, 7], // Lindo Maya: PLI y PMY
    3: [6, 4], // Mar Beach: PMA y PBE
    5: [5], // Grand: GHP
  };

  async function insertar(data) {
    // Verificar si el usuario tiene permiso para insertar un equipo en el centro especificado
    if (activeUser.rol_id !== 1) {
      // 1 es el ID del rol "Administrador"
      const centrosPermitidos = rolesACentros[activeUser.rol_id];
      // Si el usuario no tiene permisos para insertar en el centro seleccionado, mostrar mensaje de error
      if (!centrosPermitidos || !centrosPermitidos.includes(data.centro_id)) {
        return Swal.fire({
          icon: "error",
          title: " Error",
          text: "No tienes permiso para insertar un equipo en este centro",
        });
      }
    }
    // al llamar este componente se le pasa la accion que se va a relizar, dependiendo de la accion se ejecuta una funcion diferente
    // se crea una constante p con los parametros que se van a enviar a la base de datos
    // estos deben de ser los mismos que los campos de la tabla en la base de datos
    if (accion === "Editar") {
      const p = {
        id: dataSelect.id,
        nombre: Capitalize(data.nombre),
        nombre_usuario: Capitalize(data.nombre_usuario),
        apellido_usuario: Capitalize(data.apellido_usuario),
        correo: data.correo,
        numserie: data.numserie,
        inicio_garantia: data.inicio_garantia,
        fin_garantia: data.fin_garantia,
        sistema_operativo: Capitalize(data.sistema_operativo),
        direccion_ip: data.direccion_ip,
        tipo_id: tipoId,
        modelo_id: data.modelo_id,
        marca_id: marcaId,
        centro_id: data.centro_id,
        estado_id: data.estado_id,
        departamento_id: data.departamento_id,
        monitor_id: data.monitor_id ? data.monitor_id : null,
      };

      await editEquipos(p);
      Swal.fire({
        icon: "success",
        title: "Guardado",
        text: "Equipo editado con exito",
      });
      onClose();
    } else {
      const p = {
        nombre: Capitalize(data.nombre),
        nombre_usuario: Capitalize(data.nombre_usuario),
        apellido_usuario: Capitalize(data.apellido_usuario),
        numserie: data.numserie,
        correo: data.correo,
        inicio_garantia: data.inicio_garantia,
        fin_garantia: data.fin_garantia,
        sistema_operativo: Capitalize(data.sistema_operativo),
        direccion_ip: data.direccion_ip,
        tipo_id: tipoId,
        modelo_id: data.modelo_id,
        marca_id: marcaId,
        centro_id: data.centro_id,
        estado_id: data.estado_id,
        departamento_id: data.departamento_id,
        monitor_id: data.monitor_id ? data.monitor_id : null,
      };
      await insertarEquipos(p);
      Swal.fire({
        icon: "success",
        title: "Guardado",
        text: "Equipo agregado con exito",
      });
      onClose();
    }
  }
  useEffect(() => {
    // eslint-disable-next-line no-empty
    if (accion === "Editar") {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      <div className="sub-contenedor">
        <div className="headers">
          <section>
            {/* seccion de titulo del formulario dependiendo de la accion se mostrara un texto distinto */}
            <h1>
              {accion == "Editar" ? "Editar equipo" : "Registrar nuevo equipo"}
            </h1>
          </section>

          <section>
            <span onClick={onClose}>x</span>
          </section>
        </div>
        <div className="formulario">
          <form
            className="formulario"
            onSubmit={handleSubmit(insertar)}
          >
            <section>
              <article>
                <InputText icono={<v.iconomarca />}>
                  <input
                    /* aqui muestra un valor por defecto en caso de que dataSelect llegue con informacion desde la tabla, esto es para la edicion
                  cuando sea insercion de datos estara vacio, la informacion de este input se registra como nombre y marca como un campo obligatorio
                  en caso de que el campo este vacio se mostrara el mensaje de campo requerido*/
                    className="form__field"
                    defaultValue={dataSelect.nombre}
                    type="text"
                    placeholder=""
                    {...register("nombre", { required: true })}
                  />
                  <label className="form__label">Nombre del equipo:</label>
                  {errors.nombre?.type === "required" && <p>Campo requerido</p>}
                </InputText>
              </article>
              <article>
                <InputText icono={<v.iconomarca />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.nombre_usuario}
                    type="text"
                    placeholder=""
                    {...register("nombre_usuario", { required: true })}
                  />
                  <label className="form__label">Nombre del usuario:</label>
                  {errors.nombre_usuario?.type === "required" && (
                    <p>Campo requerido</p>
                  )}
                </InputText>
              </article>
              <article>
                <InputText icono={<v.iconomarca />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.apellido_usuario}
                    type="text"
                    placeholder=""
                    {...register("apellido_usuario", { required: true })}
                  />
                  <label className="form__label">Apellido del usuario:</label>
                  {errors.apellido_usuario?.type === "required" && (
                    <p>Campo requerido</p>
                  )}
                </InputText>
              </article>
              <article>
                <InputText icono={<v.iconomarca />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.correo}
                    type="text"
                    placeholder=""
                    {...register("correo", { required: true })}
                  />
                  <label className="form__label">Correo del usuario:</label>
                  {errors.correo?.type === "required" && <p>Campo requerido</p>}
                </InputText>
              </article>
              <article>
                <InputText icono={<v.iconomarca />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.numserie}
                    type="text"
                    placeholder=""
                    {...register("numserie", { required: true })}
                  />
                  <label className="form__label">Numero de serie:</label>
                  {errors.numserie?.type === "required" && (
                    <p>Campo requerido</p>
                  )}
                </InputText>
              </article>
              <article>
                <InputText icono={<v.iconomarca />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.inicio_garantia}
                    type="date"
                    placeholder=""
                    {...register("inicio_garantia", {
                      required: true,
                    })}
                  />
                  <label className="form__label">Inicio de garantia:</label>
                  {errors.inicio_garantia?.type === "required" && (
                    <p>Campo requerido</p>
                  )}
                </InputText>
              </article>
              <article>
                <InputText icono={<v.iconomarca />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.fin_garantia}
                    type="date"
                    placeholder=""
                    {...register("fin_garantia", {
                      required: true,
                    })}
                  />
                  <label className="form__label">Fin de garantia:</label>
                  {errors.fin_garantia?.type === "required" && (
                    <p>Campo requerido</p>
                  )}
                </InputText>
              </article>
              <article>
                <InputText icono={<v.iconomarca />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.sistema_operativo}
                    type="text"
                    placeholder=""
                    {...register("sistema_operativo")}
                  />
                  <label className="form__label">Sistema Operativo:</label>
                </InputText>
              </article>
              <article>
                <InputText icono={<v.iconomarca />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.direccion_ip}
                    type="text"
                    placeholder=""
                    {...register("direccion_ip", {
                      // regex para validar una direccion ip en caso de no cumplir con el formato se mostrara un mensaje de error
                      pattern:
                        /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
                    })}
                  />
                  <label className="form__label">Direccion Ip:</label>
                  {errors.direccion_ip?.type === "pattern" && (
                    <p>El formato de la ip es incorrecto</p>
                  )}
                  {errors.direccion_ip?.type === "required" && (
                    <p>Campo requerido</p>
                  )}
                </InputText>
              </article>
              <article>
                <InputText icono={<v.iconomarca />}>
                  <select
                    className="form__field"
                    {...register("modelo_id", {
                      required: true,
                    })}
                    onChange={(e) => {
                      /*el campo de modelos se tomo para llenar clos campos de marca y tipo de equipo
                      una vez que se modifica el campo de modelos se busca el modelo seleccionado y se obtienen los campos de marca y tipo
                      */
                      const selectedModeloId = Number(e.target.value);
                      const selectedModelo = modelosData.find(
                        (modelo) => modelo.id === selectedModeloId
                      );
                      setMarcaId(
                        selectedModelo ? selectedModelo.marca_id : null
                      );
                      setTipoId(selectedModelo ? selectedModelo.tipo_id : null);
                    }}
                  >
                    {dataSelect && dataSelect.modelos ? (
                      /* cuando se busca editar la informacion verifica que llegue desde la tabla,de ahi saca el nombre del modelo 
                      de la marca y del tipo, estos valores son solo de referencia y se necesita volver a seleccionar el valor para asignarlo */
                      <option value={dataSelect.modelo_id}>
                        {dataSelect.modelos.nombre} (
                        {dataSelect.modelos.marcas.nombre})(
                        {dataSelect.tipos.nombre})
                      </option>
                    ) : (
                      <option value="">-- Seleccione un modelo --</option>
                    )}
                    {
                      // se mapean los modelos para mostrarlos en el select usando los valores llamados anteriormente
                      modelosData.map((modelo) => (
                        <option
                          key={modelo.id}
                          value={modelo.id}
                        >
                          {modelo.nombre} ({modelo.marcas.nombre})(
                          {modelo.tipos.nombre})
                        </option>
                      ))
                    }
                  </select>
                  <label className="form__label">Modelo:</label>
                </InputText>
              </article>
              <article>
                <InputText icono={<RiLockPasswordLine color="#3AA597" />}>
                  <select
                    className="form__field"
                    {...register("centro_id", {
                      // funciona de manera parecida al anterior, una vez que se selecciona un centro usa su id para buscar los departamentos en ese centro
                      required: true,
                    })}
                    onChange={(e) => {
                      const selectedCentro = centrosData.find(
                        (centro) => centro.id === Number(e.target.value)
                      );
                      setDepartamentos(
                        selectedCentro ? selectedCentro.departamentos : []
                      );
                    }}
                  >
                    {dataSelect && dataSelect.centros ? (
                      <option value={dataSelect.centro_id}>
                        {dataSelect.centros.nombre}
                      </option>
                    ) : (
                      <option value="">-- Seleccione un centro --</option>
                    )}
                    {centrosData.map((centro, index) => (
                      <option
                        key={index}
                        value={centro.id}
                      >
                        {centro.nombre}
                      </option>
                    ))}
                  </select>
                  <label className="form__label">Centro</label>
                  {errors.option?.type === "required" && <p>Campo requerido</p>}
                </InputText>
              </article>
              <article>
                <InputText icono={<RiLockPasswordLine color="#3AA597" />}>
                  <select
                    className="form__field"
                    {...register("departamento_id", {
                      // una vez seleccionado el centro se muestran aqui los departamentos, para que el id del departamento no regrese como string se usa parseInt para convertirlo a numero
                      required: true,
                      setValueAs: (value) => parseInt(value, 10),
                    })}
                  >
                    {dataSelect && dataSelect.departamentos ? (
                      <option value={dataSelect.departamento_id}>
                        {dataSelect.departamentos.nombre}
                      </option>
                    ) : (
                      <option value="">-- Seleccione un departamento --</option>
                    )}
                    {departamentos.map((departamento, index) => (
                      <option
                        key={index}
                        value={departamento.id}
                      >
                        {departamento.nombre}
                      </option>
                    ))}
                  </select>
                  <label className="form__label">Departamento</label>
                  {errors.option?.type === "required" && <p>Campo requerido</p>}
                </InputText>
              </article>
              <article>
                <InputText icono={<RiLockPasswordLine color="#3AA597" />}>
                  <select
                    // los monitores son un tipo de equipo, por lo que el valor que se muestra para seleccionarlos aqui el numero de serie de los equipos marcados como monitor
                    className="form__field"
                    {...register("monitor_id")}
                  >
                    <option value="">-- Seleccione un monitor --</option>
                    {dataMonitores
                      .filter(
                        (monitor) =>
                          !monitor.equipoId ||
                          monitor.equipoId === dataSelect.equipoId
                      )
                      .map((monitor, index) => (
                        <option
                          key={index}
                          value={monitor.id}
                        >
                          {monitor.numserie}
                        </option>
                      ))}
                  </select>
                  <label className="form__label">Monitor</label>
                  {errors.option?.type === "required" && <p>Campo requerido</p>}
                </InputText>
              </article>
              <article>
                <InputText icono={<RiLockPasswordLine color="#3AA597" />}>
                  <select
                    className="form__field"
                    {...register("estado_id", {
                      required: true,
                    })}
                  >
                    {estadosData.map((estado, index) => (
                      <option
                        key={index}
                        value={estado.id}
                      >
                        {estado.nombre}
                      </option>
                    ))}
                  </select>
                  <label className="form__label">Estado</label>
                  {errors.option?.type === "required" && <p>Campo requerido</p>}
                </InputText>
              </article>
              <div className="btnguardarContent">
                <Btnsave
                  // boton para guardar los datos, al hacer click se ejecuta la funcion insertar
                  icono={<v.iconoguardar />}
                  titulo="Guardar"
                  bgcolor="#3AA597"
                />
              </div>
            </section>
          </form>
        </div>
      </div>
    </Container>
  );
}

// css del componente manejados por styled-components
const Container = styled.div`
  transition: 0.5s;
  top: 10px;
  left: 0;
  position: fixed;
  background-color: rgba(10, 9, 9, 0.5);
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .sub-contenedor {
    width: -webkit-fill-available;
    max-width: 85%;
    border-radius: 20px;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;

    .headers {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h1 {
        font-size: 20px;
        font-weight: 500;
      }
      span {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .formulario {
      section {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
        margin-bottom: 10px;
      }
    }
  }
`;
