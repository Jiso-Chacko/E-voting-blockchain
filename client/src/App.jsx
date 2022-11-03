import { Routes, Route } from "react-router-dom";

import Home from "./screens/Home";
import AdminLogin from "./screens/AdminLogin";
import Navbar from "./components/Navbar";
import CoverPage from "./screens/CoverPage";
import UserLogin from "./screens/UserLogin";
import { AuthProvider } from "./Context/AuthContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<div></div>} />
            <Route path="/*" element={<Navbar />} />
          </Routes>
        </AuthProvider>
      </div>

      <div>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<CoverPage />} />
            <Route path="/userLogin" element={<UserLogin />} />
            <Route path="/home" element={<Home />} />
            <Route path="/adminLogin" element={<AdminLogin />} />
          </Routes>
        </AuthProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
