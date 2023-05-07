// Variables.
const booksContainer = document.querySelector(".books");
const form = document.getElementById("form");
const newBookBtn = document.querySelector(".new-book.btn")
const closeFormBtn = document.querySelector(".close-form.btn");
const formTitleInput = document.getElementById("title");
const titleErrorDiv = document.getElementById("title-error-div");
// Book library array.
let myLibrary = [];

// Book constructor.   
function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

Book.prototype.statusToggle = function () {
  this.status ? this.status = false : this.status = true;
  return this.status
}

///////Functions/////////////////
// Add book to array function.
function addBookToLibrary() {
  // Gets values from form.
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let status = document.getElementById("read-checkbox").checked;

  // Creates new book object. 
  let newBook = new Book(title, author, pages, status);

  let bookInLibrary = checkIfBookInLibrary(title, newBook)
  if (!bookInLibrary) {
    myLibrary.push(newBook);
    clearForm()
    form.style.display = "none"
    render()
  }
}

function checkIfBookInLibrary(title, newBook) {
  let exists = false;

  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].title === newBook.title) {
      exists = true
    }
    else continue
  }

  // If book is in the array error pops up on from.
  if (exists) {
    console.log("ERROR: Book already in library.");
    formTitleInput.style.borderColor = "red";
    titleErrorDiv.innerText = "*This book already exists";
    return true
  }
  // If the new book is'nt in the library array, it adds it to library, sends to render to page and clears form and error div.
  else return false
}

function createBookCard(title, author, pages, status) {

  let bookCard = document.createElement("div");
  bookCard.classList.add("book-card");
  // Adds #id to book card to help find the index.
  bookCard.setAttribute("id", title)

  let bookContent = document.createElement("div");
  bookContent.classList.add("book-content");

  let bookBtns = document.createElement("div");
  bookBtns.classList.add("book-btns");


  let titleDetails = document.createElement("p");
  titleDetails.classList.add("title","details");
  titleDetails.innerText = `Title : ${title}`;

  let authorDetails = document.createElement("p");
  authorDetails.classList.add("author","details");
  authorDetails.innerText = `Author : ${author}`;

  let pagesDetails = document.createElement("p");
  pagesDetails.classList.add("pages","details");
  pagesDetails.innerText = `Pages : ${pages}`;

  let statusBtn = document.createElement("button");
  statusBtn.classList.add("status","btn");
  status ? statusBtn.innerText = "Read" : statusBtn.innerText = "Not Read";

  let removeBtn = document.createElement("button");
  removeBtn.classList.add("remove","btn");
  removeBtn.innerText = "Remove Book";

  bookContent.append(titleDetails,authorDetails,pagesDetails);
  bookBtns.append(statusBtn,removeBtn);
  bookCard.append(bookContent,bookBtns);

  // Adds event listener which deletes book from array and removes it from the page.
  removeBtn.addEventListener("click", (e) => {
    const indexFound = myLibrary.findIndex(object => {
      return object.title === title;
    });
    myLibrary.splice(indexFound, 1)
    e.currentTarget.parentNode.parentNode.remove();
  });

  statusBtn.addEventListener("click", (e) => {
    const indexFound = myLibrary.findIndex(object => {
      return object.title === title;
    });
    let currentStatus = myLibrary[indexFound].statusToggle();
    // let currentStatus = myLibrary[index];
    currentStatus ? statusBtn.innerText = "Read" : statusBtn.innerText = "Not Read";
    console.log(myLibrary)
  });

  return bookCard
}

// Renders the new book object to page (always renders the last item in the array).
function render() {

  // Sets i to be the index of last book in the library array.
  let i = myLibrary.length - 1;

  let title = myLibrary[i].title;
  let author = myLibrary[i].author;
  let pages = myLibrary[i].pages;
  let status = myLibrary[i].status;

  // Appends book to book container. 
  booksContainer.append(createBookCard(title, author, pages, status));
}


function clearForm() {
  form.reset()
  formTitleInput.style.borderColor = "black";
  titleErrorDiv.innerText = "";
}

///////////Event Listeners////////////
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary();
});

closeFormBtn.addEventListener("click", (e) => {
  e.preventDefault()
  clearForm()
  form.style.display = "none"
});

newBookBtn.addEventListener("click", () => {
  form.style.display = "block"
});

