/**************************************************************
 * getBookById(bookId, books):
 * - receives a bookId
 * - recieves an array of book objects
 * - returns the book object that matches that id
 * - returns undefined if no matching book is found
 ****************************************************************/
function getBookById(bookId, books) {
  // Your code goes here
  return books.find(book => book.id==bookId);
}

/**************************************************************
 * getAuthorByName(authorName, authors):
 * - receives an authorName
 * - recieves an array of author objects
 * - returns the author that matches that name (CASE INSENSITIVE)
 * - returns undefined if no matching author is found
 ****************************************************************/
function getAuthorByName(authorName, authors) {
  // Your code goes here
  return authors.find( author => author.name.toUpperCase() == authorName.toUpperCase());
}

/**************************************************************
 * bookCountsByAuthor(authors):
 * - receives an array of authors
 * - returns an array of objects with the format:
 *    [{ author: <NAME>, bookCount: <NUMBER_OF_BOOKS> }]
 ****************************************************************/
function bookCountsByAuthor(authors) {
  // Your code goes here
  let newArr= [];
  authors.forEach(author => {
    newArr.push( {author: author.name, bookCount : author.books.length});
  })
  return newArr;
}

/**************************************************************
 * booksByColor(books):
 * - receives an array of books
 * - returns an object where the keys are colors
 *   and the values are arrays of book titles:
 *    { <COLOR>: [<BOOK_TITLES>] }
 ****************************************************************/
function booksByColor(books) {
  const colors = {};

  // Your code goes here
  books.forEach( book => {
    let arr=[];
    if (colors[book.color]==undefined){
      arr.push(book.title);
      colors[book.color]=arr;
    }
    else {
      arr=colors[book.color];
      arr.push(book.title);
      colors[book.color]=arr;
    }
  });
  return colors;
}

/**************************************************************
 * titlesByAuthorName(authorName, authors, books):
 * - receives an authorName
 * - recieves an array of author objects
 * - recieves an array of book objects
 * - returns an array of the titles of the books written by that author:
 *    ["The Hitchhikers Guide", "The Meaning of Liff"]
 ****************************************************************/
function titlesByAuthorName(authorName, authors, books) {
  // Your code goes here
  let authorObj = authors.find(author => author.name.toUpperCase()==authorName.toUpperCase());
  if (authorObj== undefined){
    return [];
  }
  let booksArr=[];
  books.forEach(book => {
    book.authors.forEach( author => {
      if (author.id==authorObj.id){
        booksArr.push(book.title);
      }
    });
  });
  return booksArr;
}

/**************************************************************
 * mostProlificAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author with the most books
 *
 * Note: assume there will never be a tie
 ****************************************************************/
function mostProlificAuthor(authors) {
  // Your code goes here
  let profAuthor=authors[0];
  let max=0;
  authors.forEach(author => {
    if (profAuthor.books.length<=author.books.length){
      profAuthor=author;
    }
  });
  return profAuthor.name;
}

/**************************************************************
 * relatedBooks(bookId, authors, books):
 * - receives a bookId
 * - receives a list of authors
 * - receives a list of books
 * - returns a list of the titles of all the books by
 *   the same author as the book with bookId
 *   (including the original book)
 *
 * e.g. Let's send in bookId 37 ("The Shining Girls" by Lauren Beukes):
 *      relatedBooks(37);
 * We should get back all of Lauren Beukes's books:
 *      ["The Shining Girls", "Zoo City"]
 *
 * NOTE: YOU NEED TO TAKE INTO ACCOUNT BOOKS WITH MULTIPLE AUTHORS
 *
 * e.g. Let's send in bookId 46 ("Good Omens" by Terry Pratchett and Neil Gaiman):
 *      relatedBooks(46);
 * We should get back all of Neil Gaiman's books AND all of Terry Pratchett's books:
 *      ["Good Omens", "Good Omens", "Neverwhere", "Coraline", "The Color of Magic", "The Hogfather", "Wee Free Men", "The Long Earth", "The Long War", "The Long Mars"]
 *
 * BONUS: REMOVE DUPLICATE BOOKS
 ****************************************************************/
function relatedBooks(bookId, authors, books) {
  // Your code goes here
  let book =getBookById(bookId,books);
  let bookAuthors=book.authors.map(author => author.name);
  let titles=[];
  bookAuthors.forEach(
    author => getAuthorByName(author,authors).books.forEach( book =>
      titles.push(getBookById(book,books).title)
      )
  );
  return titles;
}

/**************************************************************
 * friendliestAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author that has
 *   co-authored the greatest number of books
 ****************************************************************/
function friendliestAuthor(authors) {
  // Your code goes here
 
  authors.forEach(author => {
    author.coAuthoringCount = 0;
    authors.forEach(secondAuthor => {
      if (secondAuthor.name != author.name){
        const sharedBooks = secondAuthor.books.filter(bookId => author.books.includes(bookId));
        author.coAuthoringCount += sharedBooks.length;
      }
    });
  });
    let friendlyAuthor = authors[0];
    authors.forEach(author => {
      if (author.coAuthoringCount > friendlyAuthor.coAuthoringCount){
    friendlyAuthor=author;
  }
    });

  return friendlyAuthor.name;
}

module.exports = {
  getBookById,
  getAuthorByName,
  bookCountsByAuthor,
  booksByColor,
  titlesByAuthorName,
  mostProlificAuthor,
  relatedBooks,
  friendliestAuthor
};

/**
 * Uncomment the following lines if you
 * want to manually test your code
 */

 const authors = require("./authors.json");
 const books = require("./books.json");

// console.log(getBookById(12, books));
// console.log(getAuthorByName("J.K. Rowling", authors));
// console.log(bookCountsByAuthor(authors));
// console.log(booksByColor(books));
// console.log(titlesByAuthorName("George R.R. Martin", authors, books));
// console.log(mostProlificAuthor(authors));
// console.log(relatedBooks(50, authors, books));
// console.log(friendliestAuthor(authors));
