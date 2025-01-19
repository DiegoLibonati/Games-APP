import { useEffect } from "react";
import Swal from "sweetalert2";

import { AppRouter } from "./router/AppRouter";
import { useAuthStore } from "./hooks/useAuthStore";

function App(): JSX.Element {
  const { errorMessage } = useAuthStore();

  useEffect(() => {
    if (errorMessage) Swal.fire("Error", errorMessage, "error");
  }, [errorMessage]);

  return <AppRouter></AppRouter>;
}

export default App;
