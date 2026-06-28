import LoginForm from '../components/LoginForm';

function LoginPage() {
  return (
    <div className='
      min-h-screen
      bg-amber-950
      flex
      items-start
      sm:items-center
      justify-center
      px-4
      py-4
      sm:py-6
      md:py-8
      overflow-y-auto
    '>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
