import { Routes, Route } from "react-router-dom";

import Home from "./screens/Home";
import AdminLogin from "./screens/AdminLogin";
import Navbar from "./components/Navbar";
import CoverPage from "./screens/CoverPage";
import UserLogin from "./screens/UserLogin";
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
        <Routes>
          <Route path="/" element={<div></div>} />
          <Route path="/*" element={<Navbar />} />
        </Routes>
      </div>

      <div>
        <Routes>
          <Route path="/" element={<CoverPage />} />
          <Route path="/userLogin" element={<UserLogin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
