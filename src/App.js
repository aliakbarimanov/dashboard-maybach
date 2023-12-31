// import sass
import "./assets/scss/index.scss";

// import components
import Header from "./components/Header";
import Footer from "./components/Footer";

// import pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
import Registration from "./pages/Registration";
import ProductsPage from "./pages/ProductsPage";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import NotFound from "./pages/NotFound";

// import routes
import ProtectedRoutes from "./routes/ProtectedRoutes";

// import Routes
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Context
import { MainContext } from "./utils/MainContext";

function App() {
  return (
    <BrowserRouter>
      <MainContext>
        <main>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/create-product" element={<CreateProduct />} />
              <Route path="/edit-product/:id" element={<EditProduct />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </main >
      </MainContext>
    </BrowserRouter>
  );
}

export default App;