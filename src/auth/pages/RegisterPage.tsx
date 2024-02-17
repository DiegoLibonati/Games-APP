import { useAuthStore, useSlide, useForm } from "../../hooks/exports";
import { useEffect } from "react";
import { startGettingImagesToLoginAndRegisterPage } from "../../store/auth/exports";
import { SlideButtonList } from "../../ui/components/exports";
import { HeaderPresentation, InputForm } from "../components/exports";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { FormDataRegister } from "../../entities/entities";
import Swal from "sweetalert2";
import logo from "../../assets/logo.png";
import Wave from "react-wavify";
import "./LoginPage.css";

const formData: FormDataRegister = {
  username: "",
  email: "",
  password: "",
  repeatpassword: "",
};

export const RegisterPage = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { imagesLoginAndRegister, handleCreateNewUserWithEmailAndPassword } =
    useAuthStore();
  const { index, setIndex } = useSlide<string>(imagesLoginAndRegister);
  const { formState, onInputChange } = useForm<FormDataRegister>(formData);

  const onSubmitForm: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (
      !formState.email.trim() ||
      !formState.password.trim() ||
      !formState.repeatpassword.trim() ||
      !formState.username.trim()
    ) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You need to complete all the fields",
      });
    }

    if (formState.password.trim() !== formState.repeatpassword.trim()) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords must be identical to each other",
      });
    }

    handleCreateNewUserWithEmailAndPassword(formState);
  };

  useEffect(() => {
    dispatch(startGettingImagesToLoginAndRegisterPage());
  }, [dispatch]);

  return (
    <main className="main_container_login">
      <section className="login_container">
        <article className="login_container_information">
          <img src={imagesLoginAndRegister[index]} alt="loginimage"></img>

          <HeaderPresentation index={index}></HeaderPresentation>

          <SlideButtonList index={index} setIndex={setIndex}></SlideButtonList>
        </article>

        <form className="login_container_form" onSubmit={onSubmitForm}>
          <img src={logo} alt="logo"></img>

          <InputForm
            type="text"
            placeholder="Your username"
            value={formState.username}
            name="username"
            onChange={onInputChange}
          ></InputForm>

          <InputForm
            type="email"
            placeholder="Your email"
            value={formState.email}
            name="email"
            onChange={onInputChange}
          ></InputForm>

          <InputForm
            type="password"
            placeholder="Your password"
            value={formState.password}
            name="password"
            onChange={onInputChange}
          ></InputForm>

          <InputForm
            type="password"
            placeholder="Repeat your password"
            value={formState.repeatpassword}
            name="repeatpassword"
            onChange={onInputChange}
          ></InputForm>

          <button type="submit">Register</button>
          <Link to="/auth/login">Go to Login</Link>
        </form>
      </section>

      <Wave
        className="login_wave"
        fill="#251351"
        paused={false}
        options={{
          amplitude: 40,
          speed: 0.15,
          points: 3,
        }}
      />
    </main>
  );
};
