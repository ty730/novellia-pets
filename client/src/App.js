import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./layouts/Layout";
import DashboardPage from "./pages/DashboardPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CreateAccount from "./pages/CreateAccount";
import PetChart from "./pages/PetChart";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Layout />}>
          <Route index element={<RegisterPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="create" element={<CreateAccount />} />
          <Route path="chart/:id" element={<PetChart />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
