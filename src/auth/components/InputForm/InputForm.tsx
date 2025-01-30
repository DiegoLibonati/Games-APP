interface InputFormProps {
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  value: string;
  name: string;
  className?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const InputForm = ({
  type,
  placeholder,
  value,
  name,
  className,
  onChange,
}: InputFormProps): JSX.Element => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      className={className}
      onChange={onChange}
    ></input>
  );
};
