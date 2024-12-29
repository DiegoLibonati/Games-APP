import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Wave from "react-wavify";

import { Loader } from "../../../ui/components/Loader/Loader";
import { SlideButtonList } from "../../../ui/components/SlideButtonList/SlideButtonList";
import { HeaderPresentation } from "../../components/HeaderPresentation/HeaderPresentation";
import { InputForm } from "../../components/InputForm/InputForm";

import { useAuthStore } from "../../../hooks/useAuthStore";
import { useForm } from "../../../hooks/useForm";
import { useSlide } from "../../../hooks/useSlide";

import logo from "../../../assets/logo.png";
import "./LoginPage.css";

type FormDataAuth = {
  email: string;
  password: string;
};

const formData: FormDataAuth = {
  email: "",
  password: "",
};

export const LoginPage = (): JSX.Element => {
  const {
    images,
    isLoadingImages,
    handleLoginWithEmailAndPassword,
    handleLoginWithGoogle,
    handleGetImages,
  } = useAuthStore();

  const { index, handleSetIndex } = useSlide<string>(images);
  const { formState, onInputChange } = useForm<FormDataAuth>(formData);

  const onSubmitForm: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const email = formState.email.trim();
    const password = formState.password.trim();

    if (!email || !password) {
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
    handleGetImages();
  }, []);

  return (
    <main className="main_container_login">
      <section className="login_container">
        <article className="login_container_information">
          {isLoadingImages ? (
            <Loader></Loader>
          ) : (
            <Fragment>
              <img src={images[index]} alt="loginimage"></img>

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

          <button type="submit" aria-label="submit login">
            Login
          </button>
          <button
            type="button"
            aria-label="login with google"
            onClick={onSubmitWithGoogle}
          >
            Google
          </button>
          <Link to="/auth/register" aria-label="Go to register page">
            Register
          </Link>
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
