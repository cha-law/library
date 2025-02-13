const myLibrary = [];

// Constructor
function Book(title, author, pages, status, rating) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  this.rating = rating;
}

function addBookToLibrary(title, author, pages, status, rating) {
  let newBook = new Book(title, author, pages, status, rating);
  myLibrary.push(newBook);
}

function addBooksToWebpage() {
    for (let book in myLibrary) {
    }
}
