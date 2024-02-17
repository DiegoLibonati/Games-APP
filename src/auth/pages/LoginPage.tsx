import { useAuthStore, useSlide, useForm } from "../../hooks/exports";
import { useEffect } from "react";
import { startGettingImagesToLoginAndRegisterPage } from "../../store/auth/exports";
import { Loader, SlideButtonList } from "../../ui/components/exports";
import { HeaderPresentation, InputForm } from "../components/exports";
import { FormDataAuth } from "../../entities/entities";
import { useAppDispatch } from "../../store/store";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Wave from "react-wavify";
import logo from "../../assets/logo.png";
import "./LoginPage.css";

const formData: FormDataAuth = {
  email: "",
  password: "",
};

export const LoginPage = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const {
    imagesLoginAndRegister,
    isLoading,
    handleLoginWithEmailAndPassword,
    handleLoginWithGoogle,
  } = useAuthStore();

  const { index, setIndex } = useSlide<string>(imagesLoginAndRegister);

  const { formState, onInputChange } = useForm<FormDataAuth>(formData);

  const onSubmitForm: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!formState.email.trim() || !formState.password.trim()) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid email or password",
      });
    }

    handleLoginWithEmailAndPassword({
      email: formState.email,
      password: formState.password,
    });
  };

  const onSubmitWithGoogle = (): void => {
    handleLoginWithGoogle();
  };

  useEffect(() => {
    dispatch(startGettingImagesToLoginAndRegisterPage());
  }, [dispatch]);

  return (
    <main className="main_container_login">
      <section className="login_container">
        <article className="login_container_information">
          {isLoading ? (
            <Loader></Loader>
          ) : (
            <>
              <img src={imagesLoginAndRegister[index]} alt="loginimage"></img>

              <HeaderPresentation index={index}></HeaderPresentation>

              <SlideButtonList
                index={index}
                setIndex={setIndex}
              ></SlideButtonList>
            </>
          )}
        </article>

        <form className="login_container_form" onSubmit={onSubmitForm}>
          <img src={logo} alt="logo"></img>

          <InputForm
            type="text"
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

          <button type="submit">Login</button>
          <button type="button" onClick={onSubmitWithGoogle}>
            Google
          </button>
          <Link to="/auth/register">Register</Link>
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
