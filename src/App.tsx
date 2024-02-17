import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppRouter } from "./router/AppRouter";
import Swal from "sweetalert2";
import { RootState } from "./store/store";
import "./App.css";

function App(): JSX.Element {
  const { errorMessage } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (errorMessage) Swal.fire("Error", errorMessage, "error");
  }, [errorMessage]);

  return <AppRouter></AppRouter>;
}

export default App;
