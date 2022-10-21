import { useEffect } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import "./App.css";
import { AppRouter } from "./router/AppRouter";

function App() {
  const { errorMessage } = useSelector((state) => state.auth);

  useEffect(() => {
    if (errorMessage) Swal.fire("Error", errorMessage, "error");
  }, [errorMessage]);

  return (
    <>
      <AppRouter></AppRouter>
    </>
  );
}

export default App;
