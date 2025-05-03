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
import CommunityPage from "./pages/CommunityPage";
import Friends from "./pages/Friends";
import Settings from "./pages/Settings";
import Chatbot from "./pages/Chatbot";
import Notfound from "./pages/Notfound";
import UserWatchlist from "./pages/UserWatchlist";
import UserBooksWatchlist from "./pages/UserBooksWatchlist";
import UserTVShowsWatchlist from "./pages/UserTVShowsWatchlist";
import UserMoviesWatchlist from "./pages/UserMoviesWatchlist";
import UserHome from "./pages/UserHome";
import MovieDetails from "./pages/MovieDetails";
import TVShowDetails from "./pages/TVShowDetails";
import FriendsActivity from "./pages/FriendsActivity";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/activity" element={<FriendsActivity />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/items/books" element={<Books />} />
        <Route path="/items/movies" element={<Movies />} />
        <Route path="/items/tvshows" element={<TVShows />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/watchlist/books" element={<BooksWatchlist />} />
        <Route path="/watchlist/movies" element={<MoviesWatchlist />} />
        <Route path="/watchlist/tvshows" element={<TVShowsWatchlist />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/groups/:id" element={<CommunityPage />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/*" element={<Notfound />} />
        <Route path="/watchlist2/:userId" element={<UserWatchlist/>} />
        <Route path="/watchlist2/:userId/books" element={<UserBooksWatchlist/>} />
        <Route path="/watchlist2/:userId/movies" element={<UserMoviesWatchlist/>} />
        <Route path="/watchlist2/:userId/tvshows" element={<UserTVShowsWatchlist/>} />
        <Route path="/dashboard/:userId" element={<UserHome/>} />
        <Route path="/content/movie/:id" element={<MovieDetails />} />
        <Route path="/content/book/:id" element={<BookDetails />} />
        <Route path="/content/tv/:id" element={<TVShowDetails />} />
        <Route path="/content/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App; 