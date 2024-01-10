import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { AuthcontextProvider } from "./index";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AuthcontextProvider>
        <span>hola desde context</span>
      </AuthcontextProvider>
    </>
  );
}

export default App;
