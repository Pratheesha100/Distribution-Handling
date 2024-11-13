import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DashboardLayout from "./pages/Dashboard";
import Update from "./pages/Update";
import MangeEmp from "./pages/Agency";
import Product from "./pages/Sales";
import SaleUpdate from "./pages/SaleUpdate";
import Record from "./pages/Record";
import Employee from "./pages/Employee";
import Dash from "./pages/Dash";
import Create from "./pages/Create";
import Returns from "./pages/Returns";
import ReturnCreate from "./pages/ReturnCreate";
import ReturnUpdate from "./pages/ReturnUpdate";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="manageemp" element={<MangeEmp />} />
        <Route path="Product" element={<Product />} />
        <Route path="record" element={<Record />} />
        <Route path="Employee" element={<Employee />} />
        <Route path="manage/:idd" element={<Update />} />
        <Route path="dash" element={<Dash />} />
        <Route path="create" element={<Create />} />
        <Route path="SaleUpdate/:saled" element={<SaleUpdate />} />
        <Route path="returns" element={<Returns />} />
        <Route path="returncreate" element={<ReturnCreate />} />
        <Route path="returnupdate/:saled" element={<ReturnUpdate />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
