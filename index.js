require("dotenv").config();
const helpers = require("./helpers.js");

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

var bodyParser = require("body-parser");
app.use(bodyParser.json());

//Data container
let books = [];

/**
 * Handles GET requests to the root route.
 * It filters books based on query parameters and returns them.
 *
 * @param {Request} req - The request object containing query parameters.
 * @param {Response} res - The response object to send back.
 *
 * @queryparam {Id} id - the id of a book to be returned.
 * @queryparam {Name} name - the name of the book to be returned.
 * @queryparam {Price} price - the maximum price of the book to be returned.
 * @queryparam {Limit} limit - the maximum number of books to be returned.
 *
 * @returns {void}
 */
app.get("/", (req, res) => {
  try {
    const id = req.query.id;
    const name = req.query.name;
    const price = req.query.price;
    const limit = req.query.limit || 50;

    if (id || name || price) {
      const founded_books = books.filter((value) => {
        if (value.id == id) {
          return value;
        }

        if (helpers.compareStrings(name, value.name) > 0.8) {
          return value;
        }

        if (value.price <= Number.parseFloat(price)) {
          return value;
        }
      });

      return res.status(200).send({
        success: true,
        message: "Succefully acess books",
        data: founded_books.slice(0, limit),
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Succefully acess books",
        data: books.slice(0, limit),
      });
    }
  } catch {
    return res.status(500).send({
      success: false,
      message: "internal server error. please try again later",
    });
  }
});

/**
 * Handle POST requests to the root route.
 * It receives the following parameters and addes the book to the list.
 *
 * @param {Request} req - Request object containing the request data.
 * @param {Response} res - Response object to send back.
 *
 * @bodyparam {Name} name - Name of the book.
 * @bodyparam {Price} price - Price of the book.
 *
 * @return {void}
 */
app.post("/", function (req, res) {
  const { name, price } = req.body;

  try {
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "Name is required!",
      });
    }

    if (!price) {
      return res.status(400).send({
        success: false,
        message: "Price is required!",
      });
    }

    const book = {
      id: helpers.generateRandomID(6),
      name: name,
      price: price,
    };

    books.push(book);

    return res.status(201).send({
      success: true,
      message: "Book added succefully",
    });
  } catch {
    return res.status(500).send({
      success: false,
      message: "internal server error. please try again later",
    });
  }
});

/**
 * Handle PUT requests to the root route.
 * It receives the following parameters and update the spicified book.
 *
 * @param {Request} req - Request object containing the request data.
 * @param {Response} res - Response object to send back.
 *
 * @reqparam {Id} id - Id of the book to be updated.
 *
 * @bodyparam {Name} name - Name of the book.
 * @bodyparam {Price} price - Price of the book.
 *
 * @return {void}
 */
app.put("/:id", function (req, res) {
  const { id } = req.params;
  const { name, price } = req.body;

  try {
    const index = books.findIndex((value) => value.id === id);

    if (!books[index]) {
      return res.status(404).send({
        success: false,
        message: "Book not found",
      });
    }

    books[index] = {
      id,
      name,
      price,
    };

    return res.status(200).send({
      success: true,
      message: "Book updated",
    });
  } catch {
    return res.status(500).send({
      success: false,
      message: "internal server error. please try again later",
    });
  }
});

/**
 * Handle DELETE requests to the root route.
 * It receives a id and delete the specified book if exists.
 *
 * @param {Request} req - Request object containing the request data.
 * @param {Response} res - Response object to send back.
 *
 * @reqparam {Id} id - Id of the book to be updated.
 *
 * @return {void}
 */
app.delete("/:id", function (req, res) {
  const { id } = req.params;

  try {
    const index = books.findIndex((value) => value.id === id);

    if (index === -1) {
      return res.status(404).send({
        success: false,
        message: "Book not found",
      });
    }

    books.splice(index, 1);

    return res.status(200).send({
      success: true,
      message: "Book deleted",
    });
  } catch {
    return res.status(500).send({
      success: false,
      message: "internal server error. please try again later",
    });
  }
});

app.listen(port, () => console.log(`Book list app listening on port ${port}!`));
