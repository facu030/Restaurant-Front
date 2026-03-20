import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const UserForm = ({ initialData, onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "User",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({
        name: "",
        email: "",
        phone: "",
        role: "User",
      });
    }
  }, [initialData, reset]);

  const onFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nombre Completo
        </label>
        <input
          type="text"
          {...register("name", {
            required: "El nombre es obligatorio",
            minLength: {
              value: 3,
              message: "Debe tener al menos 3 caracteres",
            },
          })}
          className={`mt-1 block w-full border rounded-md shadow-sm p-2 focus:ring-amber-500 focus:border-amber-500 
            ${errors.name ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          {...register("email", {
            required: "El email es obligatorio",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "El formato del email no es válido",
            },
          })}
          className={`mt-1 block w-full border rounded-md shadow-sm p-2 focus:ring-amber-500 focus:border-amber-500 
            ${errors.email ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Teléfono
        </label>
        <input
          type="text"
          {...register("phone")}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-amber-500 focus:border-amber-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Rol</label>
        <select
          {...register("role", { required: true })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-amber-500 focus:border-amber-500"
        >
          <option value="User">Usuario</option>
          <option value="Admin">Administrador</option>
        </select>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-md hover:bg-amber-700 shadow-sm transition-colors"
        >
          {initialData ? "Guardar Cambios" : "Crear Usuario"}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
