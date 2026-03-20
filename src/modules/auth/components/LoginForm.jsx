import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../../shared/components/Input";
import Button from "../../shared/components/Button";
import useAuth from "../hook/useAuth";
import imgDesktop from "../../../assets/facuimg/login-desk.png";
import logoMobile from "../../../assets/facuimg/mob.png";

function LoginForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { username: "", password: "" } });

  
  const navigate = useNavigate();

  const { signin } = useAuth();

const onValid = async (formData) => {
  const { error, role } = await signin(formData.username, formData.password);

  if (error) {
    setErrorMessage(error); 
    return;
  }

  role === 'Admin' ? navigate('/admin/home') : navigate('/');
};

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-amber-950">
      <div className="w-auto max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 rounded-lg shadow-lg overflow-hidden h-auto md:h-[60vh]">
          <div className="relative px-6 py-10 md:pb-35 md:p-5 flex items-center bg-white text-black">
            <button
              type="button"
              onClick={() => navigate('/')}
              aria-label='Cerrar'
              className='absolute right-4 top-4 md:hidden text-white bg-transparent p-2 rounded-full hover:bg-gray-100'
            >
              X
            </button>
            <div className="w-full max-w-md mx-auto md:mx-0">
              <div className="mb-6 hidden md:block">
                <h2 className="text-3xl font-extrabold mb-2">Bienvenido</h2>
                <p className="text-gray-600 mb-6">
                  Ingresa tus credenciales para acceder al panel de
                  administración.
                </p>
              </div>
              <div className="mb-4 md:hidden flex justify-center">
                <img src={logoMobile} alt="Logo" className="h-20 w-auto" />
              </div>
              <form
                onSubmit={handleSubmit(onValid)}
                className="flex flex-col gap-4"
              >
                <Input
                  label="Usuario"
                  {...register("username", {
                    required: "Usuario es obligatorio",
                    pattern: {
                      value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/,
                      message: "El usuario solo puede contener letras",
                    },
                  })}
                  error={errors.username?.message}
                />
                <Input
                  label="Contraseña"
                  type="password"
                  {...register("password", {
                    required: "Contraseña es obligatoria",
                  })}
                  error={errors.password?.message}
                />

                <Button
                  type="submit"
                  className="w-full py-3 text-lg bg-accent-600 text-white hover:bg-accent-700 mt-3 pt-3"
                >
                  Iniciar Sesión
                </Button>
                <Button
                className="text-lg"
                  type="button"
                  variant="secondary"
                  onClick={() => navigate('/register')}
                >
                  Registrarse
                </Button>

                <div className="hidden md:block mt-2 pt-5">
                  <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="text-sm px-3 py-1 rounded border w-full hover:bg-gray-50"
                  >
                    Volver al inicio
                  </button>
                </div>

                {errorMessage && (
                  <p className="text-red-400 mt-2">{errorMessage}</p>
                )}
              </form>
            </div>
          </div>

          <div className="hidden md:block h-full">
            <img
              src={imgDesktop}
              alt="Login"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
