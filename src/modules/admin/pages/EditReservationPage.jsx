import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReservationForm from '../../reservations/components/ReservationForm';
import { getReservationById, updateReservation } from '../../reservations/services/reservationService';

export default function EditReservationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    const load = async () => {
      const data = await getReservationById(id);
      setInitialValues(data);
    };
    load();
  }, [id]);

  const onSubmit = async (values) => {
    await updateReservation(Number(id), values);
    navigate("/admin/reservations");
  };

  if (!initialValues) return <div className="p-6">Cargando...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Editar Reserva #{id}</h1>

      <div className="mt-6 rounded-xl border bg-white p-5">
        <ReservationForm initialData={initialValues} onSubmit={onSubmit} />
      </div>
    </div>
  );
}
