import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chat from "./components/Chat";
import Guide from "./components/Guide";
import Hero from "./components/Hero";
import Feature from "./components/Feature";
import Leaderboard from "./components/Leaderboard";
import CandidateDetails from "./components/CandidateDetails";
import Login from "./components/Login";
import { useState } from "react";
import Dashboard from "./Dashboard";

function AppContent() {
  const location = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {location.pathname !== "/login" && <Navbar />}

      <main className="grow">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route
            path="/features"
            element={<Feature openChat={() => setIsChatOpen(true)} />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/candidate/:id" element={<CandidateDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/guide" element={<Guide />} />
        </Routes>
      </main>

      {location.pathname !== "/login" && <Footer />}
      {location.pathname !== "/login" && (
        <Chat isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
