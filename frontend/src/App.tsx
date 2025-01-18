import LoginPage from "./pages/LoginPage.tsx";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import DashboardPage from "@/pages/DashboardPage.tsx";
import {isAdmin, isLogged} from "@/lib/utils.ts";

const LoggedRoutes = () => {
  return (
    isLogged() ? <Outlet/> : <Navigate to='/'/>
  )
}

const AdminRoutes = () => {
  return (
    isAdmin() ? <Outlet/> : <Navigate to='/'/>
  )
}

const App = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Router>
        <Routes>
          {/* Routes that don't need any rights */}
          <Route path="/" element={<LoginPage/>}/>
          {/* Routes that need logged user */}
          <Route element={<LoggedRoutes/>}>

          </Route>
          {/* Routes that need Admin right */}
          <Route element={<AdminRoutes/>}>
            <Route path="/dashboard" element={<DashboardPage/>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
