import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RiLockPasswordLine } from "react-icons/ri";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useCentrosStore, useUserStore } from "../../../store/index";
import { v } from "../../../styles/variables";
import { Capitalize } from "../../../utils/Conversiones";
import { Btnsave } from "../../molecules/index";
import { InputText } from "./index";

export function RegistrarCentros({ onClose, dataSelect, accion }) {
  const { showCentros, centrosData } = useCentrosStore();
  const [departamentos, setDepartamentos] = useState([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useQuery({
    queryKey: ["mostrar centros"],
    queryFn: () => showCentros(),
  });

  const { activeUser } = useUserStore();
  const rolesACentros = {
    4: [5, 7], // Lindo Maya: PLI y PMY
    3: [6, 4], // Mar Beach: PMA y PBE
    5: [5], // Grand: GHP
  };

  async function insertar(data) {
    console.log("activeUser", activeUser);
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
      };
      await editEquipos(p);
      Swal.fire({
        icon: "success",
        title: "Guardado",
        text: "Equipo editado con exito",
      });
      onClose();
    } else {
      const p = {};
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
