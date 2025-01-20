import LoginPage from "./pages/LoginPage.tsx";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import DashboardPage from "@/pages/DashboardPage.tsx";
import {isAdmin, isLogged} from "@/lib/utils.ts";
import UserPage from "@/pages/UserPage.tsx";
import NavBar from "@/components/NavBar.tsx";

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

const NotLoggedRoutes = () => {
  if (isAdmin()) return <Navigate to='/dashboard'/>
  if (isLogged()) return <Navigate to='/profile'/>
  return <Outlet />
}

const App = () => {
  return (
    <div className={'w-screen overflow-x-hidden'}>
      <Router>
        <NavBar/>
        <div className="flex flex-col items-center justify-center pt-4 w-full px-2">
          <Routes>
              {/* Routes that don't need any rights */}

              {/* Routes that need to have no users*/}
              <Route element={<NotLoggedRoutes/>}>
                <Route path="/" element={<LoginPage/>}/>
              </Route>
              {/* Routes that need logged user */}
              <Route element={<LoggedRoutes/>}>
                <Route path="/profile" element={<UserPage/>}/>
              </Route>
              {/* Routes that need Admin right */}
              <Route element={<AdminRoutes/>}>
                <Route path="/dashboard" element={<DashboardPage/>} />
              </Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
