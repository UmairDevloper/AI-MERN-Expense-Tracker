import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/HomePage";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import Login from "./components/Users/Login";
import Register from "./components/Users/Register";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import { useSelector } from "react-redux";
import AddCategory from "./components/Category/AddCategory";
import CategoriesList from "./components/Category/CategoryList";
import UpdateCategory from "./components/Category/UpdateCategory";
import TransactionForm from "./components/Transaction/TransactionForm";
import Dashboard from "./components/Users/Dashboard";
import UserProfile from "./components/Users/UserProfile";
import AuthRoute from "./components/Auth/AuthRoute";

function App() {
  const user = useSelector((state) => state?.auth?.user);

  return (
    <BrowserRouter>
      {/* Navbar */}
      {user ? <PrivateNavbar /> : <PublicNavbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/add-category"
          element={
            <AuthRoute>
              <AddCategory />
            </AuthRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <AuthRoute>
              <CategoriesList />
            </AuthRoute>
          }
        />
        <Route
          path="/update-categories/:id"
          element={
            <AuthRoute>
              <UpdateCategory />
            </AuthRoute>
          }
        />
        <Route
          path="/add-transaction"
          element={
            <AuthRoute>
              <TransactionForm />
            </AuthRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthRoute>
              <UserProfile />
            </AuthRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
