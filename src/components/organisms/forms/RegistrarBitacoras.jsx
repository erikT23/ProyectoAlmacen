import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RiLockPasswordLine } from "react-icons/ri";
import styled from "styled-components";
import Swal from "sweetalert2";
import {
  useBitacoraStore,
  useEstadoStore,
  useModelosStore,
  useTiposStore,
  useUserStore,
} from "../../../store/index";
import { v } from "../../../styles/variables";
import { Btnsave } from "../../molecules/index";
import { InputText } from "./index";

export function RegistrarBitacoras({ onClose, dataSelect, accion }) {
  const { showModelos, modelosData } = useModelosStore();
  const { showTipos } = useTiposStore();
  const { insertarBitacora, editarBitacora } = useBitacoraStore();
  const { showEstados, estadosData } = useEstadoStore();
  const [marcaId, setMarcaId] = useState(null);
  const [tipoId, setTipoId] = useState(null);

  useEffect(() => {
    if (dataSelect && dataSelect.modelo_id) {
      const selectedModelo = modelosData.find(
        (modelo) => modelo.id === dataSelect.modelo_id
      );
      setMarcaId(selectedModelo ? selectedModelo.marca_id : null);
      setTipoId(selectedModelo ? selectedModelo.tipo_id : null);
    }
  }, [dataSelect, modelosData]);

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
    queryKey: ["mostrar modelos"],
    queryFn: () => showModelos(),
  });

  useQuery({
    queryKey: ["mostrar tipos"],
    queryFn: () => showTipos(),
  });

  const { activeUser } = useUserStore();
  // Roles permitidos para insertar equipos en cada centro
  const rolesACentros = {
    4: [5, 7], // Lindo Maya: PLI y PMY
    3: [6, 4], // Mar Beach: PMA y PBE
    5: [5], // Grand: GHP
  };

  async function insertar(data) {
    if (activeUser.rol_id !== 1) {
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
        accion: data.accion,
        correo: data.correo,
        numserie: data.numserie,
        categoria: data.categoria,
        motivo: data.motivo,
        marca_id: marcaId,
        modelo_id: data.modelo_id,
        tipo_id: tipoId,
        estado_id: data.estado_id,
      };

      await editarBitacora(p);
      console.log(p, "p en edicion");
      Swal.fire({
        icon: "success",
        title: "Guardado",
        text: "Equipo editado con exito",
      }).then(() => {
        window.location.reload();
      });
      onClose();
    } else {
      const p = {
        accion: data.accion,
        correo: data.correo,
        numserie: data.numserie,
        categoria: data.categoria,
        motivo: data.motivo,
        marca_id: marcaId,
        modelo_id: data.modelo_id,
        tipo_id: tipoId,
        estado_id: data.estado_id,
      };
      await insertarBitacora(p);
      Swal.fire({
        icon: "success",
        title: "Guardado",
        text: "Equipo agregado con exito",
      }).then(() => {
        window.location.reload();
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
                    defaultValue={dataSelect.correo}
                    type="text"
                    placeholder=""
                    {...register("correo", { required: true })}
                  />
                  <label className="form__label">Correo:</label>
                  {errors.nombre?.type === "required" && <p>Campo requerido</p>}
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
                  {errors.correo?.type === "required" && <p>Campo requerido</p>}
                </InputText>
              </article>
              <article>
                <InputText icono={<v.iconomarca />}>
                  <select
                    className="form__field"
                    {...register("modelo_id", {
                      required: true,
                      setValueAs: (value) => Number(value),
                    })}
                    onChange={(e) => {
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
                      <option value={dataSelect.modelo_id}>
                        {dataSelect.modelos.nombre} (
                        {dataSelect.modelos.marcas.nombre})(
                        {dataSelect.tipos.nombre})
                      </option>
                    ) : (
                      <option value="">-- Seleccione un modelo --</option>
                    )}
                    {modelosData.map((modelo, index) => (
                      <option
                        key={index}
                        value={modelo.id}
                      >
                        {modelo.nombre} ({modelo.marcas.nombre}) (
                        {modelo.tipos.nombre})
                      </option>
                    ))}
                  </select>
                  <label className="form__label">Modelo</label>
                  {errors.modelo_id?.type === "required" && (
                    <p>Campo requerido</p>
                  )}
                </InputText>
              </article>
              <article>
                <InputText icono={<RiLockPasswordLine color="#3AA597" />}>
                  <select
                    className="form__field"
                    {...register("categoria", {
                      required: true,
                    })}
                  >
                    <option value={null}>-- Seleccione una Categoria --</option>
                    <option value="Stock">Stock</option>
                    <option value="Garantia">Garantía</option>
                  </select>
                  <label className="form__label">Categoria</label>
                  {errors.categoria?.type === "required" && (
                    <p>Campo requerido</p>
                  )}
                </InputText>
              </article>
              <article>
                <InputText icono={<RiLockPasswordLine color="#3AA597" />}>
                  <select
                    className="form__field"
                    {...register("estado_id", {
                      required: true,
                      setValueAs: (value) => Number(value),
                    })}
                  >
                    <option value={null}>-- Seleccione un Estado --</option>
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
                  {errors.estado_id?.type === "required" && (
                    <p>Campo requerido</p>
                  )}
                </InputText>
              </article>
              <article>
                <InputText icono={<RiLockPasswordLine color="#3AA597" />}>
                  <select
                    className="form__field"
                    {...register("accion", {
                      required: true,
                    })}
                  >
                    <option value={null}>-- Seleccione una Accion --</option>
                    <option value="Entrada">Entrada</option>
                    <option value="Salida">Salida</option>
                  </select>
                  <label className="form__label">Accion</label>
                  {errors.categoria?.type === "required" && (
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
                    {...register("motivo", {
                      required: true,
                    })}
                  />
                  <label className="form__label"> Motivo del cambio:</label>
                  {errors.sistema_operativo?.type === "required" && (
                    <p>Campo requerido</p>
                  )}
                </InputText>
              </article>{" "}
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
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
        gap: 20px;
        margin-bottom: 10px;
      }
    }
  }
`;
