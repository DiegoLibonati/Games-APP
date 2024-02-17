import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage, RegisterPage } from "../pages/exports";

export const AuthRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage></LoginPage>}></Route>
      <Route path="register" element={<RegisterPage></RegisterPage>}></Route>
      <Route path="/*" element={<Navigate to="/auth/login"></Navigate>}></Route>
    </Routes>
  );
};
