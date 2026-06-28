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

    role === "Admin" ? navigate("/admin/home") : navigate("/");
  };

  return (
    <div className="w-full max-w-4xl mx-auto [@media_(max-height:700px)]:max-w-md">
        <div className="grid grid-cols-1 md:grid-cols-2 [@media_(max-height:700px)]:md:grid-cols-1 rounded-lg shadow-lg overflow-visible bg-white">
          <div className="relative p-5 sm:p-6 md:p-7 [@media_(max-height:700px)]:md:p-5 flex items-center bg-white text-black rounded-lg md:rounded-r-none [@media_(max-height:700px)]:md:rounded-r-lg">
            <button
              type="button"
              onClick={() => navigate("/")}
              aria-label="Cerrar"
              className="absolute right-4 top-4 md:hidden text-gray-500 bg-transparent p-2 rounded-full hover:bg-gray-100"
            >
              X
            </button>
            <div className="w-full max-w-md mx-auto md:mx-0">
              <div className="mb-4 hidden md:block [@media_(max-height:700px)]:mb-3">
                <h2 className="text-3xl [@media_(max-height:700px)]:text-2xl font-extrabold mb-2">Bienvenido</h2>
                <p className="text-gray-600 mb-0">
                  Ingresa tus credenciales para acceder al panel de
                  administración.
                </p>
              </div>
              <div className="mb-4 md:hidden flex justify-center">
                <img src={logoMobile} alt="Logo" className="h-20 w-auto" />
              </div>
              <form
                onSubmit={handleSubmit(onValid)}
                className="flex flex-col gap-3"
              >
                <Input
                  label="Usuario o Email"
                  {...register("username", {
                    required: "Este campo es obligatorio",
                    minLength: {
                      value: 3,
                      message: "Debe tener al menos 3 caracteres",
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
                  className="w-full py-2.5 text-base bg-accent-600 text-white hover:bg-accent-700 mt-1"
                >
                  Iniciar Sesión
                </Button>
                <Button
                  className="text-base py-2.5"
                  type="button"
                  variant="secondary"
                  onClick={() => navigate("/register")}
                >
                  Registrarse
                </Button>

                <div className="hidden md:block mt-1">
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="text-sm px-3 py-2 rounded border w-full hover:bg-gray-50"
                  >
                    Volver al inicio
                  </button>
                </div>

                {errorMessage && (
                  <p className="text-red-400 mt-2 text-center font-medium">
                    {errorMessage}
                  </p>
                )}
              </form>
            </div>
          </div>

          <div className="hidden md:block h-full [@media_(max-height:700px)]:hidden">
            <img
              src={imgDesktop}
              alt="Login"
              className="w-full h-full object-cover rounded-r-lg"
            />
          </div>
      </div>
    </div>
  );
}

export default LoginForm;
