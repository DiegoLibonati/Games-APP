import { useDispatch } from "react-redux";
import { useAuthStore, useSlide, useForm } from "../../hooks/exports";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { startGettingImagesToLoginAndRegisterPage } from "../../store/auth/exports";
import { Loader, SlideButtonList } from "../../ui/components/exports";
import { HeaderPresentation, InputForm } from "../components/exports";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import Wave from "react-wavify";
import "./LoginPage.css";

const formData = {
  email: "",
  password: "",
};

const formValidations = {
  email: [
    [(value) => value.includes("@"), "The email must have an @"],
    [
      (value) =>
        value.match(
          // eslint-disable-next-line
          /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        ),
      "The email must have a valid format",
    ],
  ],
  password: [
    [
      (value) => value.length >= 6,
      "The password must have at least 6 characters",
    ],
  ],
};

export const LoginPage = () => {
  const dispatch = useDispatch();

  const {
    imagesLoginAndRegister,
    isLoading,
    handleLoginWithEmailAndPassword,
    handleLoginWithGoogle,
  } = useAuthStore();
  const { index, setIndex } = useSlide(imagesLoginAndRegister);

  const {
    email,
    password,
    onInputChange,
    emailValid,
    passwordValid,
    isFormValid,
  } = useForm(formData, formValidations);

  const onSubmitForm = (e) => {
    e.preventDefault();

    if (!isFormValid) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: emailValid || passwordValid,
      });
    }

    handleLoginWithEmailAndPassword({ email, password });
  };

  const onSubmitWithGoogle = () => {
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
            value={email}
            name="email"
            func={onInputChange}
          ></InputForm>

          <InputForm
            type="password"
            placeholder="Your password"
            value={password}
            name="password"
            func={onInputChange}
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
