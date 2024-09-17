// src/components/AddBook.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBook, updateBook, addBook } from "../api";
import "../styles.css";

const AddBook = () => {
  const { id } = useParams();
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    description: "",
    published_date: "",
    price: ""
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Added state for handling errors
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchBook = async () => {
        try {
          const response = await getBook(id);
          setBookData(response.data);
        } catch (error) {
          setErrorMessage("Failed to fetch book details. Please try again.");
          console.error("Fetch Book Error:", error.response?.data || error.message);
        }
      };
      fetchBook();
    }
  }, [id]);

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateBook(id, bookData);
        setSuccessMessage("Book updated successfully!");
      } else {
        await addBook(bookData);
        setSuccessMessage("Book added successfully!");
      }
      setErrorMessage(""); // Clear any previous errors
      navigate("/books");
    } catch (error) {
      setErrorMessage("Failed to submit book details. Please try again.");
      console.error("Submit Book Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="container">
      <h2>{id ? "Edit Book" : "Add Book"}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={bookData.title}
          required
        />
        <label htmlFor="author">Author</label>
        <input
          type="text"
          id="author"
          name="author"
          placeholder="Author"
          onChange={handleChange}
          value={bookData.author}
          required
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={bookData.description}
          required
        />
        <label htmlFor="published_date">Published Date</label>
        <input
          type="date"
          id="published_date"
          name="published_date"
          onChange={handleChange}
          value={bookData.published_date}
          required
        />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          value={bookData.price}
          required
        />
        <button type="submit">{id ? "Update Book" : "Add Book"}</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
    </div>
  );
};

export default AddBook;
