function Button({ children, type = 'button', variant = 'default', ...restProps }) {
  if (!['button', 'reset', 'submit'].includes(type)) {
    console.warn('type prop not supported');
  }

  const variantStyle = {
    default: 'bg-accent-600 text-white hover:bg-accent-700 hover:shadow-lg transition-all duration-200',
    
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 transition-all duration-200',

    outline: 'border border-accent-600 text-accent-600 hover:bg-accent-600 hover:text-white transition-all duration-200'
  };

  return (
    <button
      {...restProps}
      className={`py-2 px-4 rounded-md font-medium ${variantStyle[variant]} ${restProps.className || ''}`}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;