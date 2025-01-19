import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Wave from "react-wavify";

import { Loader } from "../../../ui/components/Loader/Loader";
import { SlideButtonList } from "../../../ui/components/SlideButtonList/SlideButtonList";
import { HeaderPresentation } from "../../components/HeaderPresentation/HeaderPresentation";
import { InputForm } from "../../components/InputForm/InputForm";

import { useSlide } from "../../../hooks/useSlide";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { useForm } from "../../../hooks/useForm";
import { rootCss } from "../../../constants/configCss";

import logo from "../../../assets/logo.png";
import "./RegisterPage.css";

type FormDataRegister = {
  email: string;
  password: string;
  repeatPassword: string;
  username: string;
};

const formData: FormDataRegister = {
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
};

export const RegisterPage = (): JSX.Element => {
  const {
    images,
    isLoadingImages,
    handleCreateNewUserWithEmailAndPassword,
    handleGetImages,
  } = useAuthStore();

  const { index, handleSetIndex } = useSlide<string>(images);
  const { formState, onInputChange } = useForm<FormDataRegister>(formData);

  const onSubmitForm: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const email = formState.email.trim();
    const password = formState.password.trim();
    const repeatPassword = formState.repeatPassword.trim();
    const username = formState.username.trim();

    if (!email || !password || !repeatPassword || !username) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You need to complete all the fields",
      });
    }

    if (password !== repeatPassword) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords must be identical to each other",
      });
    }

    handleCreateNewUserWithEmailAndPassword(formState);
  };

  useEffect(() => {
    handleGetImages();
  }, []);

  return (
    <main className="register__page">
      <section className="register">
        <article className="register__information">
          {isLoadingImages ? (
            <Loader></Loader>
          ) : (
            <Fragment>
              <img src={images[index]} alt="registerimage"></img>

              <HeaderPresentation>
                {index === 0
                  ? "The best free games wiki"
                  : index === 1
                  ? "Share with your friends"
                  : "Stay up to date with the latest news"}
              </HeaderPresentation>

              <SlideButtonList
                index={index}
                handleSetIndex={handleSetIndex}
              ></SlideButtonList>
            </Fragment>
          )}
        </article>

        <form className="register__form" onSubmit={onSubmitForm}>
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
            value={formState.repeatPassword}
            name="repeatPassword"
            onChange={onInputChange}
          ></InputForm>

          <button type="submit" aria-label="submit register">
            Register
          </button>
          <Link to="/auth/login" aria-label="Go to login page">
            Go to Login
          </Link>
        </form>
      </section>

      <Wave
        className="register__wave"
        fill={rootCss.colors.secondary}
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
