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
curl -X POST http://localhost:3000/api/books \
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
curl -X POST http://localhost:3000/api/borrow \
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
