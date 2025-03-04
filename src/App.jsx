import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Header />
      <main className="min-h-[80vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster/>
    </>
  );
}

export default App;
