import Modal from '../../shared/components/Modal';
import RegisterForm from '../components/RegisterForm';

function RegisterModal({ isOpen, onClose }) {
  return (
    <Modal open={isOpen} onClose={onClose} title="Registrar usuario" sizeClass="max-w-2xl">
      <RegisterForm onSuccess={onClose} />
    </Modal>
  );
}

export default RegisterModal;