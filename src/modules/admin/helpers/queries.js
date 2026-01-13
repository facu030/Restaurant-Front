//get, post, put, delete

const urlreservas = import.meta.env.development.VITE_API_RESERVA;

console.log(urlreservas);

export const leerReservas = async () => {
  try {
    const respuesta = await fetch(urlreservas);
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const leerReservaPorId = async (id) => {
  try {
    const respuesta = await fetch(urlreservas + `/${id}`);
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const crearReserva = async (reservaNueva) => {
  try {
    const respuesta = await fetch(urlreservas, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservaNueva),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const editarReservaPorId = async (reservaEditada, id) => {
  try {
    const respuesta = await fetch(urlreservas + `/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservaEditada),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const borrarReservaPorId = async (id) => {
  try {
    const respuesta = await fetch(urlreservas + `/${id}`, {
      method: "DELETE",
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};
