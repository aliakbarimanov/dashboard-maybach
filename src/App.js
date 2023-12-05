// import sass
import "./assets/scss/index.scss";

// import components
import Header from "./components/Header";
import Footer from "./components/Footer";

// import pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import ProductsPage from "./pages/ProductsPage";
import CreateProduct from "./pages/CreateProduct";
import NotFound from "./pages/NotFound";

// import routes
import ProtectedRoutes from "./routes/ProtectedRoutes";

// import Routes
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/create-product" element={<CreateProduct />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </main >
    </BrowserRouter>
  );
}

export default App;