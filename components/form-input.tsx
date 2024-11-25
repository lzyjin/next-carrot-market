interface FormInputProps {
  type: string;
  placeholder: string;
  required: boolean;
  errors?: string[];
  name: string;
}

export default function FormInput({type, placeholder, required, errors = [], name}: FormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="bg-transparent rounded-md w-full h-10 border-none transition
          ring-1 ring-neutral-200 focus:ring-4 focus:ring-orange-500 focus:outline-none
          placeholder:text-neutral-400"
      />
      {
        errors.map((error, index) => (
          <span key={index} className="text-red-500 font-medium">{error}</span>
        ))
      }
    </div>
  );
}