import { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useEquiposStore, useMarcasStore } from "../../../store/index";
import { v } from "../../../styles/variables";
import { Capitalize } from "../../../utils/Conversiones";
import { Btnsave } from "../../molecules/index";
import { InputText } from "./index";

export function RegistrarEquipos({ onClose, dataSelect, accion }) {
  const { insertarEquipos, editEquipos } = useEquiposStore();
  const { showMarcas, marcasTest } = useMarcasStore();
  console.log(dataSelect, "dataSelect");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  async function insertar(data) {
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
      };
      await editEquipos(p);
      onClose();
    } else {
      const p = {
        nombre: Capitalize(data.nombre),
      };
      await insertarEquipos(p);
      onClose();
    }
  }
  useEffect(() => {
    // eslint-disable-next-line no-empty
    if (accion === "Editar") {
    }
  }, []);
  return (
    <Container>
      <div className="sub-contenedor">
        <div className="headers">
          <section>
            <h1>
              {accion == "Editar" ? "Editar dato" : "Registrar nuevo dato"}
            </h1>
          </section>

          <section>
            <span onClick={onClose}>x</span>
          </section>
        </div>

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
                {errors.numSerie?.type === "required" && <p>Campo requerido</p>}
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
    width: 500px;
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
        gap: 20px;
        display: flexbox;
        flex-direction: column;
        margin-bottom: 10px;
      }
    }
  }
`;
