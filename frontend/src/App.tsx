import LoginPage from "./pages/LoginPage.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "@/pages/DashboardPage.tsx";

const App = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Router>
        <Routes>
            <Route
                path="/" element={<LoginPage/>}/>
            <Route path="/dashboard" element={<DashboardPage/>}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
