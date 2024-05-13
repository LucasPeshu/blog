import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PostDetailPage from './pages/PostDetailPage';
import Header from './components/Header';
import CategoriaPosts from './pages/CategoriaPosts';
import NotFoundPage from './pages/NotFoundPage';
import SearchResultsPage from './pages/SearchResultsPage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:slug" element={<PostDetailPage />} />
        <Route path="/posts/categoria/:categoria" element={<CategoriaPosts />} />
        <Route path="/search/:searchTerm" element={<SearchResultsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
