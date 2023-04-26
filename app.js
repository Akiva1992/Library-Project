// Book library.
let myLibrary = [];

// let bookOne = myLibrary[0];
// console.log(bookOne.title)

// Book constructor.   
function Book(title,author,pages,status) {
  this.title = title;
  this.author =  author;
  this.pages = pages;
  this.status = status;
}

// Manually created books.
const bookOne = new Book("Siddhartha","Herman Hesse",150,"Read");
const bookTwo = new Book("Me","John Hook",200,"Not read");
const bookThree = new Book("The Idiot","Fyodor Dostoevsky",500,"Read");

// console.log(bookThree.pages)

// Add book to arry function.
function addBookToLibrary(book) {
  myLibrary.push(book)
}

// addBookToLibrary(bookTwo);
// console.log(myLibrary)