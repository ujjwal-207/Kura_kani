import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import { Meeting } from "./pages/Meeting";
import PersonalRoom from "./pages/PersonalRoom";
import PreviousPage from "./pages/Previous";
import Recordings from "./pages/Recordings";
import Upcoming from "./pages/Upcoming";

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
                  <Route path="/personalroom" element={<PersonalRoom />} />
                  <Route path="/previous" element={<PreviousPage />} />
                  <Route path="/recordings" element={<Recordings />} />
                  <Route path="/upcoming" element={<Upcoming />} />

                  <Route path="/metting/:id" element={<Meeting />} />
                </Routes>
              </div>
            </section>
          </div>
        </main>
      </Router>
    </div>
  );
}
