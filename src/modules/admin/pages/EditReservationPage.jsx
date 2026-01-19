import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReservationForm from '../../reservations/components/ReservationForm';
import { getReservationById, updateReservation } from '../../reservations/services/reservationService';

export default function EditReservationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [initialValues, setInitialValues] = useState(null);
  const [isSaving, setIsSaving] = useState(false); // 1. Nuevo estado para el loading del botón

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getReservationById(id);
        setInitialValues(data);
      } catch (error) {
        console.error("Error al cargar reserva:", error);
        // Opcional: navigate('/admin/reservations') si falla
      }
    };
    load();
  }, [id]);

  const onSubmit = async (values) => {
    setIsSaving(true); // Bloqueamos el formulario
    try {
      await updateReservation(Number(id), values);
      navigate("/admin/reservations"); // 2. Ojo: asegúrate que esta ruta coincida con tu Router
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("Hubo un error al guardar los cambios.");
    } finally {
      setIsSaving(false); // Desbloqueamos (aunque si navega, esto se desmonta)
    }
  };

  const handleCancel = () => {
    navigate("/admin/reservations");
  };

  if (!initialValues) return <div className="p-6 text-gray-500">Cargando datos de la reserva...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Editar Reserva #{id}</h1>
      <p className="text-gray-500 mb-6">Modifica los detalles de la reserva seleccionada.</p>

      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm max-w-2xl">
        <ReservationForm 
          initialData={initialValues} 
          onSubmit={onSubmit}
          onCancel={handleCancel} // 3. Agregamos la función cancelar para el botón gris
          isAdmin={true}          // 4. Importante: Para que aparezca el select de "Estado"
          isLoading={isSaving}    // 5. Para deshabilitar inputs mientras guarda
        />
      </div>
    </div>
  );
}