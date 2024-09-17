import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import AddBook from "./components/AddBook";
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails"; 
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const handleSetToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login setToken={handleSetToken} />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/profile" 
            element={token ? <Profile token={token} /> : <Login setToken={handleSetToken} />} 
          />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/books/:id" element={<AddBook />} /> 
          <Route path="/books/details/:id" element={<BookDetails />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
