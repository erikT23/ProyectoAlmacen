import "./App.css";
import { AuthContextProvider } from "./index";
function App() {
  return (
    <>
      <AuthContextProvider>
        <span>Hola desde ContProv</span>
      </AuthContextProvider>
    </>
  );
}

export default App;
