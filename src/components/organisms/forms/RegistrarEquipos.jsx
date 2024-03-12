import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RiLockPasswordLine } from "react-icons/ri";
import styled from "styled-components";
import Swal from "sweetalert2";
import {
  useCentrosStore,
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

export function RegistrarEquipos({ onClose, dataSelect, accion }) {
  const [marcaId, setMarcaId] = useState(null);
  const { insertarEquipos, editEquipos } = useEquiposStore();
  const { showModelos, modelosData } = useModelosStore();
  const { showTipos, tiposData } = useTiposStore();
  const { showCentros, centrosData } = useCentrosStore();
  const { showEstados, estadosData } = useEstadoStore();
  const [departamentos, setDepartamentos] = useState([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  useQuery({
    queryKey: ["mostrar estados"],
    queryFn: () => showEstados(),
  });
  useQuery({
    queryKey: ["mostrar centros"],
    queryFn: () => showCentros(),
  });
  useQuery({
    queryKey: ["mostrar modelos"],
    queryFn: () => showModelos(),
  });
  useQuery({
    queryKey: ["mostrar tipos"],
    queryFn: () => showTipos(),
  });
  const { activeUser } = useUserStore();
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
      if (!centrosPermitidos || !centrosPermitidos.includes(data.centro_id)) {
        return Swal.fire({
          icon: "error",
          title: " Error",
          text: "No tienes permiso para insertar un equipo en este centro",
        });
      }
    }
    if (accion === "Editar") {
      const p = {
        id: dataSelect.id,
        nombre_equipo: Capitalize(data.nombre_equipo),
        nombre_usuario: Capitalize(data.nombre_usuario),
        apellido_usuario: Capitalize(data.apellido_usuario),
        numSerie: data.numSerie,
        inicio_garantia: data.inicio_garantia,
        fin_garantia: data.fin_garantia,
        sistema_operativo: Capitalize(data.sistema_operativo),
        direccion_ip: data.direccion_ip,
        tipo_id: data.tipo_id,
        modelo_id: data.modelo_id,
        marca_id: marcaId,
        centro_id: data.centro_id,
        estado_id: data.estado_id,
        departamento_id: data.departamento_id,
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
        nombre_equipo: Capitalize(data.nombre_equipo),
        nombre_usuario: Capitalize(data.nombre_usuario),
        apellido_usuario: Capitalize(data.apellido_usuario),
        numSerie: data.numSerie,
        inicio_garantia: data.inicio_garantia,
        fin_garantia: data.fin_garantia,
        sistema_operativo: Capitalize(data.sistema_operativo),
        direccion_ip: data.direccion_ip,
        tipo_id: data.tipo_id,
        modelo_id: data.modelo_id,
        marca_id: marcaId,
        centro_id: data.centro_id,
        estado_id: data.estado_id,
        departamento_id: data.departamento_id,
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
                    className="form__field"
                    defaultValue={dataSelect.nombre_equipo}
                    type="text"
                    placeholder=""
                    {...register("nombre_equipo", {
                      required: true,
                    })}
                  />
                  <label className="form__label">Nombre del equipo:</label>
                  {errors.nombre_equipo?.type === "required" && (
                    <p>Campo requerido</p>
                  )}
                </InputText>
              </article>
              <article>
                <InputText icono={<v.iconomarca />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.nombre_usuario}
                    type="text"
                    placeholder=""
                    {...register("nombre_usuario", {
                      required: true,
                    })}
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
                    {...register("apellido_usuario", {
                      required: true,
                    })}
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
                    defaultValue={dataSelect.numSerie}
                    type="text"
                    placeholder=""
                    {...register("numSerie", {
                      required: true,
                    })}
                  />
                  <label className="form__label">Numero de serie:</label>
                  {errors.numSerie?.type === "required" && (
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
                      required: true,
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
                      const selectedModelo = modelosData.find(
                        (modelo) => modelo.id === e.target.value
                      );
                      setMarcaId(
                        selectedModelo ? selectedModelo.marca_id : null
                      );
                    }}
                  >
                    <option value="">-- Seleccione un modelo --</option>
                    {modelosData.map((modelo) => (
                      <option
                        key={modelo.id}
                        value={modelo.id}
                      >
                        {modelo.nombre} ({modelo.marcas.nombre})
                      </option>
                    ))}
                  </select>
                  <label className="form__label">Modelo:</label>
                </InputText>
              </article>
              <article>
                <InputText icono={<RiLockPasswordLine color="#3AA597" />}>
                  <select
                    className="form__field"
                    {...register("tipo_id", {
                      required: true,
                    })}
                  >
                    <option value="">-- Seleccione un tipo --</option>
                    {tiposData.map((tipo, index) => (
                      <option
                        key={index}
                        value={tipo.id}
                      >
                        {tipo.nombres}
                      </option>
                    ))}
                  </select>
                  <label className="form__label">Tipo</label>
                  {errors.option?.type === "required" && <p>Campo requerido</p>}
                </InputText>
              </article>
              <article>
                <InputText icono={<RiLockPasswordLine color="#3AA597" />}>
                  <select
                    className="form__field"
                    {...register("centro_id", {
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
                    <option value="">-- Seleccione un centro --</option>
                    {centrosData.map((centro, index) => (
                      <option
                        key={index}
                        value={centro.id}
                      >
                        {centro.nombres}
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
                      required: true,
                    })}
                  >
                    <option value="">-- Seleccione un departamento --</option>
                    {departamentos.map((departamentos, index) => (
                      <option
                        key={index}
                        value={departamentos.id}
                      >
                        {departamentos.nombre}
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
                    className="form__field"
                    {...register("estado_id", {
                      required: true,
                    })}
                  >
                    <option value="">-- Seleccione un estado --</option>
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
