import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Swal, { SweetAlertIcon } from "sweetalert2";

import { CheckingAuth } from "../auth/components/CheckingAuth/CheckingAuth";

import { useCheckAuth } from "../hooks/useCheckAuth";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { GamesRoutes } from "../games/routes/GamesRoutes";

import { useUiStore } from "../hooks/useUiStore";

export const AppRouter = (): JSX.Element => {
  const { alert, handleCloseAlert } = useUiStore();
  const { status } = useCheckAuth();

  useEffect(() => {
    if (!alert.isOpen) return;

    Swal.fire(alert.title, alert.message, alert.type as SweetAlertIcon);
    handleCloseAlert();
  }, [alert.isOpen]);

  if (status === "checking") return <CheckingAuth></CheckingAuth>;

  return (
    <Routes>
      {status === "authenticated" ? (
        <Route path="/*" element={<GamesRoutes></GamesRoutes>}></Route>
      ) : (
        <Route path="/auth/*" element={<AuthRoutes></AuthRoutes>}></Route>
      )}

      <Route path="/*" element={<Navigate to="/auth/login"></Navigate>}></Route>
    </Routes>
  );
};
