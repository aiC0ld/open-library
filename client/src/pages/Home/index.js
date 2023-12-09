import { Col, message, Row, Table, Badge } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteBook, GetAllBooks } from "../../apicalls/books";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";

function Home() {
  const [books, setBooks] = React.useState([]);
  const [filteredBooks, setFilteredBooks] = React.useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getBooks = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllBooks();
      dispatch(HideLoading());
      if (response.success) {
        setBooks(response.data);
        setFilteredBooks(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const searchBooks = async (title) => {
    const filtered = books.filter((book) => {
      return book.title.toLowerCase().includes(title.toLowerCase())
    });
    setFilteredBooks(filtered);
  };

  return (
    <div className="mt-2">
      <div class="search-bar" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <input type="search" placeholder="Search by title" className="search-input" id="search"
          onChange={() => searchBooks(document.getElementById("search").value)}
          style={{ marginTop: "10px", marginBottom: "30px", width: "50%" }}
        ></input>
      </div>


      <Row gutter={[16, 16]}>
        {filteredBooks.map((book) => {
          return (
            <Col xs={24} sm={24} md={12} lg={6} xl={6}
              key={book._id}
              onClick={() => navigate(`/book/${book._id}`)}
            >
              <Badge.Ribbon
                text={book.availableCopies > 0 ? "Available" : "Not Available"}
                color={book.availableCopies > 0 ? "green" : "red"}
              >
                <div className="rounded bg-white p-2 shadow flex flex-col gap-1">
                  <img src={book.image} height="350px" />
                  <h1 className="text-md text-secondary uppercase font-bold mt-2">
                    {book.title}
                  </h1>
                </div>
              </Badge.Ribbon>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default Home;
