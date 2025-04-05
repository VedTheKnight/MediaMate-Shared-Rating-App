import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/UserHome";
import Books from "./pages/Books";
import BookDetails from './pages/BookDetails';
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows";
import Watchlist from "./pages/Watchlist";
import BooksWatchlist from "./pages/BooksWatchlist";
import MoviesWatchlist from "./pages/MoviesWatchlist";
import TVShowsWatchlist from "./pages/TVShowsWatchlist";
import Groups from "./pages/Groups";
import Friends from "./pages/Friends";
import Settings from "./pages/Settings";
import Notfound from "./pages/Notfound";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/items/books" element={<Books />} />
        <Route path="/items/books/:id" element={<BookDetails />} />
        <Route path="/items/movies" element={<Movies />} />
        <Route path="/items/tvshows" element={<TVShows />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/watchlist/books" element={<BooksWatchlist />} />
        <Route path="/watchlist/movies" element={<MoviesWatchlist />} />
        <Route path="/watchlist/tvshows" element={<TVShowsWatchlist />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/*" element={<Notfound />} />
      </Routes>
    </Router>
  );
}

export default App;