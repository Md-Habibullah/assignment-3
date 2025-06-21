# 📚 Library Management API

A RESTful API for managing books and borrowings, built with Express, TypeScript, and MongoDB.

## Features

- **Book Management**: Create, read, update, and delete books
- **Borrowing System**: Track book loans with quantity validation
- **Aggregation Reports**: Get summaries of borrowed books
- **Filtering & Sorting**: Query books by genre and sort results
- **Data Validation**: Strict schema validation for all operations

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB (with Mongoose)
- **Language**: TypeScript
- **Build Tool**: ts-node

## API Endpoints

### Books
| Method | Endpoint          | Description                          |
|--------|-------------------|--------------------------------------|
| POST   | `/api/books`      | Create a new book                    |
| GET    | `/api/books`      | List all books (filterable)          |
| GET    | `/api/books/:id`  | Get book details                     |
| PUT    | `/api/books/:id`  | Update a book                        |
| DELETE | `/api/books/:id`  | Delete a book                        |

### Borrowing
| Method | Endpoint          | Description                          |
|--------|-------------------|--------------------------------------|
| POST   | `/api/borrow`     | Borrow book copies                   |
| GET    | `/api/borrow`     | Get borrowing summary (aggregation)  |


### Request/Response Examples
#### 1. Create a Book
**Request:**

```http
POST /api/books
```
### Content-Type: application/json

```json
{
  "title": "The Hobbit",
  "author": "J.R.R. Tolkien",
  "genre": "FANTASY",
  "isbn": "9780547928227",
  "description": "A fantasy adventure novel",
  "copies": 15
}
```

```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "genre": "FANTASY",
    "isbn": "9780547928227",
    "description": "A fantasy adventure novel",
    "copies": 15,
    "available": true,
    "createdAt": "2025-06-20T10:00:00.000Z",
    "updatedAt": "2025-06-20T10:00:00.000Z"
  }
}
```
### 2. Get All Books
Request:

```http
GET /api/books?genre=FANTASY&sort=desc&limit=5
```
Success Response:

```json
{
  "success": true,
  "message": "Books retrieved successfully",
  "data": [
    {
      "_id": "64f123abc4567890def12345",
      "title": "The Hobbit",
      "author": "J.R.R. Tolkien",
      "genre": "FANTASY",
      "isbn": "9780547928227",
      "copies": 15,
      "available": true,
      "createdAt": "2025-06-20T10:00:00.000Z"
    }
  ]
}
```
### 3. Get Single Book
Request:

```http
GET /api/books/64f123abc4567890def12345
```
Success Response:

```json
{
  "success": true,
  "message": "Book retrieved successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "genre": "FANTASY",
    "isbn": "9780547928227",
    "copies": 15,
    "available": true
  }
}
```
### 4. Update Book
Request:

```http
PUT /api/books/64f123abc4567890def12345
```
Content-Type: application/json
```json
{
  "copies": 20
}
```
Success Response:

```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "copies": 20,
    "available": true,
    "updatedAt": "2025-06-20T11:30:00.000Z"
  }
}
```

### 5. Delete Book
Request:
```http
DELETE /api/books/64f123abc4567890def12345
```
Success Response:

```json
{
  "success": true,
  "message": "Book deleted successfully",
  "data": null
}
```
## Borrow Endpoints
### 6. Borrow a Book
Request:

```http
POST /api/borrow
```
Content-Type: application/json

```json
{
  "book": "64f123abc4567890def12345",
  "quantity": 2,
  "dueDate": "2025-12-31"
}
```
Success Response:

```json
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": {
    "_id": "64bc4a0f9e1c2d3f4b5a6789",
    "book": "64f123abc4567890def12345",
    "quantity": 2,
    "dueDate": "2025-12-31T00:00:00.000Z",
    "createdAt": "2025-06-20T12:00:00.000Z"
  }
}
```
### 7. Get Borrowed Books Summary
Request:

```http
GET /api/borrow
```
Success Response:

```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Hobbit",
        "isbn": "9780547928227"
      },
      "totalQuantity": 5
    }
  ]
}
```

## Error Responses
Validation Error:

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "copies": "Copies must be a positive number"
  }
}
```
Not Found Error:

```json
{
  "message": "Book not found",
  "success": false,
  "error": "No book found with ID 64f123abc4567890def12345"
}
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation
Install dependencies:

```bash
npm install
```
Configure environment:

```bash
cp .env.example .env
# Edit .env with your MongoDB URI
```
Run the server:

```bash
npm run dev
```
Environment Variables
```text
MONGODB_URI=mongodb://localhost:27017/library
PORT=3000
```
Example Requests
Create a Book:

```bash
curl -X POST http://localhost:5000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "FICTION",
    "isbn": "9780743273565",
    "copies": 10
  }'
  ```
  Borrow Books:

```bash
curl -X POST http://localhost:5000/api/borrow \
  -H "Content-Type: application/json" \
  -d '{
    "book": "64f123abc4567890def12345",
    "quantity": 2,
    "dueDate": "2025-12-31"
  }'
  ```
  Testing
Run the test suite with:

```bash
npm test
```
