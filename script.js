

function Book(title,author,pages,read ) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read;
}


const harryPotter = new Book("Sorceror's stone","J.K Rowling","223","Read");

const lotr = new Book("Fellowship of the Ring","J.R.R Tolkien","500","Not Yet Read");

let myLibrary = [harryPotter,lotr,lotr,lotr,lotr,lotr];





function addBookToLibrary(){

    console.log('why?')

   
    const inputTitle = document.querySelector('#titleForm');

    const inputAuthor = document.querySelector('#authorForm');
    
    const inputPages = document.querySelector('#pagesForm');
    
    const inputRead = document.querySelector('.readForm');
    

    const bookTitle = inputTitle.value;
    const bookAuthor = inputAuthor.value;
    const bookPages = inputPages.value;
    const bookStatus = inputRead.value;

    myLibrary.push(new Book(bookTitle,bookAuthor,bookPages,bookStatus));


    inputTitle.value = '';
    inputAuthor.value = '';
    inputPages.value ='';

    return;

}

const libraryDiv = document.querySelector('.library')


function displayLibrary (library){
    
    library.forEach(book => {

        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');

        const titleDiv = document.createElement('div');
        titleDiv.classList.add('title');
        titleDiv.textContent = book.title;

        const authorDiv = document.createElement('div');
        authorDiv.classList.add('author');
        authorDiv.textContent = "Author: " +book.author;

        const pagesDiv = document.createElement('div'); 
        pagesDiv.classList.add('pages');
        pagesDiv.textContent = "Pages: " +book.pages;

        // const readDiv = document.createElement('div');
        // readDiv.classList.add('read');
        // readDiv.textContent = "Read: " +book.read;




        const buttonSpace = document.createElement('div');
        buttonSpace.classList.add('button-space');




        const readStatus = document.createElement('div');
        readStatus.classList.add('read-status');

        const readButton = document.createElement('button');
        readButton.classList.add('read-button');
        readButton.textContent = book.read;

        if (readButton.textContent === 'Not Yet Read'){
            readButton.classList.add('not-yet-read');
        }




        const deleteBtnDiv = document.createElement('div');
        deleteBtnDiv.classList.add('deleteBtnDiv');

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add('deleteBtn');



        libraryDiv.appendChild(bookDiv);
        // add each book to main-container
        // book.
        bookDiv.appendChild(titleDiv);
        bookDiv.appendChild(authorDiv);
        bookDiv.appendChild(pagesDiv);
        // bookDiv.appendChild(readDiv);
        bookDiv.appendChild(buttonSpace);

        buttonSpace.appendChild(readStatus);
        buttonSpace.appendChild(deleteBtnDiv);

        readStatus.appendChild(readButton);
        deleteBtnDiv.appendChild(deleteBtn);

        // update append values

    });

    // sets data attributes for delete buttons
    setDataAttribute();

    // uses delete button data attribute to delete book div
    deleteBook();

    // toggle read status
    readToggle ()
}


// Shows form when Add book button is pressed

function showForm (){
    const formButton = document.querySelector('#addBookBtn');

    const bookFormContainer = document.querySelector('.bookFormContainer');

    const formDiv = document.querySelector('#formDiv')

    formButton.addEventListener('click',function(){
        
        hideButton();       

    });

    formDiv.addEventListener('click', function(e){
        // to stop bubbling
        e.stopPropagation();
    });

    bookFormContainer.addEventListener('click', function(){

        showButton();

    });
    
    

    formReadButton();

    // console.log(test);

    formSubmit();


}


function hideButton(){

    const bookFormContainer = document.querySelector('.bookFormContainer');
    const formButton = document.querySelector('#addBookBtn');

    bookFormContainer.classList.add('showForm');
    formButton.classList.add('hideAddButton');
}



function showButton(){

    const bookFormContainer = document.querySelector('.bookFormContainer');
    const formButton = document.querySelector('#addBookBtn');

    bookFormContainer.classList.remove('showForm');
    formButton.classList.remove('hideAddButton');
}


// submit button of form 

function formSubmit() {

    const bookFormContainer = document.querySelector('.bookFormContainer');

    const submitButton = document.querySelector('#submitForm');

    submitButton.addEventListener('click',function(e){



        const inputTitle = document.querySelector('#titleForm');

        const inputAuthor = document.querySelector('#authorForm');
        
        const inputPages = document.querySelector('#pagesForm');
        
        
    
        const bookTitle = inputTitle.value;
        const bookAuthor = inputAuthor.value;
        const bookPages = inputPages.value;




        if(!bookTitle||!bookAuthor||!bookPages) {
            return;
        }



        console.log(e);

        e.preventDefault();

        console.log("Form submit button fn runs");

        // Add new books to library
        addBookToLibrary();

        showButton();

        clearDisplay();
        
    });

}





// Set data attribute for all book DOM elements
function setDataAttribute(){

    const delButtons = document.querySelectorAll('.deleteBtn');

    const readButtons = document.querySelectorAll('.read-button')

    const domLength = delButtons.length;

    for(i=0;i< domLength;i++){
        
        delButtons[i].setAttribute('data-dom-btn',i);
        readButtons[i].setAttribute('data-read-btn',i);
    }

}


// Delete book button

function deleteBook(){

    const delButtons = document.querySelectorAll('.deleteBtn');

    delButtons.forEach(button =>{

        button.addEventListener('click',function(){

    
            const delBtnIndex = button.dataset.domBtn;

            myLibrary.splice(delBtnIndex,1);

            clearDisplay();

        })
        
    });
    
}




// reboots display

function clearDisplay (){
    const bookDivs = document.querySelectorAll('.book');

    bookDivs.forEach(book => {
        book.remove();
    })

    displayLibrary(myLibrary);
}



function readToggle () {
    
    const readButtons = document.querySelectorAll('.read-button');
    
    readButtons.forEach(button => {
        
        const nodeIndex = button.dataset.readBtn;

        button.addEventListener('click', function(){
            if (button.textContent === 'Read'){

                myLibrary[nodeIndex].read = 'Not Yet Read';
                button.textContent = 'Not Yet Read';
                button.classList.add('not-yet-read');
                return;

            }
            
            if (button.textContent === 'Not Yet Read') {

                myLibrary[nodeIndex].read = 'Read';
                button.textContent = 'Read';
                button.classList.remove('not-yet-read');
                return;
            }
        });

    })
}





function formReadButton () {

    const readBtnForm = document.querySelector('.readForm');

    let readData = readBtnForm.value;

    readBtnForm.addEventListener('click', function(){
        if (readBtnForm.value === 'Read'){

            readData = 'Not Yet Read';
            readBtnForm.classList.remove('read-btn-color');
  
        } else if (readBtnForm.value === 'Not Yet Read') {

            readData = 'Read';
            readBtnForm.classList.add('read-btn-color');


        }

        readBtnForm.textContent = readData;
        readBtnForm.value = readData;
        console.log(readData);
        

        
    });

    


}






function initialiseMainFunctions(){

    displayLibrary(myLibrary);

    showForm();
    
}

initialiseMainFunctions();