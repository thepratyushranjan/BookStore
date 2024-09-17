// src/components/BooksDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBook } from "../api";
import "../styles.css"; // Ensure this file includes styling for the container class

const BooksDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(""); // Added state for handling errors

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBook(id);
        setBook(response.data);
      } catch (error) {
        setError("Failed to fetch book details. Please try again.");
        console.error("Fetch Book Error:", error.response?.data || error.message);
      }
    };
    fetchBook();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format as MM/DD/YYYY
  };

  if (error) return <p className="error-message">{error}</p>; // Display error message
  if (!book) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>Book Details</h2>
      <p><strong>Title:</strong> {book.title}</p>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Description:</strong> {book.description}</p>
      <p><strong>Published Date:</strong> {formatDate(book.published_date)}</p>
      <p><strong>Price:</strong> ${book.price}</p>
      <p><strong>Created Date:</strong> {formatDate(book.created_at)}</p>
      <p><strong>Updated Date:</strong> {formatDate(book.updated_at)}</p>
    </div>
  );
};

export default BooksDetails;
