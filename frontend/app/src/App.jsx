import Layout from "./components/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Players from "./pages/Players";
import TanksList from "./pages/TanksList";
import PlayerDetails from "./pages/PlayerDetails";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Players />} />
          <Route path="/vehicles" element={<TanksList />} />
          <Route path="/player-details" element={<PlayerDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
