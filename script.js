let myLibrary = [];

const booksDiv = document.querySelector(".books");

// Book Class
class Book {
    constructor(inputTitle, inputAuthor, inputPages, newStatus, inputRating) {
        this.title = inputTitle;
        this.author = inputAuthor;
        this.pages = inputPages;
        this.status = newStatus;
        this.rating = inputRating;
    }
}

function addBookToLibrary(title, author, pages, status, rating) {
  let newBook = new Book(title, author, pages, status, rating);
  myLibrary.push(newBook);
}

function addBooksToWebpage() {
    myLibrary.forEach((book, index) => {
        let newBookDiv = document.createElement("div");
        newBookDiv.dataset.index = index;
        booksDiv.appendChild(newBookDiv);

        // Looping through the properties of the book Object.
        Object.keys(book).forEach(function(key) {
            let newElementDiv = document.createElement("div");
            newBookDiv.appendChild(newElementDiv);
            
            if (key === "status") {
                let newReadButton = document.createElement("button");
                let bookArrayElement = myLibrary[index];

                newReadButton.textContent = bookArrayElement.status;
                newReadButton.addEventListener("click", changeReadStatus);

                // Adding .unread class if needed
                if (bookArrayElement.status === "Unread") {newReadButton.classList.toggle("unread")};
                newElementDiv.appendChild(newReadButton);
            } else {
                let newText = document.createElement("p");
                newText.textContent = book[key];
                newElementDiv.appendChild(newText);
            }
        });

        // Adding remove button
        // Create the div
        let newElementDiv = document.createElement("div");
        newBookDiv.appendChild(newElementDiv);
        // Create the button
        let newRemoveButton = document.createElement("button");
        let newCrossImage = document.createElement("img");
        newCrossImage.src = "./images/close.svg";
        newRemoveButton.appendChild(newCrossImage);
        newRemoveButton.classList.toggle("remove");
        newRemoveButton.addEventListener("click", removeBook);
        newElementDiv.appendChild(newRemoveButton);
    });
};

function changeReadStatus(event) {
    let parentDiv = event.target.parentElement.parentElement;

    if (event.target.textContent === "Unread") {
        event.target.textContent = "Read";
        myLibrary[parentDiv.dataset.index].status = "Read"; 
    } else {
        event.target.textContent = "Unread";
        myLibrary[parentDiv.dataset.index].status = "Unread"; 
    }
    event.target.classList.toggle("unread");
}

function removeBook(event) {
    let parentDiv = event.target.parentElement.parentElement.parentElement;

    // Remove from books array by filtering the array
    let bookIndex = parentDiv.dataset.index;
    myLibrary = myLibrary.filter((item) => bookIndex != myLibrary.indexOf(item));

    // Remove from webpage by refreshing the page
    refreshBooks();
}

function refreshBooks() {
    const displayedBooks = document.querySelectorAll(".books div");
    displayedBooks.forEach((book) => {
        book.remove();
    });
    addBooksToWebpage();
}

// New Book button opens the dialog modally
const dialog = document.querySelector("dialog");
let newBookButton = document.querySelector(".new-book");
let dialogCloseButton = document.querySelector(".close-button");

newBookButton.addEventListener("click", () => {
    dialog.showModal();
});

function addBook() {
    let title = document.querySelector("#title");
    let author = document.querySelector("#author");
    let pages = document.querySelector("#pages");
    let rating = document.querySelector("#rating");
    addBookToLibrary(title.value, author.value, pages.value, "Unread", rating.value);
    refreshBooks();

    title.value = "";
    author.value = "";
    pages.value = "";
    rating.value = "";
};

dialogCloseButton.addEventListener("click", (event) => {
    event.preventDefault();
    dialog.close();
})

// Adding example books
addBookToLibrary("1984", "George Orwell", 183, "Unread", 4); 
addBookToLibrary("Harry Potter and the Philosopher's Stone", "J.K Rowling", 223, "Unread", 5);
addBookToLibrary("The Lord of the Rings", "J. R. R. Tolkien", 1200, "Unread", 2);

addBooksToWebpage();