// src/components/BookList.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBooks, deleteBook } from "../api";
import "../styles.css"; // Ensure this file includes styles for .book-table and .button-group

const BookList = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getBooks();
        setBooks(response.data);
      } catch (error) {
        console.error("Fetch Books Error:", error.response?.data || error.message);
      }
    };
    fetchBooks();
  }, []);

  const handleEdit = (id) => {
    navigate(`/books/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteBook(id);
        const response = await getBooks();
        setBooks(response.data);
      } catch (error) {
        console.error("Delete Book Error:", error.response?.data || error.message);
      }
    }
  };

  const handleView = (id) => {
    navigate(`/books/details/${id}`);
  };

  return (
    <div className="container">
      <h2>Books List</h2>
      <table className="book-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Description</th>
            <th>Published Date</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.description}</td>
              <td>{book.published_date}</td>
              <td>${book.price}</td>
              <td>
                <div className="button-group">
                  <button className="icon-btn edit-button" onClick={() => handleEdit(book.id)}>
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="icon-btn delete-button" onClick={() => handleDelete(book.id)}>
                    <i className="fas fa-trash"></i>
                  </button>
                  <button className="icon-btn view-button" onClick={() => handleView(book.id)}>
                    <i className="fas fa-eye"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
