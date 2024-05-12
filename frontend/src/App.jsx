import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostDetailPage from './pages/PostDetailPage';
import Header from './components/Header';
import CategoriaPosts from './pages/CategoriaPosts';
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:slug" element={<PostDetailPage />} />
        <Route path="/posts/categoria/:categoria" element={<CategoriaPosts />} />
      </Routes>
    </Router>
  );
}

export default App;
