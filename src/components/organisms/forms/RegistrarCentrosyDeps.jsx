import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useDepartamentosStore, useUserStore } from "../../../store/index";
import { v } from "../../../styles/variables";
import { Btnsave } from "../../molecules/index";
import { InputText } from "./index";

export function RegistrarCentrosyDeps({ onClose, dataSelect, accion }) {
  const { showDepartamentos, editarDepartamentos, insertarDepartamentos } =
    useDepartamentosStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useQuery({
    queryKey: ["mostrar centros"],
    queryFn: () => showDepartamentos(),
  });

  const { activeUser } = useUserStore();

  async function insertar(data) {
    // Verificar si el usuario tiene permiso para insertar un centros en el centro especificado
    if (activeUser.rol_id !== 1) {
      return Swal.fire({
        icon: "error",
        title: " Error",
        text: "No tienes permiso para insertar un centros",
      });
    }

    if (accion === "Editar") {
      const p = {
        id: dataSelect.id,
        nombre: data.nombre,
      };
      await editarDepartamentos(p);
      Swal.fire({
        icon: "success",
        title: "Guardado",
        text: "Centros editado con exito",
      });
      onClose();
    } else {
      const p = {
        nombre: data.nombre,
      };
      await insertarDepartamentos(p);
      Swal.fire({
        icon: "success",
        title: "Guardado",
        text: "Centros agregado con exito",
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
              {accion == "Editar"
                ? "Editar departamentos"
                : "Registrar nuevo departamentos"}
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
                    defaultValue={dataSelect.nombre}
                    type="text"
                    placeholder=""
                    {...register("nombre", {
                      required: true,
                    })}
                  />
                  <label className="form__label">
                    Nombre del Departamento:
                  </label>
                  {errors.nombre?.type === "required" && <p>Campo requerido</p>}
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
  top: 0;
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
        display: flex;
        flex-direction: column;
        .colorContainer {
          .colorPickerContent {
            padding-top: 15px;
            min-height: 50px;
          }
        }
      }
    }
  }
`;
