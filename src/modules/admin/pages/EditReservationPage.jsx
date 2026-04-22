import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReservationForm from '../../reservations/components/ReservationForm';
import { getReservationById, updateReservation } from '../../reservations/services/reservationService';

export default function EditReservationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [initialValues, setInitialValues] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
  const load = async () => {
    const { data, error } = await getReservationById(id); 
    if (data) {
      setInitialValues(data);
    } else {
      console.error('Error al cargar reserva:', error);
      navigate('/admin/reservations');
    }
  };
  load();
}, [id]);

const onSubmit = async (values) => {
  setIsSaving(true);
  const { error } = await updateReservation(Number(id), values); 
  setIsSaving(false);

  if (error) {
    alert('Hubo un error al guardar los cambios: ' + error);
    return;
  }
  navigate('/admin/reservations');
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
          onCancel={handleCancel} 
          isAdmin={true}          
          isLoading={isSaving}    
        />
      </div>
    </div>
  );
}