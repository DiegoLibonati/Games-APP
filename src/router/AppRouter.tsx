import { Navigate, Route, Routes } from "react-router-dom";
import { CheckingAuth } from "../auth/components/exports";
import { AuthRoutes } from "../auth/routes/exports";
import { GamesRoutes } from "../games/routes/exports";
import { useCheckAuth } from "../hooks/exports";

export const AppRouter = (): JSX.Element => {
  const { status } = useCheckAuth();

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
