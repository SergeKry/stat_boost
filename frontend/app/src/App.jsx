import Layout from "./components/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TanksList from "./pages/TanksList"

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicles" element={<TanksList />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
