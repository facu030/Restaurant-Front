import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; 
import Input from "../../shared/components/Input";
import Button from "../../shared/components/Button";
import useAuth from "../hook/useAuth";

function RegisterForm({ onSuccess }) {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { signup } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
      defaultValues: {
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      },
  });

  const password = watch("password");

  const onValid = async (formData) => {
    const { error, role } = await signup(
      formData.username,
      formData.email,
      formData.password,
      formData.phone
    );

    if (error) {
      setErrorMessage(error);
      return;
    }

    if (onSuccess) {
      onSuccess();
    } else {
      role === 'Admin' ? navigate('/admin/home') : navigate('/');
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
        label="Teléfono (opcional)"
        {...register("phone", {
          pattern: {
            value: /^[0-9+()\-\s]*$/,
            message: "Ingrese un teléfono válido",
          },
          maxLength: {
            value: 30,
            message: "Máximo 30 caracteres",
          },
        })}
        error={errors.phone?.message}
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
