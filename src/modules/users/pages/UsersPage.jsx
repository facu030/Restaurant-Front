import React, { useState, useMemo } from "react"; // Agregamos useMemo
import { useUsers } from "../hook/useUsers";
import UsersTable from "../components/UsersTable";
import UsersForm from "../components/UserForm";
import Modal from "../../shared/components/Modal";

// NUEVOS IMPORTS
import UsersStats from "../components/UsersStats";
import UsersFilter from "../components/UsersFilter";

const UsersPage = () => {
  // 1. Estados
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Estados para los filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // 2. Hook de Datos
  const {
    users,
    loading,
    handleDeleteUser,
    handleStatusChange,
    updateUser,
    createUser,
  } = useUsers();

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole = roleFilter === "all" || user.role === roleFilter;

      const matchesStatus =
        statusFilter === "all" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, roleFilter, statusFilter]);

  const handleOpenCreate = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSaveUser = async (formData) => {
    setIsSaving(true);
    if (editingUser) {
      await updateUser(editingUser.id, formData);
    } else {
      if (createUser) await createUser(formData);
    }
    setIsSaving(false);
    handleCloseModal();
  };

  if (loading)
    return <div className="p-10 text-center">Cargando usuarios...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
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

        <UsersStats users={users} />

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-6">
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
            <div className="p-8 text-center text-gray-500">
              No se encontraron usuarios con esos filtros.
            </div>
          )}
        </div>
      </div>


      <Modal
        isOpen={isModalOpen}
        title={
          editingUser
            ? `Editar Usuario #${editingUser.id}`
            : "Crear Nuevo Usuario"
        }
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
