import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Card from "./pages/Card";
import Home from "./pages/Home";
import CardDetails from "./pages/CardDetails";
import QuizPlay from "./pages/QuizPlay";
import QuizResult from "./pages/QuizResult";
import Leaderboard from "./pages/Leaderboard";
import Review from "./pages/Review";
import Cardtwo from "./pages/cardtwo";

function App() {
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  return (
    <>
      <div>
        <Header />

        <Routes>
          <Route path="/quiz/:id" element={<CardDetails />} />
          <Route path="/play/:id" element={<QuizPlay />} />
          <Route path="/result" element={<QuizResult />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/review" element={<Review />} />
        </Routes>

        {isHomePage && (
          <>
            <Home />
            <Card />
            <Cardtwo />
          </>
        )}

        <Footer />
      </div>
    </>
  );
}

export default App;
