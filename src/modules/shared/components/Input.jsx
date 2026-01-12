function Input({ label, error = '', className = '', ...restProps }) {
  const inputClass = `${className} w-full border rounded px-3 py-2`;
  const errorClass = error ? 'border-red-400' : '';

  return (
    <div className='flex flex-col gap-1'>
      <label className='text-sm font-medium'>{label}:</label>
      <input className={`${inputClass} ${errorClass}`} {...restProps} />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default Input;
