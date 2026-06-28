import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import imgDesktop from '../../../assets/facuimg/login-desk.png';
import logoMobile from '../../../assets/facuimg/mob.png';

function RegisterPage() {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen flex items-center justify-center px-4 bg-amber-950 py-8'>

      <div className='w-full max-w-4xl mx-auto'>

         <div className='grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden'>
          
          <div className='relative p-8 md:p-10 flex flex-col justify-center'>
            
            <button
              type='button'
              onClick={() => navigate('/')}
              className='absolute top-4 right-4 md:hidden text-gray-400 hover:text-gray-600'
            >
              ✕
            </button>

            <div className="mb-6 md:hidden flex justify-center">
               <img src={logoMobile} alt="Logo" className="h-20 w-auto" />
            </div>

            <div className="mb-6 hidden md:block">
                <h2 className="text-3xl font-extrabold text-gray-900">Crear Cuenta</h2>
               <p className="text-gray-500 text-sm mt-1">
                 Regístrate para gestionar tus reservas fácilmente.
               </p>
            </div>

            <RegisterForm onSuccess={() => navigate('/login')} />
            
            <div className='mt-6 text-center flex flex-col gap-3'>
                <p className="text-sm text-gray-600">
                  ¿Ya tienes cuenta?{' '}
                  <span 
                    onClick={() => navigate('/login')} 
                    className="text-accent-600 font-bold cursor-pointer hover:underline"
                  >
                    Inicia Sesión
                  </span>
                </p>
                
                <button
                  type='button'
                  onClick={() => navigate('/')}
                  className='text-sm text-gray-400 hover:text-gray-600 underline'
                >
                  Volver al inicio
                </button>
            </div>

          </div>

          <div className='hidden md:block relative bg-gray-100'>
            <img 
              src={imgDesktop} 
              alt="Registro Cover" 
              className='absolute inset-0 w-full h-full object-cover' 
            />
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
