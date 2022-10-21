export const InputForm = ({ type, placeholder, value, name, func }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={func}
    ></input>
  );
};
