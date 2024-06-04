# learning-node-booklist

A learning project to handle a list of books

**API Documentation for the `learning-node-booklist` Project**

This project is a simple Node.js application that manages a list of books. The API documentation is structured as follows:

**1. Book Object**

```json
{
  "id": "string",
  "name": "string",
  "price": "number"
}
```

**2. Response object**

```json
{
    "success": "bolean",
    "message": "string",
    "data": "object" - Only when returning is necessary
}
```

**3. Endpoints**

- `GET /`

  - Retrieves all books from the list.
  - Response:
    - Status: 200 OK
    - Status: 500 Internal server error
  - Query Parameters
    - id: string
    - name: string
    - price: number

- `POST /`

  - Adds a new book to the list.
  - Request Body: Book object
  - Response:
    - Status: 201 Created
    - Status: 400 Bad Request
    - Status: 500 Internal server error

- `PUT /:id`

  - Updates a book by its ID.
  - Request Body: Book object
  - Response:
    - Status: 200 OK
    - Status: 404 Not Found
    - Status: 500 Internal server error

- `DELETE /:id`
  - Deletes a book by its ID.
  - Response:
    - Status: 200 OK
    - Status: 404 Not Found
    - Status: 500 Internal server error

Please note that this is a basic API documentation for the given project. Depending on the specific implementation, additional endpoints or modifications may be required.

````

```

```
````
