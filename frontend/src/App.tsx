import LoginForm from "./components/LoginForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />}>
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
