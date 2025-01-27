import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import PersonalRoom from "./pages/PersonalRoom";
import PreviousPage from "./pages/Previous";
import Recordings from "./pages/Recordings";
import Upcoming from "./pages/Upcoming";
import Meeting from "./pages/Meeting";

export default function App() {
  return (
    <div>
      <Router basename="https://kura-kani-r9ks.onrender.com">
        <main className="relative">
          <Navbar />

          <div className="flex">
            <Sidebar />

            <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14 bg-[#FFFDEC]">
              <div className="w-full">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/personalroom" element={<PersonalRoom />} />
                  <Route path="/previous" element={<PreviousPage />} />
                  <Route path="/recordings" element={<Recordings />} />
                  <Route path="/upcoming" element={<Upcoming />} />

                  <Route path="/meeting/:id" element={<Meeting />} />
                </Routes>
              </div>
            </section>
          </div>
        </main>
      </Router>
    </div>
  );
}
