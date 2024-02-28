import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import styled from "styled-components";
import { useUserStore } from "../../../store/index";
import { v } from "../../../styles/index";
import { Capitalize } from "../../../utils/index";
import { Btnsave } from "../../molecules/index";
import { InputText } from "../forms/index";

export function RegistrarAdmin({ onClose, dataSelect, accion }) {
  const { insertAdminUser, editUser } = useUserStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  async function insertar(data) {
    if (accion === "Editar") {
      const p = {
        nombre: Capitalize(data.nombre),
        correo: data.correo,
        password: data.password,
        rol: data.rol,
      };
      await editUser(p);
      onClose();
    } else {
      const p = {
        nombre: Capitalize(data.nombre),
        correo: data.correo,
        password: data.password,
        rol: data.rol,
      };
      await insertAdminUser(p);
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
              {accion == "Editar"
                ? "Editar usuario"
                : "Registrar nuevo usuario"}
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
                  defaultValue={dataSelect.nombre}
                  type="text"
                  placeholder=""
                  {...register("nombre", {
                    required: true,
                  })}
                />
                <label className="form__label">Nombre:</label>
                {errors.nombre?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
            <article>
              <InputText icono={<MdAlternateEmail color="#3AA597" />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.correo}
                  style={{ textTransform: "lowercase" }}
                  type="text"
                  placeholder="correo"
                  {...register("correo", {
                    required: true,
                    pattern: /^[^\s@]+@iberostar\.com$/,
                  })}
                />
                <label className="form__label">Correo</label>
                {errors.correo?.type === "pattern" && (
                  <p>El formato del correo es incorrecto</p>
                )}
                {errors.correo?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
            <article>
              <InputText icono={<RiLockPasswordLine color="#3AA597" />}>
                <select
                  className="form__field"
                  {...register("rol", {
                    required: true,
                  })}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="admin">Administrador</option>
                  <option value="it_lm">IT L&M</option>
                  <option value="it_mb">IT M&B</option>
                  <option value="it_grand">IT Grand</option>
                  <option value="practicante">Practicante</option>
                </select>
                <label className="form__label">Rol</label>
                {errors.option?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
            <article>
              <InputText icono={<RiLockPasswordLine color="#3AA597" />}>
                <input
                  className="form__field"
                  type="password"
                  placeholder="password"
                  {...register("password", {
                    required: true,
                    pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
                  })}
                />
                <label className="form__label">Contraseña</label>
                {errors.password?.type === "required" && <p>Campo requerido</p>}
                {errors.password?.type === "pattern" && (
                  <p>
                    tu contraseña debe tener almenos 8 caracteres y tener una
                    letra mayuscula y un numero
                  </p>
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
