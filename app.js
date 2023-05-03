// Variables.
const booksContainer = document.querySelector(".books");
const form = document.getElementById("form");
const newBookBtn = document.querySelector(".new-book-btn")
const closeFormBtn = document.querySelector(".close-form-btn");


// Book library array.
let myLibrary = [];


// Book constructor.   
function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}


// Add book to array function.
function addBookToLibrary() {

  // Gets values from form.
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let status = document.getElementById("read-checkbox");
  if ( status.checked ) {
    status = "Read";
 } else {
  status = "Not Read";
}

  // Creates new book object. 
  let newBook = new Book (title, author, pages, status);

  // Checks if book already in the library array. 
  let exists = false;
  for (let i = 0; i<myLibrary.length; i++){
    if(myLibrary[i].title === newBook.title) {
      exists = true;
      break;
    }
    else continue
  }

  // If book is in the array error pops up on from ////Still need to create error
  if (exists){
    console.log("ERROR: Book already in library.")
  }
  // If the new book is'nt in the library array, it adds it, sends to render to page and clears form.
  else{
    myLibrary.push(newBook);
    render()
  }
}

// Event listener for Add Book btn. 
form.addEventListener("submit",(e)=>{
  e.preventDefault();
  addBookToLibrary();
});


// Renders the new book object to page (always renders the last item in the array).
function render(){ 

  // Sets i to be the index of last book in the library array.
  let i = myLibrary.length-1;
  
  
  let bookCard = document.createElement("div");
  bookCard.classList.add("book-card");
  
  let title = myLibrary[i].title;
  let author = myLibrary[i].author;
  let pages = myLibrary[i].pages;
  let status = myLibrary[i].status;

  // Adds id to book card to help find the index.
  bookCard.setAttribute("id",title)
  
  
  let titlePara = document.createElement("p");
  let authorPara = document.createElement("p");
  let pagesPara = document.createElement("p");
  let statusBtn = document.createElement("button");
  let removeBtn = document.createElement("button");
  // statusCheckbox.setAttribute("type", "checkbox");


  titlePara.classList.add("title-p");
  authorPara.classList.add("author-p");
  pagesPara.classList.add("pages-p");
  statusBtn.classList.add("status-btn");
  removeBtn.classList.add("remove-btn");

  

  statusBtn.innerText=status;
  titlePara.innerText = title;
  authorPara.innerText = author;
  pagesPara.innerText = pages;
  removeBtn.innerText = "Remove Book";
  
  
  bookCard.append(titlePara,authorPara,pagesPara,statusBtn,removeBtn);
  booksContainer.append(bookCard);
  
  // Adds event listener which deletes book from array and removes it from the page.
  removeBtn.addEventListener("click", (e)=>{
    const index = myLibrary.findIndex(object => {
      return object.title === title;
    });
    myLibrary.splice(index,1)
    e.currentTarget.parentNode.remove();
    console.log(myLibrary)
  });
}

closeFormBtn.addEventListener("click", (e)=>{
  e.preventDefault()
  form.reset()
  form.style.display = "none";
});


newBookBtn.addEventListener("click", ()=>{
  form.style.display = "block"
});