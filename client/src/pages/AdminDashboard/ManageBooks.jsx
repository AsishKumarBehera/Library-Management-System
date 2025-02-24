import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./ManageBooks.css"; // Updated CSS import

const ManageBooks = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [books, setBooks] = useState([]);
  const [editBook, setEditBook] = useState(null);

  // Fetch all books from the backend
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:2000/api/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Add or update book
  const onSubmit = async (data) => {
    if (editBook) {
      try {
        await axios.put(
          `http://localhost:2000/api/books/${editBook._id}`,
          data
        );
        alert("Book updated successfully!");
      } catch (error) {
        console.error("Error updating book:", error);
      }
    } else {
      try {
        await axios.post("http://localhost:2000/api/books", data);
        alert("Book added successfully!");
      } catch (error) {
        console.error("Error adding book:", error);
      }
    }

    reset();
    setEditBook(null);
    fetchBooks();
  };

  // Handle edit button click
  const handleEdit = (book) => {
    setEditBook(book);
    setValue("title", book.title);
    setValue("author", book.author);
    setValue("category", book.category);
    setValue("image", book.image);
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:2000/api/books/${id}`);
      alert("Book deleted successfully!");
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="manage-books">
      <h2>Manage Books</h2>
      <div className="managge">
        <form onSubmit={handleSubmit(onSubmit)} className="book-form">
          <input
            type="text"
            placeholder="Title"
            {...register("title")}
            required
          />
          <input
            type="text"
            placeholder="Author"
            {...register("author")}
            required
          />
          <input
            type="text"
            placeholder="Category"
            {...register("category")}
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            {...register("image")}
            required
          />

          <button type="submit">{editBook ? "Update Book" : "Add Book"}</button>
        </form>
      </div>

      <h3>Book List</h3>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>
                  <img
                    src={book.image}
                    alt={book.title}
                    className="book-image"
                  />
                </td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(book)}>
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(book._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooks;
