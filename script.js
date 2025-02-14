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
    const booksDiv = document.querySelector(".books");

    myLibrary.forEach((book) => {
        let newBookDiv = document.createElement("div");
        booksDiv.appendChild(newBookDiv);

        // Looping through the properties of the book Object.
        Object.keys(book).forEach(function(key,index) {
            let newElementDiv = document.createElement("div");
            newBookDiv.appendChild(newElementDiv);
            
            if (key === "status") {
                let newReadButton = document.createElement("button");
                newReadButton.textContent = "Unread";
                newReadButton.addEventListener("click", changeReadStatus);
                newReadButton.classList.toggle("unread");
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
    if (event.target.textContent === "Unread") {
        event.target.textContent = "Read";
    } else {
        event.target.textContent = "Unread";
    }
    event.target.classList.toggle("unread");
}

function removeBook(event) {
    event.target.parentElement.parentElement.parentElement.remove();
}

function openDialog() {

}

// New Book button opens the dialog modally
const dialog = document.querySelector("dialog");
let newBookButton = document.querySelector(".new-book");
let dialogCloseButton = document.querySelector(".dialog-close-button");

newBookButton.addEventListener("click", () => {
    dialog.showModal();
});

dialogCloseButton.addEventListener("click", (event) => {
    event.preventDefault();
    dialog.close();
});

// Adding example books
addBookToLibrary("1984", "George Orwell", 183, "Read", 4); 
addBookToLibrary("Harry Potter and the Philosopher's Stone", "J.K Rowling", 223, "Unread", 5);
addBookToLibrary("The Lord of the Rings", "J. R. R. Tolkien", 1200, "Unread", 2);

addBooksToWebpage();