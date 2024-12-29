interface InputFormProps {
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  value: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const InputForm = ({
  type,
  placeholder,
  value,
  name,
  onChange,
}: InputFormProps): JSX.Element => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
    ></input>
  );
};
