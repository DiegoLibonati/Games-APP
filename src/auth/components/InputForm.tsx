import { InputFormProps } from "../../entities/entities";

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
