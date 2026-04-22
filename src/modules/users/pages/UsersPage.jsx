import React, { useState, useMemo } from "react";
import { useUsers } from "../hook/useUsers";
import UsersTable from "../components/UsersTable";
import UsersForm from "../components/UserForm";
import Modal from "../../shared/components/Modal";
import UsersStats from "../components/UsersStats";
import UsersFilter from "../components/UsersFilter";

// --- Constantes para filtros por defecto ---
const DEFAULT_FILTER = "all";
const DEFAULT_STATUS = "Activo";

const UsersPage = () => {
  // --- Estados de la UI ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // --- Estados de los Filtros ---
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState(DEFAULT_FILTER);
  const [statusFilter, setStatusFilter] = useState(DEFAULT_FILTER);

  // --- Hook de Datos ---
  const {
    users,
    loading,
    handleDeleteUser,
    handleStatusChange,
    updateUser,
    createUser,
  } = useUsers();

  // --- Lógica de Filtrado Optimizada ---
  const filteredUsers = useMemo(() => {
    const searchLower = searchTerm.trim().toLowerCase();

    return users.filter((user) => {
      // 1. Destructuramos para código más limpio
      const { userName = "", name = "", email = "", role, status } = user;

      // 2. Filtro de búsqueda textual
      const matchesSearch =
        !searchLower ||
        userName.toLowerCase().includes(searchLower) ||
        name.toLowerCase().includes(searchLower) ||
        email.toLowerCase().includes(searchLower);

      // 3. Filtros exactos
      const matchesRole = roleFilter === DEFAULT_FILTER || role === roleFilter;
      const matchesStatus =
        statusFilter === DEFAULT_FILTER ||
        (status || DEFAULT_STATUS) === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, roleFilter, statusFilter]);

  // --- Handlers del Modal ---
  const handleOpenCreate = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (isSaving) return; // Evitar cerrar si está guardando
    setIsModalOpen(false);
    setEditingUser(null);
  };

  // --- Lógica de Guardado con manejo de errores ---
  const handleSaveUser = async (formData) => {
    setIsSaving(true);
    try {
      if (editingUser) {
        const idToUpdate = editingUser._id || editingUser.id;
        await updateUser(idToUpdate, formData);
      } else {
        await createUser(formData);
      }
      handleCloseModal(); //cerramos si tuvo éxito
    } catch (error) {
      console.error("Error al guardar el usuario:", error);
      // Aquí idealmente mostrarías un toast/alerta al usuario
      alert("Hubo un error al guardar. Intenta nuevamente.");
    } finally {
      setIsSaving(false);
    }
  };

  // --- Helper visual ---
  const getModalTitle = () => {
    if (!editingUser) return "Crear Nuevo Usuario";
    const id = editingUser._id || editingUser.id;
    return `Editar Usuario #${id ? String(id).substring(0, 6) : "..."}`;
  };

  // --- Renderizados Condicionales ---
  if (loading) {
    return (
      <div className="p-10 flex justify-center items-center h-screen">
        <span className="text-gray-500 animate-pulse text-lg">
          Cargando usuarios...
        </span>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Gestión de Usuarios
            </h1>
            <p className="text-gray-500">
              Administra los usuarios registrados en el sistema
            </p>
          </div>
          <button
            onClick={handleOpenCreate}
            className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition-colors flex items-center gap-2"
          >
            <span>+</span> Nuevo Usuario
          </button>
        </div>

        {/* Estadísticas */}
        <UsersStats users={users} />

        {/* Tabla y Filtros */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-6 mt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Lista de Usuarios
            </h2>
            <UsersFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              roleFilter={roleFilter}
              onRoleChange={setRoleFilter}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
            />
          </div>

          <UsersTable
            users={filteredUsers}
            onDelete={handleDeleteUser}
            onStatusChange={handleStatusChange}
            onEdit={handleOpenEdit}
          />

          {filteredUsers.length === 0 && (
            <div className="p-12 text-center text-gray-500 bg-gray-50 rounded-lg mt-4 border border-dashed border-gray-200">
              <p className="text-lg font-medium text-gray-600">
                No se encontraron usuarios
              </p>
              <p className="text-sm">
                Prueba ajustando los filtros de búsqueda.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Formulario */}
      <Modal
        isOpen={isModalOpen}
        title={getModalTitle()}
        onClose={handleCloseModal}
      >
        <UsersForm
          initialData={editingUser}
          onSubmit={handleSaveUser}
          onCancel={handleCloseModal}
          isLoading={isSaving}
        />
      </Modal>
    </div>
  );
};

export default UsersPage;
