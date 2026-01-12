import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../shared/components/Input";
import Button from "../../shared/components/Button";
import useAuth from "../hook/useAuth";
import { frontendErrorMessage } from "../helpers/backendError";

function RegisterForm({ onSuccess }) {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");
  const { signup } = useAuth();

  const onValid = async (formData) => {
    setErrorMessage("");

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }

    try {
      const { error } = await signup(
        formData.username,
        formData.email,
        formData.password
      );

      if (error) {
        setErrorMessage(error.frontendErrorMessage);
        return;
      }

      if (onSuccess) onSuccess();
    } catch (err) {
      const code = err?.response?.data?.code;
      if (code && frontendErrorMessage[code]) {
        setErrorMessage(frontendErrorMessage[code]);
      } else {
        setErrorMessage("No se pudo registrar el usuario");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onValid)} className="flex flex-col gap-4">
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
        label="Email"
        {...register("email", {
          required: "El email es obligatorio",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Ingrese un email válido",
          },
        })}
        error={errors.email?.message}
      />

      <Input
        label="Contraseña"
        type="password"
        {...register("password", {
          required: "Contraseña es obligatoria",
          pattern: {
            value: /^(?=(?:.*\d){2,})(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}).*$/,
            message: "Mínimo 8 caracteres, 1 mayúscula, 2 números y 1 carácter especial",
          },
        })}
        error={errors.password?.message}
      />

      <Input
        label="Confirmar contraseña"
        type="password"
        {...register("confirmPassword", {
          required: "Confirmar contraseña es obligatorio",
          validate: (value) =>
            value === password || "Las contraseñas no coinciden",
        })}
        error={errors.confirmPassword?.message}
      />

      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

      <Button className="w-full py-3 mt-2 bg-accent-600 text-white" type="submit">
        Registrar Usuario
      </Button>
    </form>
  );
}

export default RegisterForm;