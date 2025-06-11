import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import AllDrugs from "./pages/AllDrugs";
import NewArrivals from "./pages/NewArrivals";
import Offers from "./pages/Offers";
import FullPageLoader from "./components/FullPageLoader";
import { useEffect, useState } from "react";

// مكون فرعي يحتوي على كل ما يعتمد على useLocation
function AppContent() {
  const location = useLocation();
  const [loadingRoute, setLoadingRoute] = useState(false);

  useEffect(() => {
    setLoadingRoute(true);
    const timeout = setTimeout(() => {
      setLoadingRoute(false);
    }, 800); // وقت وهمي لتأثير التحميل

    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <>
      {loadingRoute && <FullPageLoader />}
      <Navbar />
      <Routes>
        <Route path="/" element={<AllDrugs />} />
        <Route path="/new" element={<NewArrivals />} />
        <Route path="/offers" element={<Offers />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
