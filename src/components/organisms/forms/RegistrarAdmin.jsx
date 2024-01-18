import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { MdAlternateEmail } from "react-icons/md";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUserStore } from "../../../store";
import { v } from "../../../styles/variables";
import { Btnsave, InputText } from "../../index";

export function RegistrarAdmin({ setState }) {
  const { insertAdminUser } = useUserStore();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const mutation = useMutation({
    mutationFn: async (data) => {
      const p = {
        email: data.correo,
        password: data.pass,
        rol: "admin",
        nombre: data.nombre,
      };
      const dt = await insertAdminUser(p);
      if (dt) {
        navigate("/");
      } else {
        setStateInicio(!stateInicio);
      }
    },
  });
  return (
    <Container>
      <ContentClose>
        <span onClick={setState}>x</span>
      </ContentClose>
      <section className="subcontainer">
        <div className="headers">
          <section>
            <h1>Registrar usuario</h1>
          </section>
        </div>

        <form
          className="formulario"
          onSubmit={handleSubmit(mutation.mutateAsync)}
        >
          <section>
            <article>
              <article>
                <InputText
                  icono={<MdOutlineDriveFileRenameOutline color="#3AA597" />}
                >
                  <input
                    className="form__field"
                    style={{ textTransform: "lowercase" }}
                    type="text"
                    placeholder="nombre"
                    {...register("nombre", {
                      required: true,
                    })}
                  />
                  <label className="form__label">Nombre</label>
                  {errors.correo?.type === "required" && <p>Campo requerido</p>}
                </InputText>
              </article>
              <InputText icono={<MdAlternateEmail color="#3AA597" />}>
                <input
                  className="form__field"
                  style={{ textTransform: "lowercase" }}
                  type="text"
                  placeholder="correo"
                  {...register("correo", {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                  })}
                />
                <label className="form__label">Email</label>
                {errors.correo?.type === "pattern" && (
                  <p>El formato del email es incorrecto</p>
                )}
                {errors.correo?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
            <article>
              <InputText icono={<RiLockPasswordLine color="#3AA597" />}>
                <input
                  className="form__field"
                  type="password"
                  placeholder="pass"
                  {...register("pass", {
                    required: true,
                  })}
                />
                <label className="form__label">Contraseña</label>
                {errors.pass?.type === "required" && <p>Campo requerido</p>}
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
      </section>
    </Container>
  );
}
const Container = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  border-radius: 20px;
  background: #fff;
  box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
  padding: 13px 36px 20px 36px;
  z-index: 100;
  display: flex;

  align-items: center;
  .subcontainer {
    width: 100%;
  }

  .headers {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h1 {
      font-size: 30px;
      font-weight: bold;
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
`;

const ContentClose = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 33px;
  margin: 30px;
  cursor: pointer;
`;
