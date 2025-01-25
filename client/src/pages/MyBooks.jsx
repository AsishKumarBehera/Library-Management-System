import React from "react";

const MyBooks = ({ myBooks }) => {
    return (
      <div className="my-books">
        <h1>My Books</h1>
        {myBooks.length === 0 ? (
          <p>You have not borrowed any books yet.</p>
        ) : (
          <div className="books-list">
            {myBooks.map((book, index) => (
              <div key={book.id || index} className="book-card">
                <img src={book.image} alt={book.title} className="book-img" />
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <p>{book.category}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

export default MyBooks;
