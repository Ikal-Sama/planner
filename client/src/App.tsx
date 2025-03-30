import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Layout from "./components/shared/Layout";
import ProtectedRoute from "./components/protected-route";
import AuthLayout from "./components/shared/AuthLayout";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import ProtectedAuth from "./components/protect-auth";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";
import Project from "./pages/Project";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/projects/:id' element={<Project />} />
          </Route>
        </Route>

        <Route element={<ProtectedAuth />}>
          <Route element={<AuthLayout />}>
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
          </Route>
        </Route>

        {/* Page 404 Optional: Catch-all route */}
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Toaster position='top-center' reverseOrder={false} />
    </Router>
  );
}

export default App;
