import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <div>
      <Router>
        <main className="relative">
          <Navbar />

          <div className="flex">
            <Sidebar />

            <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
              <div className="w-full">
                <Routes>
                  <Route path="/" element={<Home />} />
                </Routes>
              </div>
            </section>
          </div>
        </main>
      </Router>
    </div>
  );
}
